import { Editor, Extension } from '@tiptap/core';
import { EditorState, Plugin, PluginKey } from '@tiptap/pm/state';

// Blocks with translatable attrs get ids too, so the highlight can find them.
const TYPES = ['paragraph', 'heading', 'button', 'image'];

const newId = () => Math.random().toString(36).slice(2, 10);

// Translation reports point at text nodes by id. Splitting a paragraph copies its attrs,
// so duplicates are re-issued along with missing ones.
export const NodeId = Extension.create({
  name: 'nodeId',

  addGlobalAttributes() {
    return [
      {
        types: TYPES,
        attributes: {
          id: {
            default: null,
            keepOnSplit: false,
            parseHTML: (element) => element.getAttribute('data-node-id'),
            renderHTML: (attributes) =>
              attributes.id ? { 'data-node-id': attributes.id } : {},
          },
        },
      },
    ];
  },

  // Loaded or swapped-in documents arrive without a transaction.
  onCreate() {
    ensureNodeIds(this.editor);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('nodeId'),
        appendTransaction: (transactions, _oldState, state) =>
          transactions.some((tr) => tr.docChanged) ? assignIds(state) : null,
      }),
    ];
  },
});

const assignIds = (state: EditorState) => {
  const seen = new Set<string>();
  const tr = state.tr;
  state.doc.descendants((node, pos) => {
    if (!TYPES.includes(node.type.name)) return true;
    const id = node.attrs.id;
    if (!id || seen.has(id)) tr.setNodeAttribute(pos, 'id', newId());
    else seen.add(id);
    return true;
  });
  return tr.steps.length ? tr.setMeta('addToHistory', false) : null;
};

export const ensureNodeIds = (editor: Editor) => {
  const tr = assignIds(editor.state);
  if (tr) editor.view.dispatch(tr);
};
