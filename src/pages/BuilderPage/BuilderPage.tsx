import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createDocument, Editor } from '@tiptap/core';
import { EditorState } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';

import { compile, DocNode } from '@shared/builder/compile';
import { loadDraft, saveDraft } from '@shared/builder/draft';
import {
  buildCsv,
  buildZip,
  CSV_FILENAME,
  downloadBlob,
  ZIP_FILENAME,
} from '@shared/builder/export';
import { SkeletonName } from '@shared/templates/skeleton';

import FormattingToolbar from './components/FormattingToolbar';
import PreviewModal from './components/PreviewModal';
import SelectionBubbleMenu from './components/SelectionBubbleMenu';
import SkeletonCanvas from './components/SkeletonCanvas';
import { builderExtensions } from './extensions';
import { useLinkEditor } from './useLinkEditor';

const SKELETONS: { name: SkeletonName; title: string }[] = [
  // { name: 'marketing', title: 'Marketing' },
  { name: 'system', title: 'System' },
  { name: 'sales', title: 'Sales' },
];

// A fresh state drops undo history, so undo can't pull text over from another skeleton.
const replaceDoc = (editor: Editor, doc: DocNode | undefined) => {
  editor.view.updateState(
    EditorState.create({
      doc: createDocument(doc ?? '', editor.schema),
      plugins: editor.state.plugins,
    })
  );
};

const BuilderPage = () => {
  const [initialDraft] = useState(loadDraft);
  const [skeleton, setSkeleton] = useState(() =>
    SKELETONS.some(({ name }) => name === initialDraft.skeleton)
      ? initialDraft.skeleton
      : SKELETONS[0].name
  );
  const [table, setTable] = useState(initialDraft.table);
  const docsRef = useRef(initialDraft.docs);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  // Extensions are created once, so the ⌘K handler reaches the latest link editor via a ref.
  const pageRef = useRef<HTMLDivElement>(null);
  const editLinkRef = useRef(() => {});
  const editor = useEditor({
    extensions: builderExtensions(() => editLinkRef.current()),
    content: docsRef.current[skeleton],
  });
  const link = useLinkEditor(editor);
  editLinkRef.current = link.start;

  // Saved synchronously on every change: the draft is small and a reload must not lose the last keystroke.
  useEffect(() => {
    if (!editor) return;
    const save = () => {
      docsRef.current = { ...docsRef.current, [skeleton]: editor.getJSON() };
      saveDraft({ skeleton, table, docs: docsRef.current });
    };
    save();
    editor.on('update', save);
    return () => {
      editor.off('update', save);
    };
  }, [editor, skeleton, table]);

  const switchSkeleton = (next: SkeletonName) => {
    if (editor) replaceDoc(editor, docsRef.current[next]);
    setSkeleton(next);
  };

  const compileDoc = () =>
    editor ? compile(editor.getJSON(), skeleton, table) : null;

  const openPreview = () => {
    const result = compileDoc();
    if (result) setPreviewHtml(result.html.EN);
  };

  const downloadZip = async () => {
    const result = compileDoc();
    if (result) downloadBlob(await buildZip(result), ZIP_FILENAME);
  };

  const downloadCsv = () => {
    const result = compileDoc();
    if (!result) return;
    downloadBlob(
      new Blob([buildCsv(result)], { type: 'text/csv;charset=utf-8' }),
      CSV_FILENAME
    );
  };

  const clearDraft = () => {
    if (!editor) return;
    if (
      !window.confirm(
        'Очистить письмо? Текст и таблица переводов будут удалены, каркас останется.'
      )
    )
      return;
    setTable(null);
    editor.commands.clearContent(true);
  };

  return (
    <div ref={pageRef} className="w-[100vw] h-[100vh] flex flex-col">
      <header className="flex items-center gap-2 p-2 border-b border-base-300">
        <Link className="btn btn-ghost btn-sm" to="/">
          ← Редактор
        </Link>
        <select
          className="select select-bordered select-sm"
          aria-label="Каркас"
          value={skeleton}
          onChange={(e) => switchSkeleton(e.target.value as SkeletonName)}
        >
          {SKELETONS.map(({ name, title }) => (
            <option key={name} value={name}>
              {title}
            </option>
          ))}
        </select>
        <button className="btn btn-ghost btn-sm ml-auto" onClick={clearDraft}>
          Очистить
        </button>
        <button className="btn btn-outline btn-sm" onClick={downloadZip}>
          Скачать ZIP
        </button>
        <button className="btn btn-outline btn-sm" onClick={downloadCsv}>
          Скачать CSV
        </button>
        <button className="btn btn-primary btn-sm" onClick={openPreview}>
          Предпросмотр
        </button>
      </header>
      <div className="flex flex-1 min-h-0">
        <aside className="w-48 shrink-0 border-r border-base-300 p-2" />
        <main className="flex-1 overflow-auto px-6 pb-6 flex flex-col items-center">
          {editor && (
            <div className="sticky top-0 z-10 py-3">
              <FormattingToolbar editor={editor} link={link} />
            </div>
          )}
          <SkeletonCanvas skeleton={skeleton}>
            <EditorContent editor={editor} />
          </SkeletonCanvas>
          {editor && (
            <SelectionBubbleMenu
              editor={editor}
              link={link}
              container={() => pageRef.current}
            />
          )}
        </main>
      </div>
      {previewHtml !== null && (
        <PreviewModal html={previewHtml} onClose={() => setPreviewHtml(null)} />
      )}
    </div>
  );
};

export default BuilderPage;
