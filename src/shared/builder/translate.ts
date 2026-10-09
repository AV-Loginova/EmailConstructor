import { translationsMap } from '@shared/constants/translations';

import type {
  CompileReport,
  DocNode,
  MissingReason,
  TranslationTable,
} from './compile';

type Mark = NonNullable<DocNode['marks']>[number];

export interface ParsedTable {
  languages: string[];
  // Source text (trimmed) → cell per language column.
  rows: Map<string, string[]>;
}

// Translators may keep the `*bold*` / `[link]` markers in the source column too.
const stripMarkers = (text: string) => text.replace(/[*[\]]/g, '');

export const parseTable = (table: TranslationTable): ParsedTable => {
  const [header = [], ...body] = table.filter((row) =>
    row.some((cell) => cell.trim())
  );
  const rows = new Map<string, string[]>();
  body.forEach((row) => {
    const source = row[0]?.trim();
    if (source && !rows.has(source)) rows.set(source, row);
  });
  return { languages: header.map((lang) => lang.trim()), rows };
};

const VARIABLE_TOKEN = /\{\{([^{}]+)\}\}/g;

// The text a translator sees: marks dropped, variables as typed.
const plainText = (nodes: DocNode[] = []) =>
  nodes
    .map((node) =>
      node.type === 'variable'
        ? `{{${String(node.attrs?.name ?? '')}}}`
        : node.text ?? ''
    )
    .join('');

// A field of bare variables or punctuation has nothing to translate.
const isTranslatable = (text: string) =>
  /\p{L}/u.test(text.replace(VARIABLE_TOKEN, ''));

const hrefOf = (node: DocNode) => {
  const href = node.marks?.find((mark) => mark.type === 'link')?.attrs?.href;
  return typeof href === 'string' ? href : null;
};

// Adjacent nodes with one href are one link, matching how the renderer joins them.
const linkHrefs = (nodes: DocNode[]) => {
  const hrefs: string[] = [];
  let previous: string | null = null;
  nodes.forEach((node) => {
    const href = hrefOf(node);
    if (href !== null && href !== previous) hrefs.push(href);
    previous = href;
  });
  return hrefs;
};

const countLinks = (cell: string) => cell.match(/\[[^\]]*\]/g)?.length ?? 0;

// `*x*` → bold, `[x]` → the N-th original href; unmatched markers stay literal.
const parseCell = (cell: string, hrefs: string[]): DocNode[] => {
  const nodes: DocNode[] = [];
  let bold = false;
  let link: string | null | undefined;
  let linkIndex = 0;
  let buffer = '';

  const flush = () => {
    if (!buffer) return;
    const marks: Mark[] = [];
    if (bold) marks.push({ type: 'bold' });
    if (link) marks.push({ type: 'link', attrs: { href: link } });
    const withMarks = marks.length ? { marks } : {};
    let last = 0;
    for (const match of buffer.matchAll(VARIABLE_TOKEN)) {
      const index = match.index ?? 0;
      if (index > last)
        nodes.push({
          type: 'text',
          text: buffer.slice(last, index),
          ...withMarks,
        });
      nodes.push({ type: 'variable', attrs: { name: match[1] }, ...withMarks });
      last = index + match[0].length;
    }
    if (last < buffer.length)
      nodes.push({ type: 'text', text: buffer.slice(last), ...withMarks });
    buffer = '';
  };

  for (let i = 0; i < cell.length; i++) {
    const char = cell[i];
    const rest = cell.slice(i + 1);
    if (char === '*' && (bold || rest.includes('*'))) {
      flush();
      bold = !bold;
    } else if (char === '[' && link === undefined && rest.includes(']')) {
      flush();
      // Without a matching href the text stays plain: no link without a target.
      link = hrefs[linkIndex++] ?? null;
    } else if (char === ']' && link !== undefined) {
      flush();
      link = undefined;
    } else {
      buffer += char;
    }
  }
  flush();
  return nodes;
};

interface Unit {
  id: string | null;
  source: string;
}

interface Translator {
  // Returns translated inline content, or null when the source text should stay.
  inline: (nodes: DocNode[] | undefined, id: string | null) => DocNode[] | null;
  // Whole multi-paragraph field; null when there is no row for it.
  field: (paragraphs: DocNode[]) => DocNode[] | null;
}

