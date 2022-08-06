const PP = require("../models/player_performance");


/** Post NEW pp */

async function addPP (req, res, next) {
  const newPP = req.body;
  const createdPP = PP.create({
    assignment_id: newPP.assignment_id,
    dribbling: newPP.dribbling,
    passing: newPP.passing,
    shooting: newPP.shooting,
    tackling: newPP.tackling,
    aggression: newPP.aggression,
    concentration: newPP.concentration,
    leadership: newPP.leadership,
    teamwork: newPP.leadership,
    decisions: newPP.decisions,
    endurance: newPP.endurance,
    acceleration: newPP.acceleration,
    jumping: newPP.jumping,
    sprint30m: newPP.sprint30m,
    passing: newPP.passing,
    user_id: newPP.user_id,
    assignment_id: newPP.assignment_id
  });
  
  let pp = await createdPP;

  if (pp) {
    res.status(200).json({
      result: "New player performance has been created",
      error: null
    });
  } else {
    res.status(403).json({
      result: null,
      error: "Fail to add a new player performance"
    });
  }
}
module.exports.addPP = addPP;