import React from "react";
import Button from "react-bootstrap/Button";
import { buttons } from "../data/buttons";

interface EditSectionProps {
  setHTMLCode: (e: [string, number]) => void;
}

const EditSection: React.FC<EditSectionProps> = ({ setHTMLCode }) => {
  return (
    <section className="flex gap-3">
      {buttons.map((button) => (
        <Button
          onClick={() => {
            setHTMLCode([button.html, button.lines]);
          }}
          variant={button.variant}
          key={button.id}
        >
          {button.name}
        </Button>
      ))}
    </section>
  );
};

export default EditSection;
