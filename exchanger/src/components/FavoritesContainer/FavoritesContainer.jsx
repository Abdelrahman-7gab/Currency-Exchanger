import "./FavoritesContainer.css";
import { useFavorites } from "../../contextProviders/favoritesContext";
import apiService from "../../services/APIservice";
import { Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function FavoritesContainer({ setFromCurrency, setToCurrency }) {
  const { favorites, removeUserFavorite } = useFavorites();


  const favoriteClick = (favorite) => {
    setFromCurrency(favorite.fromCurrency);
    setToCurrency(favorite.toCurrency);
  };

  const deleteFavorite = async (favorite) => {
    try {
      await apiService.removeFavorite(favorite._id);
      removeUserFavorite(favorite._id);
    } catch (err) {
      console.log(err);
      alert("Something went wrong", err.response.data.message);
    }
  };

  return (
    <div className="favorites-container">
      <div className="subheader">
        <Typography variant="h6">Your Favorites</Typography>{" "}
        <span className="favoritesNum">
          <FavoriteIcon sx={{ color: "#f00" }} />
          {favorites.length}
        </span>
      </div>
      {favorites.map((favorite) => {
        return (
          <div className="item-container" key={favorite._id}>
            <div
              className="favorite-item"
              onClick={(e) => {
                favoriteClick(favorite);
              }}
            >
              <div className="favorite-item-currency">
                {favorite.fromCurrency}
              </div>
              <ArrowDownwardIcon />
              <div className="favorite-item-currency">
                {favorite.toCurrency}
              </div>
            </div>
            <DeleteForeverIcon
              sx={{ fontSize: "2rem" }}
              className="scale"
              onClick={(e) => {
                deleteFavorite(favorite);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default FavoritesContainer;
