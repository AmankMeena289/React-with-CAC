import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({}); // Defaulting to an empty object to prevent app crashes [00:18:12]

    useEffect(() => {
        // Fetching live data. The backticks allow us to pass the 'currency' variable dynamically into the URL [00:14:36]
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json`)
            .then((res) => res.json()) // Converting string response to JSON [00:17:12]
            .then((res) => setData(res[currency])); // Accessing the internal object dynamically using bracket notation [00:19:08]
    }, [currency]); // Dependency array: Whenever the 'currency' variable changes, re-run this API call [00:19:54]

    return data; // Returns the final fetched object containing rates
}

export default useCurrencyInfo;