const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venue");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const isAuth = require("../middleware/auth");



/** Get all events */
router.get("/venues", venueController.getVenues);

/** Delete event */
router.delete("/delete/:venueId", venueController.deleteVenues)

module.exports = router;