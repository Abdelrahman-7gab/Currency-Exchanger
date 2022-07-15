import "./AddToFavorites.css";
import { useEffect, useState } from "react";
import { useFavorites } from "../../contextProviders/favoritesContext";
import { useLogin } from "../../contextProviders/userContext";
import { useModal } from "../../contextProviders/modalContext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import apiService from "../../services/APIservice";

function AddToFavorites({ fromCurrency, toCurrency }) {
  const { addUserFavorite, removeUserFavorite, favoriteExists, favorites } =
    useFavorites();
  const { loggedIn } = useLogin();
  const { setOpenLoginModal } = useModal();
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const checkFavoriteExists = () => {
    if (favoriteExists({ fromCurrency, toCurrency }) != null) {
      setAddedToFavorites(true);
    } else {
      setAddedToFavorites(false);
    }
  };

  //check if favorites changes if current exchange still exists in favorites
  useEffect(() => {
    checkFavoriteExists();
  }, [favorites]);

  //check if input fields are changed if favorite exists
  useEffect(() => {
    if (fromCurrency !== "" && toCurrency !== "") {
      checkFavoriteExists();
    }
  }, [fromCurrency, toCurrency]);

  //add currency exchange to user favorites list and update the database.
  //if user is not logged in, open the login modal
  const addToFavorites = async () => {
    if (loggedIn) {
      try {
        const response = await apiService.addToFavorites(
          fromCurrency,
          toCurrency
        );
        addUserFavorite(response.data);
      } catch (err) {
        console.log(err);
        alert("Something went wrong", err.response.data.message);
      }
    } else {
      setOpenLoginModal(true);
    }
  };

  //remove currency exchange from user favorites list and update the database.
  const removeFromFavorites = async () => {
    try {
      const favoriteID = favoriteExists({ fromCurrency, toCurrency });
      if (favoriteID != null) {
        await apiService.removeFavorite(favoriteID);
        removeUserFavorite(favoriteID);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong", err.response.data.message);
    }
  };

  return (
    <div>
      {addedToFavorites && loggedIn ? (
        <FavoriteIcon
          sx={{ color: "#f00", cursor: "pointer", fontSize: "2rem" }}
          onClick={removeFromFavorites}
          className="scale"
        />
      ) : (
        <FavoriteBorderIcon
          sx={{ color: "#f00", cursor: "pointer", fontSize: "2rem" }}
          onClick={addToFavorites}
          className="scale"
        />
      )}
    </div>
  );
}

export default AddToFavorites;
