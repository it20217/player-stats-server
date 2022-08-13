const express = require("express");
const router = express.Router();
const playerController = require("../controllers/player");

/** Get all players */
router.get("/players", playerController.getPlayers);

/** Get player */
router.get("/player/:id", playerController.getPlayer);

/** Delete player */
router.delete("/delete/player/:id", playerController.deletePlayers)

module.exports = router;