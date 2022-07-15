const Favorites = require("../models/favoritesModel");
const User = require("../models/userModel");

//@desc create a new favorite
//@route POST /favorites
//@access Private
const createFavorite = async (req, res) => {
  try {
    const { fromCurrency, toCurrency } = req.body;
    const user = req.user.id;

    //check if favorite already exists
    const favoriteExists = await Favorites.findOne({
      user: user,
      fromCurrency,
      toCurrency,
    });

    if (favoriteExists) {
      return res.status(400).json({ message: "Favorite already exists" });
    }
    const newFavorite = await Favorites.create({
      user,
      fromCurrency,
      toCurrency,
    });
    //send favorite without user Object
    res.status(201).json(newFavorite);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc get all favorites
//@route GET /favorites
//@access Private
const getFavorites = async (req, res) => {
  const user = req.user;
  const favorites = await Favorites.find({ user });
  res.status(200).json(favorites);
};

//@desc delete a favorite
//@route DELETE /favorites/:id
//@access Private
const deleteFavorite = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  //check if favorite is in user's favorites
  const favorite = await Favorites.findById(req.params.id);
  if (!favorite) {
    return res.status(404).json({ message: "Favorite not found" });
  }
  if (favorite.user.toString() !== user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  //delete favorite
  const deletedFavorite = await Favorites.deleteOne({ _id: req.params.id });

  res.status(200).json(deletedFavorite);
};

module.exports = { createFavorite, getFavorites, deleteFavorite };
