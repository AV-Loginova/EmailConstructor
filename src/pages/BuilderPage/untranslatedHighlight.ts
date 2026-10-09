import { Editor, Extension } from '@tiptap/core';
import { Node as PMNode } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

interface HighlightState {
  ids: Set<string>;
  decorations: DecorationSet;
}

const key = new PluginKey<HighlightState>('untranslatedHighlight');

const UNTRANSLATED_CLASS = 'is-untranslated';

const decorate = (doc: PMNode, ids: Set<string>) => {
  if (!ids.size) return DecorationSet.empty;
  const decorations: Decoration[] = [];
  doc.descendants((node, pos) => {
    if (typeof node.attrs.id === 'string' && ids.has(node.attrs.id))
      decorations.push(
        Decoration.node(pos, pos + node.nodeSize, { class: UNTRANSLATED_CLASS })
      );
    return true;
  });
  return DecorationSet.create(doc, decorations);
};

// Decorations live in the view only, so the highlight never reaches getJSON() or the compiled HTML.
export const UntranslatedHighlight = Extension.create({
  name: 'untranslatedHighlight',

  addProseMirrorPlugins() {
    return [
      new Plugin<HighlightState>({
        key,
        state: {
          init: () => ({ ids: new Set(), decorations: DecorationSet.empty }),
          apply: (tr, value, _oldState, state) => {
            const ids: Set<string> | undefined = tr.getMeta(key);
            if (ids) return { ids, decorations: decorate(state.doc, ids) };
            // Rebuilt rather than mapped: node ids, not positions, decide what is lit.
            return tr.docChanged
              ? { ...value, decorations: decorate(state.doc, value.ids) }
              : value;
          },
        },
        props: {
          decorations: (state) => key.getState(state)?.decorations,
        },
      }),
    ];
  },
});

export const setUntranslatedIds = (editor: Editor, ids: string[]) => {
  editor.view.dispatch(
    editor.state.tr.setMeta(key, new Set(ids)).setMeta('addToHistory', false)
  );
};
