const Player = require("../models/player");
const Assignment = require("../models/assignment");
const PP = require("../models/player_performance");

/** Get all players */
exports.getPlayers = (req, res) => { 
  Player.findAll({ 
    attributes: ["id", "firstName", "lastName",
    "birthYear", "homeClub", "created_at"],
    include: [{model: Assignment, attributes: ["id", "playerId", "userId", "eventId"]}]
  }).then(players => {
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
    where: {id: req.params.id},
    include: [{model: Assignment, attributes: ["id", "playerId", "userId", "eventId"], include: [{model: PP}]}]
  },
    ).then(player => {
    /** Parse db object into JSON */
    let parsedPlayer = JSON.parse(JSON.stringify(player, null, 2));  
    
    const performance = {
      dribbling: 0,
      passing: 0,
      shooting: 0,
      tackling: 0,
      aggression: 0,
      concentration: 0,
      leadership: 0,
      teamwork: 0,
      decisions: 0,
      endurance: 0,
      acceleration: 0,
      jumping: 0,
      sprint30m: 0
    };
    let ppNumber = 0;
    parsedPlayer?.assignments?.forEach(assignment => {
      assignment.player_performances?.forEach(pp => {
        ppNumber ++;
        performance.dribbling += pp.dribbling;
        performance.passing  += pp.passing;
        performance.shooting += pp.shooting;
        performance.tackling  += pp.tackling;
        performance.aggression += pp.aggression;
        performance.concentration += pp.concentration;
        performance.leadership += pp.leadership;
        performance.teamwork += pp.teamwork;
        performance.decisions += pp.decisions;
        performance.endurance += pp.endurance;
        performance.acceleration += pp.acceleration;
        performance.jumping += pp.jumping;
        performance.sprint30m += pp.sprint30m;
      });
    });
    // Average

    performance.dribbling = performance.dribbling / ppNumber;
    performance.passing  = performance.passing  / ppNumber;
    performance.shooting = performance.shooting  / ppNumber;
    performance.tackling  = performance.tackling  / ppNumber;
    performance.aggression = performance.aggression  / ppNumber;
    performance.concentration = performance.concentration  / ppNumber;
    performance.leadership = performance.leadership  / ppNumber;
    performance.teamwork = performance.teamwork  / ppNumber;
    performance.decisions = performance.decisions  / ppNumber;
    performance.endurance = performance.endurance  / ppNumber;
    performance.acceleration = performance.acceleration  / ppNumber;
    performance.jumping = performance.jumping  / ppNumber;
    performance.sprint30m = performance.sprint30m  / ppNumber;

    let data =  [];
    for (const [key, value] of Object.entries(performance)) {
      data.push({name:  key, value: value})
    }

    res.status(200).json({
      result: {
        response: player,
        data: data,
        performance: performance
      },
      error: null
    });
  })
  .catch(error => {
    console.log(error)
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