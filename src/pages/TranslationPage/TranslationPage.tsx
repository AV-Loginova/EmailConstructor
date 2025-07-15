import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';
import JSZip from 'jszip';

import { translationsMap } from '../../shared/constants/translations';

interface Translation {
  original: string;
  translation: string;
}

type Language = 'EN' | 'ES' | 'PT' | 'TR' | 'HI' | 'ID' | 'RU';

interface TranslationsByLanguage {
  [key: string]: Translation[];
}

const TranslationPage = () => {
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: false,
        complete: (results) => {
          setCsvData(results.data as string[][]);
        },
        error: (error) => {
          console.error('Error parsing CSV: ', error);
        },
      });
    }
  };

  const downloadHtmlZip = async () => {
    const mailItem = localStorage.getItem('mail');
    const htmlTemplate = mailItem ? JSON.parse(mailItem) : null;

    if (!htmlTemplate) {
      console.error('HTML template not found in localStorage.');
      return;
    }

    const languages = csvData[0];
    const translationsByLanguage: TranslationsByLanguage = {};

    for (let i = 1; i < csvData.length; i++) {
      const row = csvData[i];
      const englishText = row[0];

      languages.forEach((lang, index) => {
        if (!translationsByLanguage[lang]) {
          translationsByLanguage[lang] = [];
        }
        translationsByLanguage[lang].push({
          original: englishText,
          translation: row[index],
        });
      });
    }

    const zip = new JSZip();

    Object.keys(translationsByLanguage).forEach((language) => {
      let translatedHtml = htmlTemplate;

      translatedHtml = translatedHtml.replace(/<!--.*?-->/gs, '');
      translatedHtml = translatedHtml.replace(/\n\s*\n/g, '\n');

      const translations = translationsByLanguage[language];

      translations.forEach(({ original, translation }) => {
        const escapedOriginal = original.trim();
        const text = translation.trim();

        if (translatedHtml.includes(escapedOriginal)) {
          translatedHtml = translatedHtml.replace(escapedOriginal, text);
        } else {
          console.log(`"${escapedOriginal}" not found in HTML.`);
        }
      });

      for (const [key, value] of Object.entries(translationsMap)) {
        if (value[language as Language]) {
          const escapedKey = key;

          if (translatedHtml.includes(escapedKey)) {
            translatedHtml = translatedHtml.replace(
              escapedKey,
              value[language as Language]
            );
          }
        }
      }

      translatedHtml = translatedHtml.replace(/\*(.*?)\*/g, '<b>$1</b>');

      zip.file(`email_${language}.html`, translatedHtml);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'translated_emails.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-2 px-4 h-[100vh]">
      <Link className="btn btn-neutral m-0 absolute left-4" to="/">
        Назад
      </Link>
      <h2 className="mb-10 text-center text-4xl">Загрузите CSV для перевода</h2>
      <p className="ml-3 mb-5">
        Выделите символом * элементы текста в верстке и переводе, которые должны
        быть жирными. Например *эта* часть текста должна быть жирной, при
        переводе получим: <b>эта</b> часть текста должна быть жирной. Текст
        ссылок, однако, нужно выделять в отдельную ячейку.
      </p>

      <div className="flex flex-nowrap">
        <input
          type="file"
          className="file-input file-input-bordered w-full rounded-r-none"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
          accept=".csv"
          onChange={handleFileChange}
        />

        <button
          className="btn btn-outline-primary rounded-l-none"
          type="button"
          id="inputGroupFileAddon04"
          onClick={downloadHtmlZip}
          disabled={!csvData.length}
        >
          Создать ZIP с HTML файлами
        </button>
      </div>

      {csvData.length > 0 && (
        <div className="mt-3 overflow-y-scroll max-h-[75vh]">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                {csvData[0].map((lang, index) => (
                  <th key={index}>{lang}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, index) => (
                <tr key={index}>
                  {row.map((text, langIndex) => (
                    <td key={langIndex}>{text}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TranslationPage;
