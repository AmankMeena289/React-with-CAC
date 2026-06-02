import React, { useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    // Generates a random, completely unique ID for linking the label and input box for web accessibility [00:41:08]
    const amountInputId = useId(); 

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            {/* Left Side: Amount Input */}
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId} // Binding the generated unique ID here [00:41:53]
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    // HTML targets values as strings. We wrap it in 'Number()' to force it back to a standard numeric type [00:31:40]
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))} 
                />
            </div>

            {/* Right Side: Currency Dropdown Selector */}
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg p-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    disabled={currencyDisable}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                >
                    {/* Looping through options array to create individual list items */}
                    {currencyOptions.map((currency) => (
                        // Always remember to include a unique 'key' when mapping over lists in React to maintain performance [00:36:10]
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;