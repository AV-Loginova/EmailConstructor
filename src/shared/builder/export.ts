import JSZip from 'jszip';
import Papa from 'papaparse';

import { CompileResult } from './compile';

type ExportSource = Pick<CompileResult, 'languages' | 'html'>;

export const ZIP_FILENAME = 'translated_emails.zip';
export const CSV_FILENAME = 'templates.csv';

// Kommo template import format; only `fields/type` and `text` are filled.
const CSV_FIELDS = ['id', 'sort', 'name', 'fields/type', 'subject', 'text'];

export const buildZip = (result: ExportSource) => {
  const zip = new JSZip();
  result.languages.forEach((lang) =>
    zip.file(`email_${lang}.html`, result.html[lang])
  );
  return zip.generateAsync({ type: 'blob' });
};

export const buildCsv = (result: ExportSource) =>
  Papa.unparse({
    fields: CSV_FIELDS,
    data: result.languages.map((lang) => [
      '',
      '',
      '',
      'html',
      '',
      result.html[lang],
    ]),
  });

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  // Revoked later: some browsers start the download after click() returns.
  setTimeout(() => URL.revokeObjectURL(url));
};
