import { CompileReport } from '@shared/builder/compile';

interface ReportModalProps {
  report: CompileReport;
  onConfirm: () => void;
  onCancel: () => void;
}

interface Group {
  title: string;
  sources: string[];
}

const groupByLanguage = (report: CompileReport) => {
  const byLang = new Map<string, Group[]>();
  const add = (lang: string, title: string, source: string) => {
    const groups = byLang.get(lang) ?? [];
    let group = groups.find((item) => item.title === title);
    if (!group) {
      group = { title, sources: [] };
      groups.push(group);
    }
    group.sources.push(source);
    byLang.set(lang, groups);
  };
  report.missing.forEach(({ lang, source, reason }) =>
    add(lang, reason === 'noRow' ? 'Нет перевода' : 'Пустая ячейка', source)
  );
  report.linkMismatch.forEach(({ lang, source }) =>
    add(lang, 'Не совпало число ссылок', source)
  );
  return [...byLang];
};

const SourceList = ({ sources }: { sources: string[] }) => (
  <ul className="list-disc pl-5 text-sm">
    {sources.map((source) => (
      <li key={source} className="whitespace-pre-wrap break-words">
        {source}
      </li>
    ))}
  </ul>
);

const ReportModal = ({ report, onConfirm, onCancel }: ReportModalProps) => (
  <div className="modal modal-open" onClick={onCancel}>
    <div
      className="modal-box max-w-2xl flex flex-col gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="font-bold text-lg">Не всё переведено</h3>
      <p className="text-sm">
        Строки без перевода выгрузятся на исходном языке.
      </p>
      <div className="flex flex-col gap-4 overflow-auto max-h-[60vh]">
        {groupByLanguage(report).map(([lang, groups]) => (
          <section key={lang} className="flex flex-col gap-2">
            <h4 className="font-semibold">{lang}</h4>
            {groups.map(({ title, sources }) => (
              <div key={title}>
                <div className="text-sm text-warning">
                  {title}: {sources.length}
                </div>
                <SourceList sources={sources} />
              </div>
            ))}
          </section>
        ))}
        {report.unusedRows.length > 0 && (
          <section className="flex flex-col gap-2">
            <h4 className="font-semibold">
              Лишние строки таблицы: {report.unusedRows.length}
            </h4>
            <SourceList sources={report.unusedRows} />
          </section>
        )}
      </div>
      <div className="modal-action mt-0">
        <button className="btn btn-sm btn-ghost" onClick={onCancel}>
          Отмена
        </button>
        <button className="btn btn-sm btn-primary" onClick={onConfirm}>
          Всё равно скачать
        </button>
      </div>
    </div>
  </div>
);

export default ReportModal;
