const express = require("express");
const { getFavorites,deleteFavorite,createFavorite } = require("../controllers/favoritesController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/",protect,getFavorites)
router.post("/",protect,createFavorite)
router.delete("/:id",protect,deleteFavorite)

module.exports = router;