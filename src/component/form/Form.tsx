import { useState } from "react";
import currencies from "../../data/currencies.json";
import { Currency, SelectCurrency } from "../select/SelectCurrency";
import "./form.css";
import { NumberInput } from "../input/NumberInput";

export const Form = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const currentRate = fromCurrency.rates[parseInt(toCurrency.value)];

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentResult = amount * currentRate;
    setResult(currentResult);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <NumberInput name="amount" label="Montant" setValue={setAmount} />
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
      <Result
        amount={amount}
        fromCurrency={fromCurrency}
        result={result}
        toCurrency={toCurrency}
        currentRate={currentRate}
      />
    </>
  );
};

type Result = {
  amount: number;
  fromCurrency: Currency;
  toCurrency: Currency;
  result: number;
  currentRate: number;
};

const Result = ({
  amount,
  fromCurrency,
  result,
  toCurrency,
  currentRate,
}: Result) => {
  return (
    <>
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
