const express = require("express");
const { calc, currency } = require("../controllers/calc.controllers");

const router = express.Router();

router.route("/").get(calc);

// get currency
router.route("/currency").post(currency);

module.exports = router;
