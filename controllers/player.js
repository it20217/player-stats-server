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

/** Get player */
exports.getPlayer = (req, res, next) => { 
  Player.findOne({ 
    where: {id: req.params.id}}).then(player => {
    res.status(200).json({
      result: player,
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

/** Delete Player */

exports.deletePlayers = (req, res) => {
  const id = req.params.id;
  console.log("id", req.params.id)
  Player.destroy({where: {id: id} })
  .then((count)=> {
    if(count >= 1) {
      console.log(`deleted row(s): ${count}`)
    } else {
      res.send({error: `Failed to delete player with ${id}`})
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Player with id=" + id
    });
  });
}