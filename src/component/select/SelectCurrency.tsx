import { ComponentProps } from "react";
import currencies from "../../data/currencies.json";

type Currency = {
  label: string;
  value: string;
  rates: number[];
};

interface Select extends ComponentProps<"select"> {
  label: string;
  options: Currency[];
  setCurrency: (value: React.SetStateAction<Currency>) => void;
}

export const SelectCurrency = ({
  label,
  value,
  options,
  setCurrency,
}: Select) => {
  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setCurrency: (value: React.SetStateAction<Currency>) => void
  ) => {
    event.preventDefault();
    const currentCurrency = currencies.filter(
      (currency) => currency.value === event.target.value
    );
    setCurrency(currentCurrency[0]);
  };

  return (
    <label>
      {label}
      <select
        value={value}
        onChange={(e) => handleCurrencyChange(e, setCurrency)}
      >
        {options.map((option, index) => (
          <option value={option.value} key={`option${index}`}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
