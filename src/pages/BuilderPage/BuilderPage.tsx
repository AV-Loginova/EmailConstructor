import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Placeholder, UndoRedo } from '@tiptap/extensions';

import { compile } from '@shared/builder/compile';
import { SkeletonName } from '@shared/templates/skeleton';

import PreviewModal from './components/PreviewModal';
import SkeletonCanvas from './components/SkeletonCanvas';

const SKELETONS: { name: SkeletonName; title: string }[] = [
  { name: 'marketing', title: 'Marketing' },
  { name: 'system', title: 'System' },
  { name: 'sales', title: 'Sales' },
];

const BuilderPage = () => {
  const [skeleton, setSkeleton] = useState<SkeletonName>('marketing');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      UndoRedo,
      Placeholder.configure({ placeholder: 'Начните писать письмо…' }),
    ],
  });

  const openPreview = () => {
    if (!editor) return;
    setPreviewHtml(compile(editor.getJSON(), skeleton, null).html.EN);
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <header className="flex items-center gap-2 p-2 border-b border-base-300">
        <Link className="btn btn-ghost btn-sm" to="/">
          ← Редактор
        </Link>
        <select
          className="select select-bordered select-sm"
          aria-label="Каркас"
          value={skeleton}
          onChange={(e) => setSkeleton(e.target.value as SkeletonName)}
        >
          {SKELETONS.map(({ name, title }) => (
            <option key={name} value={name}>
              {title}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary btn-sm ml-auto"
          onClick={openPreview}
        >
          Предпросмотр
        </button>
      </header>
      <div className="flex flex-1 min-h-0">
        <aside className="w-48 shrink-0 border-r border-base-300 p-2" />
        <main className="flex-1 overflow-auto p-6 flex justify-center items-start">
          <SkeletonCanvas skeleton={skeleton}>
            <EditorContent editor={editor} />
          </SkeletonCanvas>
        </main>
      </div>
      {previewHtml !== null && (
        <PreviewModal html={previewHtml} onClose={() => setPreviewHtml(null)} />
      )}
    </div>
  );
};

export default BuilderPage;
