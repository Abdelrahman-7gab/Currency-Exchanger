import axios from "axios";

const apiService = {
  refreshToken :async () => {
    if (localStorage.getItem("user")) {
      axios.defaults.headers.common = {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
      };
    }
  },
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
  },
  getFavorites: async () => {
    const favorites = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/favorites`
    );
    return favorites;
  },
  addToFavorites: async (fromCurrency, toCurrency) => {
    const addToFavorites = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/favorites/`,
      { fromCurrency, toCurrency }
    );
    return addToFavorites;
  },
  removeFavorite: async (id) => {
    const removeFavorite = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/favorites/${id}`
    );
    return removeFavorite;
  },
};

apiService.refreshToken();

export default apiService;
