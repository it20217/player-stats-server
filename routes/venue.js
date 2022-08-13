const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venue");

/** Get all events */
router.get("/venues", venueController.getVenues);

/** Delete event */
router.delete("/delete/:venueId", venueController.deleteVenues)

module.exports = router;