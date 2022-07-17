const Player = require("../models/player");

/** Get all players */
exports.getPlayers = (req, res, next) => { 
  Player.findAll({ 
    attributes: ["id", "firstName", "lastName",
    "birthYear", "homeClub", "created_at"]}).then(players => {
    res.status(200).json({
      result: players,
      error: null
    });
  })
  .catch(error => {
    res.status(500).json({
      result: null,
      error: error
    });
  })
}