import { renderLink } from '@shared/snippets/render';
import { COLORS, HEADING, SPACING } from '@shared/snippets/styles';
import { SkeletonName } from '@shared/templates/skeleton';

import { DocNode } from './compile';

type Mark = NonNullable<DocNode['marks']>[number];

export type ImportResult =
  | { skeleton: SkeletonName; doc: DocNode; simplified: number }
  | { error: string };

const VARIABLE_TOKEN = /\{\{([^{}]+)\}\}/g;

// Mirrors the buttonRow schema in the editor.
const MAX_BUTTONS_IN_ROW = 2;

const sameColor = (value: string | null | undefined, color: string) =>
  !!value &&
  value.replace(/\s/g, '').toLowerCase().includes(color.toLowerCase());

const styleOf = (el: Element) => el.getAttribute('style') ?? '';

const hasBackground = (el: Element, color: string) =>
  sameColor(el.getAttribute('bgcolor'), color) ||
  sameColor(styleOf(el).match(/background(-color)?:\s*([^;]+)/i)?.[2], color);

// `\s` covers &nbsp; too.
const normalizeStyle = (style: string) =>
  style.replace(/\s+/g, '').replace(/;$/, '').toLowerCase();

const SNIPPET_LINK_STYLE = normalizeStyle(
  renderLink().match(/style="([^"]*)"/)?.[1] ?? ''
);

// Only a style of its own is worth keeping: the snippet look comes back on export anyway.
const ownLinkStyle = (el: Element) => {
  const style = el.getAttribute('style')?.trim();
  return style && normalizeStyle(style) !== SNIPPET_LINK_STYLE ? style : null;
};

const isBlank = (text: string) => !text.replace(/\s/g, '');

// ── Inline content ──────────────────────────────────────────────────────────

const INLINE_TAGS = new Set([
  'B',
  'STRONG',
  'A',
  'SPAN',
  'I',
  'EM',
  'U',
  'FONT',
]);

interface InlineContext {
  marks: Mark[];
  lines: DocNode[][];
  // Block markup flattened into lines of text.
  flattened: boolean;
}

const pushText = (ctx: InlineContext, text: string) => {
  const line = ctx.lines[ctx.lines.length - 1];
  const withMarks = ctx.marks.length ? { marks: ctx.marks } : {};
  let last = 0;
  for (const match of text.matchAll(VARIABLE_TOKEN)) {
    const index = match.index ?? 0;
    if (index > last)
      line.push({ type: 'text', text: text.slice(last, index), ...withMarks });
    line.push({ type: 'variable', attrs: { name: match[1] }, ...withMarks });
    last = index + match[0].length;
  }
  if (last < text.length)
    line.push({ type: 'text', text: text.slice(last), ...withMarks });
};

const newLine = (ctx: InlineContext) => {
  if (ctx.lines[ctx.lines.length - 1].length) ctx.lines.push([]);
};

const isBold = (el: Element) =>
  el.tagName === 'B' ||
  el.tagName === 'STRONG' ||
  /font-weight:\s*(bold|[6-9]00)/i.test(styleOf(el));