const createTranslator = (
  parsed: ParsedTable,
  column: number,
  lang: string,
  report: CompileReport,
  used: Set<string>,
  untranslated: Set<string>
): Translator => {
  const strippedRows = new Map(
    [...parsed.rows.keys()].map((key) => [stripMarkers(key), key])
  );
  const missing = new Set<string>();
  const mismatched = new Set<string>();

  const findRow = (source: string) => {
    const key = parsed.rows.has(source)
      ? source
      : strippedRows.get(stripMarkers(source));
    if (key === undefined) return null;
    used.add(key);
    return parsed.rows.get(key) ?? null;
  };

  const markMissing = ({ id, source }: Unit, reason: MissingReason) => {
    if (id) untranslated.add(id);
    if (missing.has(source)) return;
    missing.add(source);
    report.missing.push({ lang, source, reason });
  };

  const apply = (cell: string, source: string, hrefs: string[]) => {
    if (countLinks(cell) !== hrefs.length && !mismatched.has(source)) {
      mismatched.add(source);
      report.linkMismatch.push({ lang, source });
    }
    return parseCell(cell, hrefs);
  };

  return {
    inline: (nodes = [], id) => {
      const source = plainText(nodes).trim();
      if (!isTranslatable(source)) return null;
      const row = findRow(source);
      const cell = row?.[column]?.trim();
      if (!cell) {
        markMissing({ id, source }, row ? 'emptyCell' : 'noRow');
        return null;
      }
      return apply(cell, source, linkHrefs(nodes));
    },
    field: (paragraphs) => {
      const source = paragraphs
        .map((paragraph) => plainText(paragraph.content).trim())
        .join('\n')
        .trim();
      const row = isTranslatable(source) ? findRow(source) : null;
      const cell = row?.[column]?.trim();
      if (!cell) return null;
      const hrefs = paragraphs.flatMap((paragraph) =>
        linkHrefs(paragraph.content ?? [])
      );
      // Line breaks in the cell become paragraphs again.
      return splitLines(apply(cell, source, hrefs)).map((content, index) => ({
        type: 'paragraph',
        attrs: (paragraphs[index] ?? paragraphs[0]).attrs,
        ...(content.length ? { content } : {}),
      }));
    },
  };
};

const splitLines = (nodes: DocNode[]) => {
  const lines: DocNode[][] = [[]];
  nodes.forEach((node) => {
    if (node.type !== 'text' || !node.text?.includes('\n')) {
      lines[lines.length - 1].push(node);
      return;
    }
    node.text.split(/\r?\n/).forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part) lines[lines.length - 1].push({ ...node, text: part });
    });
  });
  return lines;
};

const nodeId = (node: DocNode) =>
  typeof node.attrs?.id === 'string' ? node.attrs.id : null;

const translateTextblock = (node: DocNode, t: Translator): DocNode => {
  const content = t.inline(node.content, nodeId(node));
  return content ? { ...node, content } : node;
};

// A list item is one field: matched whole first, then paragraph by paragraph.
const translateListItem = (item: DocNode, t: Translator): DocNode => {
  const paragraphs = item.content ?? [];
  if (paragraphs.length > 1) {
    const whole = t.field(paragraphs);
    if (whole) return { ...item, content: whole };
  }
  return {
    ...item,
    content: paragraphs.map((paragraph) => translateTextblock(paragraph, t)),
  };
};

const translateBlock = (node: DocNode, t: Translator): DocNode => {
  switch (node.type) {
    case 'paragraph':
    case 'heading':
      return translateTextblock(node, t);
    case 'bulletList':
      return {
        ...node,
        content: (node.content ?? []).map((item) => translateListItem(item, t)),
      };
    default:
      return node;
  }
};

export interface DocTranslation {
  languages: string[];
  docs: Record<string, DocNode>;
  report: CompileReport;
  untranslatedNodeIds: string[];
}

// The first column holds the source text, so its language gets the document untouched.
export const translateDoc = (
  doc: DocNode,
  table: TranslationTable
): DocTranslation => {
  const parsed = parseTable(table);
  const report: CompileReport = {
    missing: [],
    linkMismatch: [],
    unusedRows: [],
  };
  const used = new Set<string>();
  const untranslated = new Set<string>();
  const languages: string[] = [];
  const docs: Record<string, DocNode> = {};

  parsed.languages.forEach((lang, column) => {
    if (!lang || lang in docs) return;
    languages.push(lang);
    if (column === 0) {
      docs[lang] = doc;
      return;
    }
    const t = createTranslator(
      parsed,
      column,
      lang,
      report,
      used,
      untranslated
    );
    docs[lang] = {
      ...doc,
      content: (doc.content ?? []).map((node) => translateBlock(node, t)),
    };
  });

  // A source-only table translates nothing, so no row can be called unused.
  if (languages.length > 1)
    report.unusedRows = [...parsed.rows.keys()].filter((key) => !used.has(key));
  return {
    languages,
    docs,
    report,
    untranslatedNodeIds: [...untranslated],
  };
};

const replaceAll = (html: string, from: string, to: string) =>
  html.split(from).join(to);

// Skeleton strings come from the built-in dictionary, like on `/translate`.
export const translateSkeletonPart = (html: string, lang: string) => {
  const code = lang.toUpperCase() as keyof (typeof translationsMap)[string];
  return Object.entries(translationsMap).reduce((result, [key, value]) => {
    const translated = value[code];
    return translated ? replaceAll(result, key, translated) : result;
  }, html);
};
