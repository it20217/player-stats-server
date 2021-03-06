const express = require("express");
const router = express.Router();
const playerController = require("../controllers/player");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const isAuth = require("../middleware/auth");



/** Get all players */
router.get("/players", playerController.getPlayers);

module.exports = router;