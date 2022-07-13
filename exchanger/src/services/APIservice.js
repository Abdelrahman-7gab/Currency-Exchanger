import axios from "axios";

const convert = async (fromCurrency, toCurrency, amount) => {
  const converstionRate = await axios.get(
    `https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
    {
      headers: {
        apiKey: import.meta.env.FLIXER_API_TOKEN,
      },
    }
  );

  return converstionRate;
};

export default { convert };
