import { useState } from "react";
import currencies from "../../data/currencies.json";
import { SelectCurrency } from "../select/SelectCurrency";
import "./form.css";

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
        <div className="inputs">
          <label>
            Montant
            <input
              className="amount"
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
        </div>
        <input type="submit" value="Convertir" className="button" />
      </form>
      <p className="convert">
        {amount} {fromCurrency.short} <span>=</span>{" "}
        <span className="result">{result}</span>{" "}
        <span className="currency">{toCurrency.short}</span>
      </p>
      <p className="rate">
        1 {fromCurrency.short} = {currentRate} {toCurrency.short}
      </p>
    </>
  );
};
