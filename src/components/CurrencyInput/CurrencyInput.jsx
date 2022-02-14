import React from "react";
import PropTypes from "prop-types";

import "./CurrencyInput.css";

function CurrencyInput(props) {
    return (
        <div className="row">
            <form action="">
                <input
                    type="number"
                    value={props.amount}
                    onChange={(e) => props.onAmountChange(e.target.value)}
                />
                <select
                    value={props.currency}
                    onChange={(e) => props.onCurrencyChange(e.target.value)}
                >
                    {props.currencies.map((currency) => (
                        <option value={currency}>{currency}</option>
                    ))}
                </select>
            </form>
        </div>
    );
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
