import axios from "axios";

const apiService = {
  getConversionRate: async (fromCurrency, toCurrency) => {
    const converstionRate = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/conversionRate/${fromCurrency}/${toCurrency}`
    );

    return converstionRate;
  },
  RegisterUser: async (email, name, password) => {
    const registerUser = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/register`,
      { email, name, password }
    );
    return registerUser;
  },

  LoginUser: async (email, password) => {
    const loginUser = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/login`,
      { email, password }
    );
    return loginUser;
  }
};

export default apiService;
