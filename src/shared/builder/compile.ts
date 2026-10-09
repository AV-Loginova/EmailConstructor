import {
  raw,
  renderHeading,
  renderLink,
  renderList,
  renderListItem,
  renderNewLine,
  renderParagraph,
} from '@shared/snippets/render';
import { insertBody, SkeletonName } from '@shared/templates/skeleton';

// Structurally compatible with TipTap JSONContent, so the module stays React-free.
export interface DocNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: DocNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, unknown> }[];
}

export type TranslationTable = string[][];

export interface CompileReport {
  missing: { lang: string; source: string }[];
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

const escapeText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const findMark = (node: DocNode, type: string) =>
  node.marks?.find((mark) => mark.type === type);

const linkHref = (node: DocNode) => {
  const href = findMark(node, 'link')?.attrs?.href;
  return typeof href === 'string' ? href : null;
};

const renderText = (node: DocNode) => {
  if (node.type !== 'text') return '';
  const text = escapeText(node.text ?? '');
  return findMark(node, 'bold') ? `<b>${text}</b>` : text;
};

// The snippet pads <a> with whitespace, which would render as a space before punctuation.
const tightLink = (html: string) => html.trim().replace(/\s+<\/a>$/, '</a>');

// Adjacent text nodes sharing an href form one <a>, even when bold splits them.
const renderInline = (nodes: DocNode[] = []) => {
  let html = '';
  let i = 0;
  while (i < nodes.length) {
    const href = linkHref(nodes[i]);
    if (href === null) {
      html += renderText(nodes[i++]);
      continue;
    }
    let inner = '';
    while (i < nodes.length && linkHref(nodes[i]) === href) {
      inner += renderText(nodes[i++]);
    }
    html += tightLink(renderLink({ text: raw(inner), href }));
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

export const renderBody = (doc: DocNode) =>
  (doc.content ?? []).map(renderBlock).join('');

export const compile = (
  doc: DocNode,
  skeleton: SkeletonName,
  // Translations are applied starting from ticket 07.
  _table: TranslationTable | null
): CompileResult => {
  const html = insertBody(skeleton, renderBody(doc));
  return {
    languages: [SOURCE_LANGUAGE],
    html: { [SOURCE_LANGUAGE]: html },
    report: { missing: [], linkMismatch: [], unusedRows: [] },
    untranslatedNodeIds: [],
  };
};
