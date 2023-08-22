import { ComponentProps } from "react";
import "./numberInput.css"

interface NumberInput extends ComponentProps<"input"> {
  label: string;
  setValue: (value: React.SetStateAction<number>) => void;
}

export const NumberInput = ({ name, label, setValue }: NumberInput) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(parseFloat(event.target.value));
  };

  return (
    <label>
      {label}
      <input
        className="input-number"
        name={name}
        type="number"
        step="any"
        placeholder={label}
        onChange={handleChange}
        required
      />
    </label>
  );
};
