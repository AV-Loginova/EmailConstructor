import { MouseEvent, ReactNode } from 'react';
import { Editor, useEditorState } from '@tiptap/react';

import { ListStyle } from '@shared/snippets/render';

import { canEditLink, LinkEditor } from '../useLinkEditor';
import {
  BoldIcon,
  LinkIcon,
  ListIcon,
  PlainListIcon,
  RedoIcon,
  UndoIcon,
} from './icons';

interface ToolButtonProps {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

// mousedown is suppressed so the editor keeps its focus and selection.
const keepFocus = (event: MouseEvent) => event.preventDefault();

export const ToolButton = ({
  label,
  title,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolButtonProps) => (
  <button
    type="button"
    className={`btn btn-sm btn-ghost gap-1.5 px-2 font-medium disabled:bg-transparent disabled:text-base-content disabled:opacity-30 ${
      active
        ? 'bg-primary/15 text-primary hover:bg-primary/25'
        : 'text-base-content/80 hover:text-base-content'
    }`}
    aria-label={label}
    aria-pressed={active}
    title={title}
    disabled={disabled}
    onMouseDown={keepFocus}
    onClick={onClick}
  >
    {children}
  </button>
);

// Same style toggles the list off; the other style restyles it in place.
const toggleList = (editor: Editor, listStyle: ListStyle) => {
  const chain = editor.chain().focus();
  if (!editor.isActive('bulletList')) {
    // Unlike toggleBulletList, doesn't merge into an adjacent list of another style.
    chain.wrapInList('bulletList', { listStyle }).run();
  } else if (editor.isActive('bulletList', { listStyle })) {
    chain.toggleBulletList().run();
  } else {
    chain.updateAttributes('bulletList', { listStyle }).run();
  }
};

interface FormattingToolbarProps {
  editor: Editor;
  link: LinkEditor;
}

const FormattingToolbar = ({ editor, link }: FormattingToolbarProps) => {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      isHeading: e.isActive('heading'),
      canHeading: e.can().setHeading({ level: 2 }),
      isBold: e.isActive('bold'),
      canBold: e.can().toggleBold(),
      isLink: e.isActive('link'),
      canLink: canEditLink(e),
      isPlainList: e.isActive('bulletList', { listStyle: 'none' }),
      isDiscList: e.isActive('bulletList', { listStyle: 'disc' }),
      canList:
        e.isActive('bulletList') ||
        e.can().wrapInList('bulletList', { listStyle: 'none' }),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  const setBlockType = (value: string) => {
    const chain = editor.chain().focus();
    if (value === 'heading') chain.setHeading({ level: 2 }).run();
    else chain.setParagraph().run();
  };

  return (
    <div
      className="flex items-center gap-0.5 p-1 rounded-box bg-base-100 border border-base-300 shadow-sm"
      role="toolbar"
      aria-label="Форматирование"
    >
      <select
        className="select select-bordered select-sm"
        aria-label="Тип блока"
        value={state.isHeading ? 'heading' : 'paragraph'}
        disabled={!state.isHeading && !state.canHeading}
        onChange={(e) => setBlockType(e.target.value)}
      >
        <option value="paragraph">Текст</option>
        <option value="heading">Заголовок</option>
      </select>
      <ToolButton
        label="Жирный"
        title="Жирный (⌘B)"
        active={state.isBold}
        disabled={!state.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon />
      </ToolButton>
      <ToolButton
        label="Ссылка"
        title="Ссылка (⌘K)"
        active={state.isLink}
        disabled={!state.canLink}
        onClick={link.start}
      >
        <LinkIcon />
      </ToolButton>
      <ToolButton
        label="Список"
        title="Список без маркеров"
        active={state.isPlainList}
        disabled={!state.canList}
        onClick={() => toggleList(editor, 'none')}
      >
        <PlainListIcon />
        Список
      </ToolButton>
      <ToolButton
        label="Маркированный список"
        title="Маркированный список"
        active={state.isDiscList}
        disabled={!state.canList}
        onClick={() => toggleList(editor, 'disc')}
      >
        <ListIcon />
        Маркеры
      </ToolButton>
      <div className="w-px h-5 mx-1 bg-base-300" />
      <ToolButton
        label="Отменить"
        title="Отменить (⌘Z)"
        disabled={!state.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <UndoIcon />
      </ToolButton>
      <ToolButton
        label="Повторить"
        title="Повторить (⇧⌘Z)"
        disabled={!state.canRedo}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <RedoIcon />
      </ToolButton>
    </div>
  );
};

export default FormattingToolbar;
