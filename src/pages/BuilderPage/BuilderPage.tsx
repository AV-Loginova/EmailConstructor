import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EditorContent, useEditor } from '@tiptap/react';

import { compile } from '@shared/builder/compile';
import { SkeletonName } from '@shared/templates/skeleton';

import FormattingToolbar from './components/FormattingToolbar';
import PreviewModal from './components/PreviewModal';
import SelectionBubbleMenu from './components/SelectionBubbleMenu';
import SkeletonCanvas from './components/SkeletonCanvas';
import { builderExtensions } from './extensions';
import { useLinkEditor } from './useLinkEditor';

const SKELETONS: { name: SkeletonName; title: string }[] = [
  { name: 'marketing', title: 'Marketing' },
  { name: 'system', title: 'System' },
  { name: 'sales', title: 'Sales' },
];

const BuilderPage = () => {
  const [skeleton, setSkeleton] = useState<SkeletonName>('marketing');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  // Extensions are created once, so the ⌘K handler reaches the latest link editor via a ref.
  const pageRef = useRef<HTMLDivElement>(null);
  const editLinkRef = useRef(() => {});
  const editor = useEditor({
    extensions: builderExtensions(() => editLinkRef.current()),
  });
  const link = useLinkEditor(editor);
  editLinkRef.current = link.start;

  const openPreview = () => {
    if (!editor) return;
    setPreviewHtml(compile(editor.getJSON(), skeleton, null).html.EN);
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
