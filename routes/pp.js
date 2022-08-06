const express = require("express");
const router = express.Router();
const ppController = require("../controllers/pp");

/** Add pp */
router.post("/POST/pp", ppController.addPP)

module.exports = router;