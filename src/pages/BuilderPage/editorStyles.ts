import {
  COLORS,
  EMAIL_WIDTH,
  FONT_FAMILY,
  HEADING,
  SPACING,
  TEXT,
} from '@shared/snippets/styles';

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
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    color: ${COLORS.textMuted};
    pointer-events: none;
  }
`;
