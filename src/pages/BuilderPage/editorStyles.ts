import {
  COLORS,
  EMAIL_WIDTH,
  FONT_FAMILY,
  HEADING,
  SPACING,
  TEXT,
} from '@shared/snippets/styles';
import { SALES_BODY_WIDTH } from '@shared/templates/skeleton';

// Lives inside the canvas shadow root: TipTap injects its base CSS into document.head only.
export const editorStyles = `
  :host {
    all: initial;
    display: block;
    background: #ffffff;
    color: #000000;
    color-scheme: light;
  }
  .ProseMirror {
    width: ${EMAIL_WIDTH}px;
    white-space: pre-wrap;
    word-wrap: break-word;
    outline: 1px dashed #c9c2e8;
    outline-offset: 4px;
  }
  .ProseMirror-focused {
    outline-color: ${COLORS.link};
  }
  .ProseMirror p {
    margin: 0;
    padding: 0;
    color: ${COLORS.text};
    font-family: ${FONT_FAMILY};
    font-size: ${TEXT.fontSize}px;
    font-weight: ${TEXT.fontWeight};
    line-height: ${TEXT.lineHeight}px;
  }
  /* Empty top-level paragraph compiles to the «Новая строка» spacer row. */
  .ProseMirror > p:has(> br.ProseMirror-trailingBreak:only-child) {
    height: ${SPACING.newLineHeight}px;
    line-height: ${SPACING.newLineHeight}px;
  }
  .ProseMirror h2 {
    margin: 0;
    padding: 0;
    color: ${COLORS.text};
    font-family: ${FONT_FAMILY};
    font-size: ${HEADING.fontSize}px;
    font-weight: ${HEADING.fontWeight};
    line-height: ${HEADING.lineHeight}px;
  }
  .ProseMirror ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .ProseMirror ul[data-list-style='disc'] {
    padding: ${SPACING.discListPadding};
    list-style: disc;
  }
  .ProseMirror li {
    padding: ${SPACING.listItemPadding};
  }
  .ProseMirror strong,
  .ProseMirror b {
    font-weight: 700;
  }
  .ProseMirror a {
    color: ${COLORS.link};
    word-break: break-word;
    cursor: text;
  }
  /* Sales mirrors the plain compile output: inherited font, black text, default links. */
  :host([data-skeleton='sales']) .ProseMirror {
    width: ${SALES_BODY_WIDTH}px;
  }
  :host([data-skeleton='sales']) .ProseMirror p,
  :host([data-skeleton='sales']) .ProseMirror h2,
  :host([data-skeleton='sales']) .ProseMirror ul {
    color: #000000;
  }
  :host([data-skeleton='sales']) .ProseMirror h2 {
    font-size: ${TEXT.fontSize}px;
    line-height: ${TEXT.lineHeight}px;
  }
  :host([data-skeleton='sales']) .ProseMirror li {
    padding: 0;
  }
  :host([data-skeleton='sales']) .ProseMirror ul[data-list-style='disc'] {
    padding: 0 0 0 20px;
  }
  :host([data-skeleton='sales']) .ProseMirror a {
    color: LinkText;
    text-decoration: underline;
  }
  .ProseMirror .variable-chip {
    border-radius: 4px;
    background: #ece8fb;
    box-shadow: 0 0 0 1px #c9c2e8;
    white-space: nowrap;
    cursor: default;
  }
  .ProseMirror .variable-chip.ProseMirror-selectednode {
    box-shadow: 0 0 0 2px ${COLORS.link};
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    color: ${COLORS.textMuted};
    pointer-events: none;
  }
`;
