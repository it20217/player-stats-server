const express = require("express");
const router = express.Router();
const countryController = require("../controllers/country");

/** Get country list */
router.get('/countries', countryController.getCountries);

module.exports = router;