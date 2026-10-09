import { useRef } from 'react';
import Papa from 'papaparse';

import { CompileResult, TranslationTable } from '@shared/builder/compile';

interface TranslationsControlProps {
  table: TranslationTable | null;
  result: CompileResult | null;
  onChange: (table: TranslationTable | null) => void;
}

const TranslationsControl = ({
  table,
  result,
  onChange,
}: TranslationsControlProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = (file: File) =>
    Papa.parse<string[]>(file, {
      header: false,
      skipEmptyLines: 'greedy',
      complete: ({ data }) => onChange(data.length ? data : null),
      error: (error) =>
        window.alert(`Не удалось прочитать CSV: ${error.message}`),
    });

  const missing = result?.report.missing.length ?? 0;

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          // Same file picked again must still fire change.
          e.target.value = '';
        }}
      />
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => inputRef.current?.click()}
      >
        {table ? 'Заменить переводы' : 'Загрузить переводы'}
      </button>
      {table && result && (
        <>
          <span className="text-sm whitespace-nowrap">
            {result.languages.join(', ')}
            {' · '}
            <span className={missing ? 'text-warning' : 'text-success'}>
              {missing ? `пропусков: ${missing}` : 'всё переведено'}
            </span>
          </span>
          <button
            className="btn btn-ghost btn-xs"
            aria-label="Убрать переводы"
            title="Убрать переводы"
            onClick={() => onChange(null)}
          >
            ✕
          </button>
        </>
      )}
    </div>
  );
};

export default TranslationsControl;
