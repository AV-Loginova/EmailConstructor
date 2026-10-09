import { mergeAttributes, Node } from '@tiptap/core';
import { Node as PMNode, Slice } from '@tiptap/pm/model';
import { NodeSelection, Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { ReactNodeViewRenderer } from '@tiptap/react';

import ButtonView from './ButtonView';

export const MAX_BUTTONS_IN_ROW = 2;

export const Button = Node.create({
  name: 'button',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      text: {
        default: 'Кнопка',
        parseHTML: (element) => element.textContent ?? '',
        renderHTML: () => ({}),
      },
      href: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-href') ?? '',
        renderHTML: (attributes) => ({ 'data-href': attributes.href }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-block="button"]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-block': 'button' }),
      String(node.attrs.text ?? ''),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ButtonView);
  },
});

// A palette drop carries a one-button row, a handle drag carries the button itself.
const draggedButton = (slice: Slice | undefined) => {
  if (slice?.content.childCount !== 1) return null;
  const node = slice.content.firstChild!;
  if (node.type.name === 'button') return node;
  if (node.type.name === 'buttonRow' && node.childCount === 1)
    return node.firstChild;
  return null;
};

export interface BesideTarget {
  button: PMNode;
  pos: number;
  side: 'before' | 'after';
  // Dropped onto itself: nothing to do.
  self: boolean;
}

// Dropping a button onto another one puts it next to it in the same row, while the row has room.
export const findBesideTarget = (
  view: EditorView,
  event: DragEvent,
  slice: Slice | undefined,
  moving: boolean
): BesideTarget | null => {
  const button = draggedButton(slice);
  const hit = view.posAtCoords({ left: event.clientX, top: event.clientY });
  if (!button || !hit || hit.inside < 0) return null;
  const { doc, selection } = view.state;
  const target = doc.nodeAt(hit.inside);
  if (target?.type.name !== 'button') return null;

  const $target = doc.resolve(hit.inside);
  const moved = moving && selection instanceof NodeSelection ? selection : null;
  const self = moved?.from === hit.inside;
  const leavesRow =
    moved && moved.from >= $target.start() && moved.to <= $target.end();
  if (
    !self &&
    $target.parent.childCount - (leavesRow ? 1 : 0) >= MAX_BUTTONS_IN_ROW
  )
    return null;

  const rect = (
    view.nodeDOM(hit.inside) as HTMLElement
  ).getBoundingClientRect();
  const side = event.clientX < rect.left + rect.width / 2 ? 'before' : 'after';
  return { button, pos: hit.inside, side, self };
};

export const ButtonRow = Node.create({
  name: 'buttonRow',
  group: 'block',
  content: `button{0,${MAX_BUTTONS_IN_ROW}}`,

  parseHTML() {
    return [{ tag: 'div[data-block="button-row"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-block': 'button-row' }),
      0,
    ];
  },

  addProseMirrorPlugins() {
    const type = this.type;
    return [
      new Plugin({
        key: new PluginKey('buttonRow'),
        props: {
          handleDrop: (view, event, slice, moved) => {
            const target = findBesideTarget(view, event, slice, moved);
            if (!target) return false;
            if (target.self) return true;
            const tr = view.state.tr;
            let pos =
              target.side === 'after'
                ? target.pos + view.state.doc.nodeAt(target.pos)!.nodeSize
                : target.pos;
            if (moved) {
              tr.deleteSelection();
              pos = tr.mapping.map(pos);
            }
            tr.insert(pos, target.button);
            tr.setSelection(NodeSelection.create(tr.doc, pos));
            view.dispatch(tr.scrollIntoView());
            return true;
          },
        },
        // The last button leaving a row (Backspace, drag out) takes the row with it.
        appendTransaction: (transactions, _oldState, state) => {
          if (!transactions.some((tr) => tr.docChanged)) return null;
          const tr = state.tr;
          state.doc.forEach((node, pos) => {
            if (node.type === type && !node.childCount)
              tr.delete(
                tr.mapping.map(pos),
                tr.mapping.map(pos + node.nodeSize)
              );
          });
          return tr.steps.length ? tr : null;
        },
      }),
    ];
  },
});
