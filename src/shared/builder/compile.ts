import {
  raw,
  renderHeading,
  renderLink,
  renderList,
  renderListItem,
  renderNewLine,
  renderParagraph,
} from '@shared/snippets/render';
import { COLORS, FONT_FAMILY, SPACING, TEXT } from '@shared/snippets/styles';
import {
  insertBody,
  SALES_BODY_WIDTH,
  SkeletonName,
  splitSkeleton,
} from '@shared/templates/skeleton';

import { translateDoc, translateSkeletonPart } from './translate';

// Structurally compatible with TipTap JSONContent, so the module stays React-free.
export interface DocNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: DocNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

export type TranslationTable = string[][];

// `noRow` — the table has no such source text; `emptyCell` — the row exists, the language cell is blank.
export type MissingReason = 'noRow' | 'emptyCell';

export interface CompileReport {
  missing: { lang: string; source: string; reason: MissingReason }[];
  linkMismatch: { lang: string; source: string }[];
  unusedRows: string[];
}

export interface CompileResult {
  languages: string[];
  html: Record<string, string>;
  report: CompileReport;
  untranslatedNodeIds: string[];
}

const SOURCE_LANGUAGE = 'EN';

export const isReportEmpty = ({
  missing,
  linkMismatch,
  unusedRows,
}: CompileReport) =>
  !missing.length && !linkMismatch.length && !unusedRows.length;

