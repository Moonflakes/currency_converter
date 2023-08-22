import { ComponentProps, useState } from "react";

type Currency = {
  label: string;
  value: string;
  rates: number[];
};

interface Select extends ComponentProps<"select"> {
  label: string;
  options: Currency[];
}

const currency1 = {
  label: "Devise 1",
  value: "0",
  rates: [1, 0.67, 1.12],
};
const currency2 = {
  label: "Devise 2",
  value: "1",
  rates: [0.28, 1, 0.12],
};
const currency3 = {
  label: "Devise 3",
  value: "2",
  rates: [0.9, 0.34, 1],
};

export const Form = () => {
  const [fromCurrency, setFromCurrency] = useState(currency1);
  const [toCurrency, setToCurrency] = useState(currency2);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const currencies = [currency1, currency2, currency3];
  const currentRate = fromCurrency.rates[parseInt(toCurrency.value)];

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const currentFromCurrency = currencies.filter(
      (currency) => currency.value === event.target.value
    );
    setFromCurrency(currentFromCurrency[0]);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const currentToCurrency = currencies.filter(
      (currency) => currency.value === event.target.value
    );
    setToCurrency(currentToCurrency[0]);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAmount(parseFloat(event.target.value));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentResult = amount * currentRate;
    setResult(currentResult);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Montant :
          <input
            name="amount"
            type="number"
            step="any"
            placeholder="Montant"
            onChange={handleAmountChange}
            required
          />
        </label>
        <Select
          label="De"
          options={currencies}
          value={fromCurrency.value}
          onChange={handleFromCurrencyChange}
        />
        <Select
          label="Vers"
          options={currencies}
          value={toCurrency.value}
          onChange={handleToCurrencyChange}
        />
        <input type="submit" value="Convertir" />
      </form>
      <p>
        {amount} {fromCurrency.label} = {result} {toCurrency.label}
      </p>
      <p>
        1 {fromCurrency.label} = {currentRate} {toCurrency.label}
      </p>
    </>
  );
};

const Select = ({ label, value, options, onChange }: Select) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
