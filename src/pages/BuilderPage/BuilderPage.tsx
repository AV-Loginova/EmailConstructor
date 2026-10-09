import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createDocument, Editor } from '@tiptap/core';
import { EditorState } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';

import {
  compile,
  CompileResult,
  DocNode,
  isReportEmpty,
} from '@shared/builder/compile';
import { loadDraft, saveDraft } from '@shared/builder/draft';
import {
  buildCsv,
  buildZip,
  CSV_FILENAME,
  downloadBlob,
  ZIP_FILENAME,
} from '@shared/builder/export';
import { SkeletonName } from '@shared/templates/skeleton';

import BlockPalette from './components/BlockPalette';
import FormattingToolbar from './components/FormattingToolbar';
import PreviewModal from './components/PreviewModal';
import ReportModal from './components/ReportModal';
import SelectionBubbleMenu from './components/SelectionBubbleMenu';
import SkeletonCanvas from './components/SkeletonCanvas';
import TranslationsControl from './components/TranslationsControl';
import { builderExtensions } from './extensions';
import { ensureNodeIds } from './nodeId';
import { setUntranslatedIds } from './untranslatedHighlight';
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
  ensureNodeIds(editor);
};

const RECOMPILE_DELAY = 300;

type Download = (result: CompileResult) => void | Promise<void>;

const downloadZip: Download = async (result) =>
  downloadBlob(await buildZip(result), ZIP_FILENAME);

const downloadCsv: Download = (result) =>
  downloadBlob(
    new Blob([buildCsv(result)], { type: 'text/csv;charset=utf-8' }),
    CSV_FILENAME
  );

const BuilderPage = () => {
  const [initialDraft] = useState(loadDraft);
  const [skeleton, setSkeleton] = useState(() =>
    SKELETONS.some(({ name }) => name === initialDraft.skeleton)
      ? initialDraft.skeleton
      : SKELETONS[0].name
  );
  const [table, setTable] = useState(initialDraft.table);
  const docsRef = useRef(initialDraft.docs);
  const [preview, setPreview] = useState<CompileResult | null>(null);
  const [result, setResult] = useState<CompileResult | null>(null);
  const [pending, setPending] = useState<{
    result: CompileResult;
    download: Download;
  } | null>(null);

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

  // Keeps the translation status current while typing, without compiling on every keystroke.
  useEffect(() => {
    if (!editor) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const recompile = () =>
      setResult(compile(editor.getJSON(), skeleton, table));
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(recompile, RECOMPILE_DELAY);
    };
    recompile();
    editor.on('update', schedule);
    return () => {
      clearTimeout(timer);
      editor.off('update', schedule);
    };
  }, [editor, skeleton, table]);

  useEffect(() => {
    if (editor) setUntranslatedIds(editor, result?.untranslatedNodeIds ?? []);
  }, [editor, result]);

  const switchSkeleton = (next: SkeletonName) => {
    if (editor) replaceDoc(editor, docsRef.current[next]);
    setSkeleton(next);
  };

  const compileDoc = () =>
    editor ? compile(editor.getJSON(), skeleton, table) : null;

  const openPreview = () => {
    setPreview(compileDoc());
  };

  const requestDownload = (download: Download) => {
    const result = compileDoc();
    if (!result) return;
    if (isReportEmpty(result.report)) download(result);
    else setPending({ result, download });
  };

  const confirmDownload = () => {
    if (!pending) return;
    pending.download(pending.result);
    setPending(null);
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
      <header className="flex flex-wrap items-center gap-2 p-2 border-b border-base-300">
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
        <TranslationsControl
          table={table}
          result={result}
          onChange={setTable}
        />
        <button className="btn btn-ghost btn-sm ml-auto" onClick={clearDraft}>
          Очистить
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => requestDownload(downloadZip)}
        >
          Скачать ZIP
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => requestDownload(downloadCsv)}
        >
          Скачать CSV
        </button>
        <button className="btn btn-primary btn-sm" onClick={openPreview}>
          Предпросмотр
        </button>
      </header>
      <div className="flex flex-1 min-h-0">
        <aside className="w-48 shrink-0 border-r border-base-300 p-2">
          {editor && <BlockPalette editor={editor} />}
        </aside>
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
      {preview && (
        <PreviewModal result={preview} onClose={() => setPreview(null)} />
      )}
      {pending && (
        <ReportModal
          report={pending.result.report}
          onConfirm={confirmDownload}
          onCancel={() => setPending(null)}
        />
      )}
    </div>
  );
};

export default BuilderPage;
