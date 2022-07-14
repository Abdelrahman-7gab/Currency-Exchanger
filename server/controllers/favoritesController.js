const Favorites = require("../models/favoritesModel");

const createFavorite = async (req, res) => {
  const { fromCurrency, toCurrency } = req.body;
  const user = req.user;
  const newFavorite = await Favorites.create({
    user,
    fromCurrency,
    toCurrency,
  });
  res.status(201).json(newFavorite);
};

const getFavorites = async (req, res) => {
  const user = req.user;
  const favorites = await Favorites.find({ user });
  res.status(200).json(favorites);
};

const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  const deletedFavorite = await Favorites.findByIdAndDelete(id);
  res.status(200).json(deletedFavorite);
};

module.exports = { createFavorite, getFavorites, deleteFavorite };