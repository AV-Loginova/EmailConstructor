import React, { useState } from 'react';
import CodeField from './CodeField/CodeField';
import EditSection from './EditSection/EditSection';
import { Link } from 'react-router-dom';

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
      <div className="absolute left-5 flex gap-1">
        <Link className="btn btn-secondary" to="/translate">
          Перевести
        </Link>
      </div>

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
