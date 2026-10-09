import { useState } from 'react';

import { CompileResult } from '@shared/builder/compile';

interface PreviewModalProps {
  result: CompileResult;
  onClose: () => void;
}

const PreviewModal = ({ result, onClose }: PreviewModalProps) => {
  const [lang, setLang] = useState(result.languages[0]);

  return (
    <div className="modal modal-open" onClick={onClose}>
      <div
        className="modal-box w-auto max-w-[90vw] p-4 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-lg mr-auto">Предпросмотр</h3>
          {result.languages.length > 1 && (
            <select
              className="select select-bordered select-sm"
              aria-label="Язык"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {result.languages.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          )}
          <button className="btn btn-sm btn-ghost" onClick={onClose}>
            Закрыть
          </button>
        </div>
        <iframe
          title="Предпросмотр письма"
          srcDoc={result.html[lang]}
          sandbox=""
          className="w-[680px] h-[75vh] bg-white rounded"
        />
      </div>
    </div>
  );
};

export default PreviewModal;
