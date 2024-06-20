import React, { useEffect, useState } from "react";
import CodeField from "./CodeField/CodeField";
import EditSection from "./EditSection/EditSection";

const App: React.FC = () => {
  const [HTMLCode, setHTMLCode] = useState<[string, number]>(["", 0]);
  const [count, setCount] = useState<number>(0);

  const handleHTML = (e: [string, number]) => {
    setHTMLCode(e);
    setCount(count + 1);
  };

  return (
    <div className="w-[100vw] flex flex-col items-center p-1 pt-2">
      <h1 className="text-[32px] text-[#2d2d2d] font-bold mb-2">
        📧 Email constructor
      </h1>
      <EditSection setHTMLCode={handleHTML} />
      <section className="w-[100vw] justify-between">
        <CodeField HTMLCode={HTMLCode} isClicked={count} />
      </section>
    </div>
  );
};

export default App;
