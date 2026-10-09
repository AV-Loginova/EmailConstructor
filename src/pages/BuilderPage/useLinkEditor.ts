import { useCallback, useEffect, useState } from 'react';
import { NodeSelection } from '@tiptap/pm/state';
import { Editor } from '@tiptap/react';

export interface LinkEditor {
  isEditing: boolean;
  start: () => void;
  cancel: () => void;
  apply: (href: string) => void;
  remove: () => void;
}

// A selected palette block has its own settings, text formatting doesn't apply to it.
const isBlockSelected = ({ state: { selection } }: Editor) =>
  selection instanceof NodeSelection && selection.node.isBlock;

export const canEditLink = (editor: Editor) =>
  !isBlockSelected(editor) &&
  (!editor.state.selection.empty || editor.isActive('link'));

export const useLinkEditor = (editor: Editor | null): LinkEditor => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!editor) return;
    const close = () => setIsEditing(false);
    editor.on('selectionUpdate', close);
    return () => {
      editor.off('selectionUpdate', close);
    };
  }, [editor]);

  const start = useCallback(() => {
    if (!editor || !canEditLink(editor)) return;
    // Editing a link under the caret applies to the whole link, not an empty range.
    editor.chain().focus().extendMarkRange('link').run();
    setIsEditing(true);
  }, [editor]);

  const cancel = useCallback(() => {
    setIsEditing(false);
    editor?.commands.focus();
  }, [editor]);

  const remove = useCallback(() => {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    setIsEditing(false);
  }, [editor]);

  const apply = useCallback(
    (href: string) => {
      const value = href.trim();
      if (!value) {
        remove();
        return;
      }
      editor
        ?.chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: value })
        .run();
      setIsEditing(false);
    },
    [editor, remove]
  );

  return { isEditing, start, cancel, apply, remove };
};
