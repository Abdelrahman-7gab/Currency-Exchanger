const express = require("express");
const router = express.Router();
const {getConversionRate} = require("../controllers/currencyController");

router.get("/:fromCurrency/:toCurrency",getConversionRate );

module.exports = router;