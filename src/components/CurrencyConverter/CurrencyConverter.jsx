import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrencyInput from "../CurrencyInput";
import "./CurrencyConverter.css";

function CurrencyConverter() {
    const [amountFirst, setAmountFirst] = useState(1);
    const [amountSecond, setAmountSecond] = useState(1);
    const [currencyFirst, setCurrencyFirst] = useState("USD");
    const [currencySecond, setCurrencySecond] = useState("UAH");
    const [currencyUSD, setCurrencyUSD] = useState("USD");
    const [currencyUAH, setCurrencyUAH] = useState("UAH");
    const [rates, setRates] = useState([]);

    useEffect(() => {
        axios
            .get(
                `https://v6.exchangerate-api.com/v6/848d85ab91ad4e93a3880a7a/latest/EUR`
            )
            .then((response) => {
                setRates(response.data.conversion_rates);
            });
    }, []);

    useEffect(() => {
        if (!!rates) {
            handleAmountFirstChange(1);
        }
    }, [rates]);

    function formatNumber(number) {
        return number.toFixed(2);
    }

    // _____________FUNCTION FOR CHANGE AMOUNT&CURRENCY__________________
    function handleAmountFirstChange(amountFirst) {
        setAmountSecond(
            formatNumber(
                (amountFirst * rates[currencySecond]) / rates[currencyFirst]
            )
        );
        setAmountFirst(amountFirst);
    }

    function handleCurrencyFirstChange(currencyFirst) {
        setAmountSecond(
            formatNumber(
                (amountFirst * rates[currencySecond]) / rates[currencyFirst]
            )
        );
        setCurrencyFirst(currencyFirst);
    }

    function handleAmountSecondChange(amountSecond) {
        setAmountFirst(
            formatNumber(
                (amountSecond * rates[currencyFirst]) / rates[currencySecond]
            )
        );
        setAmountSecond(amountSecond);
    }

    function handleCurrencySecondChange(currencySecond) {
        setAmountFirst(
            formatNumber(
                (amountSecond * rates[currencyFirst]) / rates[currencySecond]
            )
        );
        setCurrencySecond(currencySecond);
    }
    // __________________________________________________________________

    return (
        <div className="container">
            <div className="upper_structure">
                <h1>Currency Converter</h1>
                <p className="course">
                    1$ ={" "}
                    {formatNumber(
                        (1 * rates[currencyUAH]) / rates[currencyUSD]
                    )}{" "}
                    UAH, 1??? = {formatNumber(1 * rates[currencyUAH])} UAH
                </p>
                <CurrencyInput
                    onAmountChange={handleAmountFirstChange}
                    onCurrencyChange={handleCurrencyFirstChange}
                    currencies={Object.keys(rates)}
                    amount={amountFirst}
                    currency={currencyFirst}
                />
            </div>

            <div className="sub_structure">
                <CurrencyInput
                    onAmountChange={handleAmountSecondChange}
                    onCurrencyChange={handleCurrencySecondChange}
                    currencies={Object.keys(rates)}
                    amount={amountSecond}
                    currency={currencySecond}
                />
            </div>
        </div>
    );
}

export default CurrencyConverter;
