import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { dropPoint } from '@tiptap/pm/transform';
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view';

import { findBesideTarget } from './button';

type Target =
  | { kind: 'beside'; pos: number; size: number; side: 'before' | 'after' }
  | { kind: 'line'; pos: number; vertical: boolean };

const key = new PluginKey<Target | null>('dropIndicator');

const computeTarget = (view: EditorView, event: DragEvent): Target | null => {
  const slice = view.dragging?.slice;
  const beside = findBesideTarget(view, event, slice, !!view.dragging?.move);
  if (beside?.self) return null;
  const { doc } = view.state;
  if (beside) {
    const size = doc.nodeAt(beside.pos)!.nodeSize;
    return { kind: 'beside', pos: beside.pos, size, side: beside.side };
  }
  const hit = view.posAtCoords({ left: event.clientX, top: event.clientY });
  if (!hit) return null;
  const pos = (slice && dropPoint(doc, hit.pos, slice)) ?? hit.pos;
  const parent = doc.resolve(pos).parent;
  const vertical = parent.inlineContent || parent.type.name === 'buttonRow';
  return { kind: 'line', pos, vertical };
};

const sameTarget = (a: Target | null, b: Target | null) =>
  JSON.stringify(a) === JSON.stringify(b);

const indicator = (vertical: boolean) => () => {
  const el = document.createElement(vertical ? 'span' : 'div');
  el.className = vertical ? 'drop-indicator is-vertical' : 'drop-indicator';
  return el;
};

const decoration = (target: Target) =>
  target.kind === 'beside'
    ? Decoration.node(target.pos, target.pos + target.size, {
        class: `drop-${target.side}`,
      })
    : Decoration.widget(target.pos, indicator(target.vertical), {
        key: `drop-${target.vertical}`,
        ignoreSelection: true,
      });

const show = (view: EditorView, target: Target | null) => {
  if (sameTarget(target, key.getState(view.state) ?? null)) return;
  view.dispatch(
    view.state.tr.setMeta(key, target).setMeta('addToHistory', false)
  );
};

// Replaces the stock drop cursor: besides block gaps it shows a side marker
// when a button is about to join another one in a row.
export const DropIndicator = Extension.create({
  name: 'dropIndicator',

  addProseMirrorPlugins() {
    return [
      new Plugin<Target | null>({
        key,
        state: {
          init: () => null,
          apply: (tr, value) => {
            const meta = tr.getMeta(key) as Target | null | undefined;
            if (meta !== undefined) return meta;
            return tr.docChanged ? null : value;
          },
        },
        props: {
          decorations: (state) => {
            const target = key.getState(state);
            return target
              ? DecorationSet.create(state.doc, [decoration(target)])
              : null;
          },
          handleDOMEvents: {
            dragover: (view, event) => {
              show(view, computeTarget(view, event));
              return false;
            },
            dragleave: (view, event) => {
              if (!view.dom.contains(event.relatedTarget as Node | null))
                show(view, null);
              return false;
            },
            drop: (view) => {
              show(view, null);
              return false;
            },
            dragend: (view) => {
              show(view, null);
              return false;
            },
          },
        },
      }),
    ];
  },
});
