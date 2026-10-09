import { Editor, mergeAttributes, Node } from '@tiptap/core';
import { NodeType } from '@tiptap/pm/model';
import { Selection, TextSelection } from '@tiptap/pm/state';
import { ReactNodeViewRenderer } from '@tiptap/react';

import BackgroundView from './BackgroundView';

// Gapcursor sees no gap after a plate (its last child is a textblock), so the last line of a
// plate that closes the letter would trap the cursor: an arrow there opens a paragraph below.
const exitBelow =
  (type: NodeType, dir: 'down' | 'right') =>
  ({ editor }: { editor: Editor }) => {
    const { state, view } = editor;
    const { $head, empty } = state.selection;
    if (!empty || !view.endOfTextblock(dir)) return false;
    let depth = $head.depth;
    while (depth > 0 && $head.node(depth).type !== type) depth--;
    if (!depth || depth > 1 || $head.after(depth) !== state.doc.content.size)
      return false;
    const next = Selection.findFrom(state.doc.resolve($head.after()), 1, true);
    if (next && next.from < $head.end(depth)) return false;
    const pos = $head.after(depth);
    const tr = state.tr.insert(pos, state.schema.nodes.paragraph.create());
    view.dispatch(
      tr.setSelection(TextSelection.create(tr.doc, pos + 1)).scrollIntoView()
    );
    return true;
  };

// Text-only plate: other palette blocks are kept out by the content expression.
export const Background = Node.create({
  name: 'background',
  group: 'block',
  content: '(paragraph | heading | bulletList)+',
  draggable: true,

  parseHTML() {
    return [{ tag: 'div[data-block="background"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-block': 'background' }),
      0,
    ];
  },

  addKeyboardShortcuts() {
    return {
      ArrowDown: exitBelow(this.type, 'down'),
      ArrowRight: exitBelow(this.type, 'right'),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(BackgroundView);
  },
});
