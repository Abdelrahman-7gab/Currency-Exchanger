import axios from "axios";

const apiService = {
  getConversionRate: async (fromCurrency, toCurrency) =>{
  const converstionRate = await axios.get(
    `http://localhost:3000/conversionRate/${fromCurrency}/${toCurrency}`,
  );

  return converstionRate;
}
}

export default apiService;
