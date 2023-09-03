import { ComponentProps } from "react";

export type Currency = {
  code: string;
  decimal_digits: number;
  name: string;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
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
    const currentCurrency = options.filter(
      (currency) => currency.code === event.target.value
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
          <option value={option.code} key={`option${index}`}>
            {`${option.code} - ${option.name}`}
          </option>
        ))}
      </select>
    </label>
  );
};