const walkInline = (node: Node, ctx: InlineContext) => {
  if (node.nodeType === Node.TEXT_NODE) {
    pushText(ctx, (node.textContent ?? '').replace(/\s+/g, ' '));
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const el = node as Element;
  if (el.tagName === 'BR') {
    ctx.lines.push([]);
    return;
  }
  if (el.tagName === 'IMG') {
    ctx.flattened = true;
    return;
  }
  const block = !INLINE_TAGS.has(el.tagName);
  if (block) {
    ctx.flattened = true;
    newLine(ctx);
  }
  const outer = ctx.marks;
  let marks = outer;
  if (isBold(el) && !marks.some((m) => m.type === 'bold'))
    // Bold first, link last: one order keeps adjacent runs mergeable.
    marks = [{ type: 'bold' }, ...marks];
  const href = el.tagName === 'A' ? el.getAttribute('href')?.trim() : null;
  // `#` is the compiler's wrapper around {{contact.name}}, not a real link.
  const style = ownLinkStyle(el);
  if (href && href !== '#')
    marks = [
      ...marks.filter((m) => m.type !== 'link'),
      { type: 'link', attrs: style ? { href, style } : { href } },
    ];
  ctx.marks = marks;
  el.childNodes.forEach((child) => walkInline(child, ctx));
  ctx.marks = outer;
  if (block) newLine(ctx);
};

const sameMarks = (a: DocNode, b: DocNode) =>
  JSON.stringify(a.marks ?? []) === JSON.stringify(b.marks ?? []);

// Collapsed like a browser renders it: no double spaces, none at the edges.
const tidyLine = (line: DocNode[]) => {
  const result: DocNode[] = [];
  line.forEach((node) => {
    if (node.type !== 'text') return result.push(node);
    const prev = result[result.length - 1];
    let text = node.text ?? '';
    const prevText = prev?.type === 'text' ? prev.text ?? '' : '';
    if ((!prev || prevText.endsWith(' ')) && text.startsWith(' '))
      text = text.slice(1);
    if (!text) return;
    if (prev?.type === 'text' && sameMarks(prev, node))
      prev.text = prevText + text;
    else result.push({ ...node, text });
  });
  const last = result[result.length - 1];
  if (last?.type === 'text') {
    last.text = (last.text ?? '').replace(/ $/, '');
    if (!last.text) result.pop();
  }
  return result;
};

const parseInline = (el: Element) => {
  const ctx: InlineContext = { marks: [], lines: [[]], flattened: false };
  el.childNodes.forEach((child) => walkInline(child, ctx));
  return {
    lines: ctx.lines.map(tidyLine).filter((line) => line.length),
    flattened: ctx.flattened,
  };
};

const paragraph = (content: DocNode[] = []): DocNode =>
  content.length ? { type: 'paragraph', content } : { type: 'paragraph' };

// ── Blocks ──────────────────────────────────────────────────────────────────

const listFrom = (ul: Element): DocNode => {
  const items = [...ul.querySelectorAll(':scope > li')].map((li) => {
    const { lines } = parseInline(li);
    return {
      type: 'listItem',
      content: lines.length
        ? lines.map((line) => paragraph(line))
        : [paragraph()],
    };
  });
  return {
    type: 'bulletList',
    attrs: {
      listStyle: /list-style:\s*disc/i.test(styleOf(ul)) ? 'disc' : 'none',
    },
    content: items.length
      ? items
      : [{ type: 'listItem', content: [paragraph()] }],
  };
};

const isButtonLink = (a: Element) =>
  hasBackground(a, COLORS.buttonBg) ||
  (!!a.closest('td') && hasBackground(a.closest('td')!, COLORS.buttonBg));

const buttonRows = (links: Element[]): DocNode[] => {
  const buttons = links.map((a) => ({
    type: 'button',
    attrs: {
      text: (a.textContent ?? '').replace(/\s+/g, ' ').trim(),
      href: a.getAttribute('href') ?? '',
    },
  }));
  const rows: DocNode[] = [];
  for (let i = 0; i < buttons.length; i += MAX_BUTTONS_IN_ROW)
    rows.push({
      type: 'buttonRow',
      content: buttons.slice(i, i + MAX_BUTTONS_IN_ROW),
    });
  return rows;
};

const imageFrom = (img: Element): DocNode => {
  const link = img.closest('a');
  return {
    type: 'image',
    attrs: {
      src: img.getAttribute('src') ?? '',
      alt: img.getAttribute('alt') ?? '',
      href: link?.getAttribute('href') ?? '',
    },
  };
};

const isHeadingStyle = (el: Element) =>
  new RegExp(`font-size:\\s*${HEADING.fontSize}px`).test(styleOf(el));

const backgroundFrom = (box: Element, report: Report): DocNode => {
  const content: DocNode[] = [];
  const container = box.querySelector('div') ?? box;
  container.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as Element;
      if (el.tagName === 'UL') return content.push(listFrom(el));
      const { lines, flattened } = parseInline(el);
      if (flattened) report.simplified++;
      if (el.tagName === 'P' && isHeadingStyle(el) && lines.length)
        return content.push({
          type: 'heading',
          attrs: { level: 2 },
          content: lines.flat(),
        });
      if (!lines.length) return content.push(paragraph());
      lines.forEach((line) => content.push(paragraph(line)));
    } else if (
      child.nodeType === Node.TEXT_NODE &&
      !isBlank(child.textContent ?? '')
    ) {
      const span = child.ownerDocument!.createElement('span');
      span.textContent = child.textContent;
      parseInline(span).lines.forEach((line) => content.push(paragraph(line)));
    }
  });
  return {
    type: 'background',
    content: content.length ? content : [paragraph()],
  };
};

interface Report {
  simplified: number;
}

const cellOf = (row: Element) => row.querySelector(':scope > td') ?? row;

const isEmptyRow = (row: Element) =>
  isBlank(row.textContent ?? '') && !row.querySelector('img');

// Spacer rows of the skeleton have their own heights; the manager's empty line is 22px.
const isUserEmptyLine = (row: Element) =>
  cellOf(row).getAttribute('height') === String(SPACING.newLineHeight);

