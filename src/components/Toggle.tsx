interface ToggleProps {
  onChange: () => void;
  id: string;
  isChecked: boolean;
  label: string;
}

const Toggle = ({ onChange, id, isChecked, label }: ToggleProps) => {
  return (
    <div className="flex items-center">
      <input
        onChange={onChange}
        id={id}
        type="checkbox"
        className="toggle toggle-sm"
        checked={isChecked}
      />
      <label className="ml-1" htmlFor="theme">
        {label}
      </label>
    </div>
  );
};

export default Toggle;
