const express = require("express");
const router = express.Router();
const cityController = require("../controllers/city");

/** Get cities list */
router.get("/cities", cityController.getCities);


module.exports = router;