const escapeAttr = (value: string) => escapeText(value).replace(/"/g, '&quot;');

const escapeText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const findMark = (node: DocNode, type: string) =>
  node.marks?.find((mark) => mark.type === type);

// Kommo needs the recipient name inside a link; like in the skeletons, it must still look like text.
const isContactName = (node: DocNode) =>
  node.type === 'variable' && node.attrs?.name === 'contact.name';

const contactNameLink = (inner: string, color: string) =>
  `<a href="#" target="_blank" rel="noopener noreferrer" style="color: ${color}; text-decoration: none">${inner}</a>`;

const linkHref = (node: DocNode) => {
  const href = findMark(node, 'link')?.attrs?.href;
  return typeof href === 'string' ? href : null;
};

// Variables leave as typed: Kommo substitutes `{{…}}` in the final HTML.
const inlineText = (node: DocNode) => {
  if (node.type === 'text') return node.text ?? '';
  if (node.type === 'variable') return `{{${String(node.attrs?.name ?? '')}}}`;
  return '';
};

const renderText = (node: DocNode) => {
  const text = escapeText(inlineText(node));
  return text && findMark(node, 'bold') ? `<b>${text}</b>` : text;
};

// The snippet pads <a> with whitespace, which would render as a space before punctuation.
const tightLink = (html: string) => html.trim().replace(/\s+<\/a>$/, '</a>');

const plainLink = (inner: string, href: string) =>
  `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`;

const snippetLink = (inner: string, href: string) =>
  tightLink(renderLink({ text: raw(inner), href }));

interface InlineStyle {
  link: (inner: string, href: string) => string;
  textColor: string;
}

const SNIPPET_INLINE: InlineStyle = {
  link: snippetLink,
  textColor: COLORS.text,
};
const PLAIN_INLINE: InlineStyle = { link: plainLink, textColor: '#000000' };

// Adjacent text nodes sharing an href form one <a>, even when bold splits them.
const renderInline = (nodes: DocNode[] = [], style = SNIPPET_INLINE) => {
  const { link } = style;
  let html = '';
  let i = 0;
  while (i < nodes.length) {
    // Breaks out of a surrounding user link: nested <a> is invalid.
    if (isContactName(nodes[i])) {
      html += contactNameLink(renderText(nodes[i++]), style.textColor);
      continue;
    }
    const href = linkHref(nodes[i]);
    if (href === null) {
      html += renderText(nodes[i++]);
      continue;
    }
    let inner = '';
    while (
      i < nodes.length &&
      !isContactName(nodes[i]) &&
      linkHref(nodes[i]) === href
    ) {
      inner += renderText(nodes[i++]);
    }
    html += link(inner, href);
  }
  return html;
};

const renderListItems = (list: DocNode) =>
  (list.content ?? [])
    .map((item) =>
      renderListItem({
        text: raw(
          (item.content ?? [])
            .map((child) => renderInline(child.content))
            .join('<br />')
        ),
      })
    )
    .join('');

const renderBlock = (node: DocNode) => {
  switch (node.type) {
    case 'paragraph':
      return node.content?.length
        ? renderParagraph({ text: raw(renderInline(node.content)) })
        : renderNewLine({ content: raw('') });
    case 'heading':
      return renderHeading({ text: raw(renderInline(node.content)) });
    case 'bulletList':
      return renderList({
        items: raw(renderListItems(node)),
        listStyle: node.attrs?.listStyle === 'disc' ? 'disc' : 'none',
      });
    default:
      return '';
  }
};

// Sales letters should read as typed by the manager: same table rows as the snippets, but plain black
// text and default links. Each block is its own row so email clients keep the layout.
const plainRow = (inner: string, height?: number) => `<tr>
      <td
        width="${SALES_BODY_WIDTH}"${height ? ` height="${height}"` : ''}
        style="
          margin: 0;
          padding: 0;
          width: ${SALES_BODY_WIDTH}px;
          max-width: ${SALES_BODY_WIDTH}px;${height ? `\n          height: ${height}px;` : ''}
          border-collapse: collapse;
          color: ${PLAIN_INLINE.textColor};
          font-family: ${FONT_FAMILY};
          font-size: ${TEXT.fontSize}px;
          font-weight: ${TEXT.fontWeight};
          line-height: ${TEXT.lineHeight}px;
          word-break: break-word;
        "
      >${inner}</td>
    </tr>
    `;

const renderPlainBlock = (node: DocNode): string => {
  switch (node.type) {
    case 'paragraph':
      return node.content?.length
        ? plainRow(renderInline(node.content, PLAIN_INLINE))
        : plainRow('', SPACING.newLineHeight);
    case 'heading':
      return plainRow(`<b>${renderInline(node.content, PLAIN_INLINE)}</b>`);
    case 'bulletList': {
      const style =
        node.attrs?.listStyle === 'disc'
          ? 'margin: 0; padding: 0 0 0 20px; list-style: disc'
          : 'margin: 0; padding: 0; list-style: none';
      const items = (node.content ?? [])
        .map(
          (item) =>
            `<li>${(item.content ?? [])
              .map((child) => renderInline(child.content, PLAIN_INLINE))
              .join('<br />')}</li>`
        )
        .join('');
      return plainRow(`<ul style="${style}">${items}</ul>`);
    }
    default:
      return '';
  }
};

export const renderBody = (doc: DocNode, skeleton: SkeletonName) =>
  (doc.content ?? [])
    .map(skeleton === 'sales' ? renderPlainBlock : renderBlock)
    .join('');

export const compile = (
  doc: DocNode,
  skeleton: SkeletonName,
  table: TranslationTable | null
): CompileResult => {
  const translation = table ? translateDoc(doc, table) : null;
  if (!translation?.languages.length) {
    return {
      languages: [SOURCE_LANGUAGE],
      html: {
        [SOURCE_LANGUAGE]: insertBody(skeleton, renderBody(doc, skeleton)),
      },
      report: { missing: [], linkMismatch: [], unusedRows: [] },
      untranslatedNodeIds: [],
    };
  }
  // The dictionary touches only the skeleton, never the manager's text.
  const { head, tail } = splitSkeleton(skeleton);
  const html = Object.fromEntries(
    translation.languages.map((lang) => [
      lang,
      translateSkeletonPart(head, lang) +
        renderBody(translation.docs[lang], skeleton) +
        translateSkeletonPart(tail, lang),
    ])
  );
  return {
    languages: translation.languages,
    html,
    report: translation.report,
    untranslatedNodeIds: translation.untranslatedNodeIds,
  };
};
