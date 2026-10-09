import {
  BUTTON,
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
  .ProseMirror .is-untranslated {
    background: #fff3c4;
    box-shadow: 0 0 0 2px #fff3c4;
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    color: ${COLORS.textMuted};
    pointer-events: none;
  }

  /* Palette blocks: the email markup look plus editor-only chrome, shown on hover. */
  .ProseMirror div[data-block='button-row'] {
    display: flex;
    gap: ${BUTTON.gap}px;
    align-items: center;
  }
  .ProseMirror .node-button {
    position: relative;
  }
  .ProseMirror .builder-block {
    position: relative;
    margin: 0 0 0 -${BUTTON.gap}px;
    padding: 0 0 0 ${BUTTON.gap}px;
  }
  .builder-block__handle {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: ${COLORS.textMuted};
    font: 14px/1 ${FONT_FAMILY};
    letter-spacing: -3px;
    cursor: grab;
    visibility: hidden;
  }
  .builder-block__popover {
    position: absolute;
    top: 100%;
    left: ${BUTTON.gap}px;
    z-index: 5;
    padding-top: 6px;
    visibility: hidden;
  }
  .builder-block:hover > .builder-block__handle,
  .builder-block:hover > .builder-block__popover {
    visibility: visible;
  }
  .builder-block__popover-box {
    padding: 8px;
    border: 1px solid #c9c2e8;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    font: 12px/16px ${FONT_FAMILY};
    color: ${COLORS.text};
  }
  .builder-block__popover label {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .builder-block__popover input {
    width: 320px;
    padding: 4px 6px;
    border: 1px solid #c9c2e8;
    border-radius: 4px;
    font: inherit;
  }
  .ProseMirror .node-button.ProseMirror-selectednode .email-button {
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px ${COLORS.link};
  }
  .ProseMirror .drop-indicator {
    position: relative;
    height: 0;
  }
  .ProseMirror .drop-indicator::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    border-top: 2px solid ${COLORS.link};
  }
  .ProseMirror .drop-indicator.is-vertical {
    display: inline-block;
    width: 0;
    height: 1em;
    margin: 0 -1px;
    border-left: 2px solid ${COLORS.link};
    vertical-align: text-bottom;
  }
  .ProseMirror .drop-indicator.is-vertical::after {
    content: none;
  }
  .ProseMirror .node-button.drop-before::before,
  .ProseMirror .node-button.drop-after::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px solid ${COLORS.link};
  }
  .ProseMirror .node-button.drop-before::before {
    left: -${BUTTON.gap / 2 + 1}px;
  }
  .ProseMirror .node-button.drop-after::after {
    right: -${BUTTON.gap / 2 + 1}px;
  }
  .ProseMirror .email-button {
    box-sizing: content-box;
    field-sizing: content;
    min-width: 1ch;
    height: ${BUTTON.height}px;
    margin: 0;
    padding: 0 32px;
    border: 0;
    border-radius: ${BUTTON.borderRadius}px;
    background: ${COLORS.buttonBg};
    color: ${COLORS.buttonText};
    font-family: ${FONT_FAMILY};
    font-size: ${BUTTON.fontSize}px;
    font-weight: ${BUTTON.fontWeight};
    text-align: center;
    outline: none;
    cursor: text;
  }
  /* A selected block selects its inputs' text too; only real editing should show it. */
  .builder-block input:not(:focus)::selection {
    background: transparent;
  }
  /* TipTap's gap cursor CSS lives in document.head, out of the shadow root's reach. */
  .ProseMirror-gapcursor {
    display: none;
    pointer-events: none;
    position: absolute;
    margin: 0;
  }
  .ProseMirror-gapcursor:after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid #000000;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }
  @keyframes ProseMirror-cursor-blink {
    to {
      visibility: hidden;
    }
  }
  .ProseMirror-focused .ProseMirror-gapcursor {
    display: block;
  }
`;
