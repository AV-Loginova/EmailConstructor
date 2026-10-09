import { raw, renderParagraph } from '@shared/snippets/render';
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

const renderInline = (nodes: DocNode[] = []) =>
  nodes
    .map((node) => (node.type === 'text' ? escapeText(node.text ?? '') : ''))
    .join('');

const renderBlock = (node: DocNode) => {
  switch (node.type) {
    case 'paragraph':
      return renderParagraph({ text: raw(renderInline(node.content)) });
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
