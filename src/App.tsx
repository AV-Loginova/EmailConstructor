import React, { useState } from 'react';
import CodeField from './CodeField/CodeField';
import EditSection from './EditSection/EditSection';

const App: React.FC = () => {
  const [HTMLCode, setHTMLCode] = useState<[string, number]>(['', 0]);
  const [count, setCount] = useState<number>(0);
  const [lang, setLang] = useState<string>('EN');

  const handleHTML = (e: [string, number]) => {
    setHTMLCode(e);
    setCount(count + 1);
  };

  const handleLangChange = (event: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem('mail');
    setLang(event.currentTarget.id);
    event.currentTarget.classList.add('active');
  };

  return (
    <div className="w-[100vw] flex flex-col items-center p-1 pt-2">
      <ul className="absolute left-0 flex gap-1">
        <li
          onClick={handleLangChange}
          id="EN"
          className={`btn ${lang === 'EN' ? 'btn-secondary' : 'btn-light'} font-bold`}
        >
          En
        </li>
        <li
          onClick={handleLangChange}
          id="ES"
          className={`btn ${lang === 'ES' ? 'btn-secondary' : 'btn-light'} font-bold`}
        >
          Es
        </li>
        <li
          onClick={handleLangChange}
          id="PT"
          className={`btn ${lang === 'PT' ? 'btn-secondary' : 'btn-light'} font-bold`}
        >
          Pt
        </li>
        <li
          onClick={handleLangChange}
          id="TR"
          className={`btn ${lang === 'TR' ? 'btn-secondary' : 'btn-light'} font-bold`}
        >
          Tr
        </li>
      </ul>

      <h1 className="text-[32px] text-[#2d2d2d] font-bold mb-2">
        📧 Email constructor
      </h1>
      <EditSection setHTMLCode={handleHTML} />
      <section className="w-[100vw] justify-between">
        <CodeField lang={lang} HTMLCode={HTMLCode} isClicked={count} />
      </section>
    </div>
  );
};

export default App;
