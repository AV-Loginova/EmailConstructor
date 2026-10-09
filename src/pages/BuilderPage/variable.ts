import { mergeAttributes, Node } from '@tiptap/core';
import { Mark, Node as PMNode } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';

// Inline leaves read as U+FFFC, so string offsets equal positions within a textblock.
const LEAF = '\ufffc';
const VARIABLE_PATTERN = /\{\{([^{}\ufffc]*[^{}\s\ufffc][^{}\ufffc]*)\}\}/g;

const asText = (name: string) => `{{${name}}}`;

// Only marks covering the whole variable carry over: a partial bold or autolink must not split it.
const sharedMarks = (doc: PMNode, from: number, to: number) => {
  let marks: readonly Mark[] | null = null;
  doc.nodesBetween(from, to, (node) => {
    if (!node.isText) return;
    marks = marks
      ? marks.filter((mark) => mark.isInSet(node.marks))
      : node.marks;
  });
  return marks ?? [];
};

// One rule for typing, paste and drop: no `{{…}}` survives as plain text in the doc.
// Matching spans whole textblocks because marks split the text into several nodes.
const findVariableText = (doc: PMNode) => {
  const found: { from: number; to: number; name: string }[] = [];
  doc.descendants((node, pos) => {
    if (!node.isTextblock) return true;
    const text = node.textBetween(0, node.content.size, undefined, LEAF);
    for (const match of text.matchAll(VARIABLE_PATTERN)) {
      const from = pos + 1 + (match.index ?? 0);
      found.push({ from, to: from + match[0].length, name: match[1] });
    }
    return false;
  });
  return found;
};

export const Variable = Node.create({
  name: 'variable',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      name: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-variable'),
        renderHTML: (attributes) => ({ 'data-variable': attributes.name }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-variable]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, { class: 'variable-chip' }),
      asText(node.attrs.name),
    ];
  },

  renderText({ node }) {
    return asText(node.attrs.name);
  },

  addProseMirrorPlugins() {
    const type = this.type;
    return [
      new Plugin({
        key: new PluginKey('variableRecognizer'),
        appendTransaction: (transactions, _oldState, state) => {
          if (!transactions.some((tr) => tr.docChanged)) return null;
          const found = findVariableText(state.doc);
          if (!found.length) return null;
          const tr = state.tr;
          // Back to front keeps earlier positions valid.
          for (const { from, to, name } of found.reverse()) {
            const marks = sharedMarks(state.doc, from, to);
            tr.replaceWith(from, to, type.create({ name }, null, marks));
          }
          return tr;
        },
      }),
    ];
  },
});
