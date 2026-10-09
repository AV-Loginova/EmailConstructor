import { FormEvent, useEffect, useState } from 'react';
import { Editor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';

import { canEditLink, LinkEditor } from '../useLinkEditor';
import { ToolButton } from './FormattingToolbar';
import { BoldIcon, EditIcon, LinkIcon, UnlinkIcon } from './icons';

interface LinkFormProps {
  initialHref: string;
  link: LinkEditor;
}

const LinkForm = ({ initialHref, link }: LinkFormProps) => {
  const [href, setHref] = useState(initialHref);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    link.apply(href);
  };

  return (
    <form className="flex items-center gap-1" onSubmit={submit}>
      <input
        className="input input-bordered input-sm w-64"
        aria-label="URL ссылки"
        placeholder="https://"
        value={href}
        autoFocus
        onFocus={(e) => e.target.select()}
        onChange={(e) => setHref(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') link.cancel();
        }}
      />
      <button type="submit" className="btn btn-sm btn-primary">
        Применить
      </button>
      <button
        type="button"
        className="btn btn-sm btn-ghost"
        onClick={link.cancel}
      >
        Отмена
      </button>
    </form>
  );
};

interface SelectionBubbleMenuProps {
  editor: Editor;
  link: LinkEditor;
  container: () => HTMLElement | null;
}

const SelectionBubbleMenu = ({
  editor,
  link,
  container,
}: SelectionBubbleMenuProps) => {
  const { isBold, href } = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      isBold: e.isActive('bold'),
      href: e.isActive('link')
        ? (e.getAttributes('link').href as string | undefined) ?? ''
        : null,
    }),
  });

  // The menu changes width when the link form opens, so floating-ui must re-measure it.
  useEffect(() => {
    editor.view.dispatch(
      editor.state.tr.setMeta('bubbleMenu', 'updatePosition')
    );
  }, [editor, link.isEditing]);

  return (
    <BubbleMenu
      editor={editor}
      // Outside the canvas shadow root, so app styles and theme apply to the menu.
      appendTo={() => container() ?? document.body}
      options={{ placement: 'top', strategy: 'fixed' }}
      shouldShow={({ editor: e, view, element }) =>
        (view.hasFocus() || element.contains(document.activeElement)) &&
        canEditLink(e)
      }
      className="z-50 flex items-center gap-1 p-1 rounded-box bg-base-100 text-base-content shadow-lg border border-base-300"
    >
      {link.isEditing ? (
        <LinkForm initialHref={href ?? ''} link={link} />
      ) : (
        <>
          <ToolButton
            label="Жирный"
            title="Жирный (⌘B)"
            active={isBold}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <BoldIcon />
          </ToolButton>
          {href === null ? (
            <ToolButton label="Ссылка" title="Ссылка (⌘K)" onClick={link.start}>
              <LinkIcon />
              Ссылка
            </ToolButton>
          ) : (
            <>
              <a
                className="link link-hover text-primary text-sm max-w-48 truncate px-1"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={href}
              >
                {href || '(пустая ссылка)'}
              </a>
              <ToolButton
                label="Изменить ссылку"
                title="Изменить (⌘K)"
                onClick={link.start}
              >
                <EditIcon />
              </ToolButton>
              <ToolButton
                label="Убрать ссылку"
                title="Убрать ссылку"
                onClick={link.remove}
              >
                <UnlinkIcon />
              </ToolButton>
            </>
          )}
        </>
      )}
    </BubbleMenu>
  );
};

export default SelectionBubbleMenu;
