import { Template } from '../shared/constants/templates';

interface SelectProps {
  onChange: (value: string) => void;
  templates: Template[];
}

const Select = ({ templates, onChange }: SelectProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(templates[e.target.selectedIndex].value);
    localStorage.setItem(
      'currentTemplate',
      JSON.stringify(templates[e.target.selectedIndex].value)
    );
  };
  return (
    <div className="w-[200px] absolute top-2 right-4 ">
      <select
        onChange={handleSelectChange}
        className="select select-bordered w-full max-w-xs"
        aria-label="Default select example"
        defaultValue="default"
      >
        {templates.map((template) => {
          return (
            <option key={template.id} value={template.name}>
              {template.title}
            </option>
          );
        })}
        <option value="default" disabled>
          Выберите шаблон
        </option>
      </select>
    </div>
  );
};

export default Select;