const rowToBlocks = (
  row: Element,
  skeleton: SkeletonName,
  report: Report
): DocNode[] => {
  const cell = cellOf(row);
  if (isEmptyRow(row)) return [paragraph()];

  // The manager signature snippet has no block yet: kept as text.
  if (
    row.querySelector('table') &&
    (row.textContent ?? '').includes('{{profile.name}}')
  ) {
    report.simplified++;
    return parseInline(cell).lines.map((line) => paragraph(line));
  }

  const background = [cell, ...cell.querySelectorAll('td, div')].find((el) =>
    hasBackground(el, COLORS.background)
  );
  if (background) return [backgroundFrom(background, report)];

  const buttons = [...row.querySelectorAll('a')].filter(isButtonLink);
  if (buttons.length) {
    if (!isBlank(textOutside(row, buttons))) report.simplified++;
    return buttonRows(buttons);
  }

  const lists = [...row.querySelectorAll('ul')];
  if (lists.length) return lists.map(listFrom);

  const h2 = row.querySelector('h2');
  if (h2) {
    const [first = [], ...rest] = parseInline(h2).lines;
    return [
      { type: 'heading', attrs: { level: 2 }, content: first },
      ...rest.map((line) => paragraph(line)),
    ];
  }

  const images = [...row.querySelectorAll('img')];
  if (images.length && isBlank(row.textContent ?? ''))
    return images.map(imageFrom);

  // Sales renders a heading as a bold-only row.
  const only = [...cell.childNodes].filter(
    (n) => n.nodeType === Node.ELEMENT_NODE || !isBlank(n.textContent ?? '')
  );
  if (
    skeleton === 'sales' &&
    only.length === 1 &&
    (only[0] as Element).tagName === 'B'
  ) {
    const { lines } = parseInline(only[0] as Element);
    return [{ type: 'heading', attrs: { level: 2 }, content: lines.flat() }];
  }

  const { lines, flattened } = parseInline(cell);
  if (flattened || images.length) report.simplified++;
  return lines.length ? lines.map((line) => paragraph(line)) : [paragraph()];
};

const textOutside = (row: Element, links: Element[]) => {
  const clone = row.cloneNode(true) as Element;
  const all: Element[] = [...row.querySelectorAll('a')];
  const cloned = [...clone.querySelectorAll('a')];
  links.forEach((a) => cloned[all.indexOf(a)]?.remove());
  return clone.textContent ?? '';
};

// ── Skeleton and body ───────────────────────────────────────────────────────

const rowsOf = (tbody: Element) => [...tbody.querySelectorAll(':scope > tr')];

const findBody = (
  doc: Document
): { skeleton: SkeletonName; rows: Element[] } | null => {
  const signature = doc.querySelector('img[src*="mail_signature"]');
  const card = doc.querySelector('table[bgcolor="#ffffff" i]');

  if (signature || !card) {
    const outer = signature
      ? doc.querySelector('table')
      : doc.querySelector('table[width="600"]');
    const tbody = outer?.querySelector(':scope > tbody') ?? outer;
    if (!tbody) return null;
    const rows = rowsOf(tbody);
    const end = rows.findIndex((row) => row.contains(signature));
    return { skeleton: 'sales', rows: end > -1 ? rows.slice(0, end) : rows };
  }

  // The greeting row ends the system header; everything below it is the body.
  const greeting = [...card.querySelectorAll('h2')].find((h2) =>
    (h2.textContent ?? '').includes('{{contact.name}}')
  );
  const greetingRow = greeting?.closest('tr');
  if (greetingRow?.parentElement) {
    const rows = rowsOf(greetingRow.parentElement);
    return {
      skeleton: 'system',
      rows: rows.slice(rows.indexOf(greetingRow) + 1),
    };
  }
  const sections = card.querySelectorAll(':scope > tbody > tr table');
  const last = sections[sections.length - 1];
  const tbody = last?.querySelector(':scope > tbody');
  return tbody ? { skeleton: 'system', rows: rowsOf(tbody) } : null;
};

const trimSpacers = (rows: Element[]) => {
  const spacer = (row: Element) => isEmptyRow(row) && !isUserEmptyLine(row);
  let start = 0;
  let end = rows.length;
  while (start < end && spacer(rows[start])) start++;
  while (end > start && spacer(rows[end - 1])) end--;
  return rows.slice(start, end);
};

const dropLinkStyles = (node: DocNode): DocNode => ({
  ...node,
  ...(node.marks && {
    marks: node.marks.map((mark) =>
      mark.type === 'link'
        ? { ...mark, attrs: { href: mark.attrs?.href } }
        : mark
    ),
  }),
  ...(node.content && { content: node.content.map(dropLinkStyles) }),
});

export interface ImportOptions {
  // Old system letters carry hand-styled links that sometimes must stay as they were.
  keepLinkStyles?: boolean;
}

export const importEmail = (
  html: string,
  { keepLinkStyles = false }: ImportOptions = {}
): ImportResult => {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const body = parsed.querySelector('table') ? findBody(parsed) : null;
  if (!body)
    return {
      error: 'Не похоже на письмо Kommo: не удалось определить каркас.',
    };

  const report: Report = { simplified: 0 };
  const content = trimSpacers(body.rows).flatMap((row) =>
    rowToBlocks(row, body.skeleton, report)
  );
  const doc = {
    type: 'doc',
    content: content.length ? content : [paragraph()],
  };
  return {
    skeleton: body.skeleton,
    doc: keepLinkStyles ? doc : dropLinkStyles(doc),
    simplified: report.simplified,
  };
};
