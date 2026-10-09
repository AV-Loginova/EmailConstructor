import { useRef, useState } from 'react';

import { DocNode } from '@shared/builder/compile';
import { importEmail } from '@shared/builder/importHtml';
import { SkeletonName } from '@shared/templates/skeleton';

interface ImportControlProps {
  // Returns false when the manager declined to replace the current letter.
  onImport: (skeleton: SkeletonName, doc: DocNode) => boolean;
}

const ImportControl = ({ onImport }: ImportControlProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keepLinkStyles, setKeepLinkStyles] = useState(false);

  const upload = async (file: File) => {
    const result = importEmail(await file.text(), { keepLinkStyles });
    if ('error' in result) {
      window.alert(result.error);
      return;
    }
    if (onImport(result.skeleton, result.doc) && result.simplified)
      window.alert(
        `Письмо импортировано. Не распознано фрагментов: ${result.simplified} — они вставлены как обычный текст, проверьте письмо.`
      );
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".html,.htm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          // Same file picked again must still fire change.
          e.target.value = '';
        }}
      />
      <div
        className="tooltip tooltip-bottom"
        data-tip="HTML-письмо System или Sales для правки"
      >
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => inputRef.current?.click()}
        >
          Импорт HTML
        </button>
      </div>
      <label
        className="tooltip tooltip-bottom flex items-center gap-1 text-sm cursor-pointer"
        data-tip="Ссылки останутся с цветом и шрифтом из исходного письма"
      >
        <input
          type="checkbox"
          className="checkbox checkbox-xs"
          checked={keepLinkStyles}
          onChange={(e) => setKeepLinkStyles(e.target.checked)}
        />
        Сохранять стили ссылок
      </label>
    </>
  );
};

export default ImportControl;
