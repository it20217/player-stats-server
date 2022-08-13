const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const eventController = require("../controllers/event");

/** Get all info */
router.get("/events/dataset", eventController.getEventsDataset);

/** Get all events */
router.get("/events", eventController.getEvents);

/** Post new event */
router.post("/POST/event", isAuth, eventController.addEvent);

/** Delete event */
router.delete("/delete/:eventId", eventController.deleteEvents)

module.exports = router;