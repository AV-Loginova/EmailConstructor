import React from 'react';

import { codeEditButtons } from '../../shared/constants/buttons';

interface EditSectionProps {
  setHTMLCode: (e: [string, number]) => void;
}

const EditSection: React.FC<EditSectionProps> = ({ setHTMLCode }) => {
  return (
    <section className="flex gap-3">
      {codeEditButtons.map((button) => (
        <button
          className={`btn btn-${button.variant}`}
          onClick={() => {
            setHTMLCode([button.html, button.lines]);
          }}
          key={button.id}
        >
          {button.name}
        </button>
      ))}
    </section>
  );
};

export default EditSection;
