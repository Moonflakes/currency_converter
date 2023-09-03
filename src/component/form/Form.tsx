import { FormEvent, useEffect, useState } from "react";
import { Currency, SelectCurrency } from "../select/SelectCurrency";
import "./form.css";
import { NumberInput } from "../input/NumberInput";
const apiKey = import.meta.env.VITE_API_KEY;

export const Form = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState<Currency>({} as Currency);
  const [toCurrency, setToCurrency] = useState<Currency>({} as Currency);
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [currentRate, setCurrentRate] = useState(0);

  const fetchAllCurrencies = (abortController: AbortController) => {
    fetch(
      `https://api.freecurrencyapi.com/v1/currencies?apikey=${apiKey}&currencies`,
      { signal: abortController.signal }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //init values
        setFromCurrency(data.data["EUR"]);
        setToCurrency(data.data["USD"]);
        setCurrencies(Object.values(data.data));
      })
      .then(() => {});
  };

  // set the result of the convertion
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fromCurrency && !toCurrency) return;
    const currentResult = amount * currentRate;
    setResult(currentResult);
  };

  // get all currencies options to init select items
  useEffect(() => {
    const abortController = new AbortController();

    fetchAllCurrencies(abortController);
    return () => {
      abortController.abort();
    };
  }, []);

  // update exchange rate when currencies change
  useEffect(() => {
    const fetchRate = async () => {
      const response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&base_currency=${fromCurrency.code}&currencies=${toCurrency.code}`
      );
      const data = await response.json();
      setCurrentRate(data.data[toCurrency.code]);
    };

    if (toCurrency.code && fromCurrency.code) fetchRate();
    return () => {};
  }, [toCurrency, fromCurrency]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <NumberInput name="amount" label="Montant" setValue={setAmount} />
          <SelectCurrency
            label="De"
            options={currencies}
            value={fromCurrency.code}
            setCurrency={setFromCurrency}
          />
          <SelectCurrency
            label="Vers"
            options={currencies}
            value={toCurrency.code}
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
        {amount} {fromCurrency.symbol_native} <span>=</span>{" "}
        <span className="result">{result}</span>{" "}
        <span className="currency">{toCurrency.symbol_native}</span>
      </p>
      <p className="rate">
        1 {fromCurrency.symbol_native} = {currentRate}{" "}
        {toCurrency.symbol_native}
      </p>
    </>
  );
};
