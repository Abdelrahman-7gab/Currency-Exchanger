import { createContext, useContext, useState } from "react";

const favoritesContext = createContext();

export function useFavorites() {
  return useContext(favoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addUserFavorite = (favorite) => {
    setFavorites([...favorites, favorite]);
  };
  const removeUserFavorite = (id) => {
    setFavorites(favorites.filter((f) => f._id !== id));
  };

  //check if favorite already exists and if it does return it's id, if it doesn't return false
  const favoriteExists = (favorite) => {
    const findFavorite = favorites.find(
      (f) =>
        f.fromCurrency === favorite.fromCurrency &&
        f.toCurrency === favorite.toCurrency
    );

    if (findFavorite) {
      return findFavorite._id;
    }
    return null;
  };

  return (
    <favoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        addUserFavorite,
        removeUserFavorite,
        favoriteExists,
      }}
    >
      {children}
    </favoritesContext.Provider>
  );
}
