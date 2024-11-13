import React, { useState } from 'react';
import CodeField from '../CodeField/CodeField';
import EditSection from '../EditSection/EditSection';
import { Link } from 'react-router-dom';
import { templates } from '../data/templates';
import Select from '../components/Select';
import { HTMLtemplateEnWithFooter } from '../data/templateEnWithFooter';

const MainPage: React.FC = () => {
  const initialHistory = localStorage.getItem('mail');
  const currentTemplate = localStorage.getItem('currentTemplate');
  const [HTMLCode, setHTMLCode] = useState<[string, number]>(['', 0]);
  const [count, setCount] = useState<number>(0);
  const [HTMLTemplate, setHTMLTemplate] = useState(
    initialHistory
      ? JSON.parse(initialHistory)
      : currentTemplate
        ? JSON.parse(currentTemplate)
        : HTMLtemplateEnWithFooter
  );

  const handleHTML = (e: [string, number]) => {
    setHTMLCode(e);
    setCount(count + 1);
  };

  const handleSelectChange = (selectedTemplate: string) => {
    setHTMLTemplate(selectedTemplate);
    localStorage.setItem('mail', JSON.stringify(selectedTemplate));
  };

  return (
    <div
      className={`w-[100vw] h-[100vh] flex flex-col items-center p-1 pt-2   `}
    >
      <div className="absolute left-5 flex gap-1">
        <Link className="btn btn-neutral" to="/translate">
          Перевести
        </Link>
      </div>
      <Select onChange={handleSelectChange} templates={templates} />
      <h1 className="text-[32px] font-bold mb-2">Email constructor</h1>
      <EditSection setHTMLCode={handleHTML} />
      <section className="w-[100vw] justify-between">
        <CodeField
          HTMLTemplate={HTMLTemplate}
          HTMLCode={HTMLCode}
          isClicked={count}
        />
      </section>
    </div>
  );
};

export default MainPage;
