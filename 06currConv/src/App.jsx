import { useState } from 'react';
import { InputBox } from './components'; // Importing via index.js cleanly [00:43:55]
import useCurrencyInfo from './hooks/useCurrencyInfo'; // Importing our Custom Hook

function App() {
    // Defining State Variables [00:44:42]
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    // Initializing our Custom Hook to automatically handle API states based on the 'from' value
    const currencyInfo = useCurrencyInfo(from);

    // JavaScript method to grab only the country codes keys (e.g., 'usd', 'inr') from the massive API response object [00:47:32]
    const options = Object.keys(currencyInfo);

    // The Swap Feature: Swaps variables using standard destructuring assignment [00:48:26]
    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    // The Main Conversion Logic Calculation
    const convert = () => {
        // Multiplies the user's initial input amount by the rate pulled from our custom hook data [00:50:01]
        setConvertedAmount(amount * currencyInfo[to]);
    };

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg')`, // Dynamic background image [00:52:34]
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    {/* Form Element */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); // Standard practice to stop the webpage from performing a hard refresh [00:52:50]
                            convert(); // Call the conversion method
                        }}
                    >
                        {/* FROM Component Instance */}
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>

                        {/* Middle Absolute Swap Button Layout */}
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>

                        {/* TO Component Instance */}
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisable // Shorthand property for passing "true" [00:56:34]
                            />
                        </div>

                        {/* Submit Actions */}
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;