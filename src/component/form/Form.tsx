import { useState } from "react";
import currencies from "../../data/currencies.json";
import { SelectCurrency } from "../select/SelectCurrency";

export const Form = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const currentRate = fromCurrency.rates[parseInt(toCurrency.value)];

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
        <SelectCurrency
          label="De"
          options={currencies}
          value={fromCurrency.value}
          setCurrency={setFromCurrency}
        />
        <SelectCurrency
          label="Vers"
          options={currencies}
          value={toCurrency.value}
          setCurrency={setToCurrency}
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
