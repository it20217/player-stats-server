const User = require("../models/user");
const Player = require("../models/player");
const PP = require("../models/player_performance");
const Assignment = require("../models/assignment");

/** Get all users */
exports.getUsers = (req, res, next) => { 
  User.findAll({ 
    attributes: ["firstName", "lastName", "id", 
    "email", "language", "phone", "role_id", "active",
    "dataProtectionAccepted", "created_at"]}).then(users => {
    res.status(200).json({
      result: users,
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

/** Get all Trainers */
exports.getTrainers = (req, res, next) => { 
  User.findAll({ 
    where: {role_id: 2}
  }).then(trainers => {
      res.status(200).json({
      result: trainers,
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

/** Delete User */

exports.deleteUsers = (req, res) => {
  const id = req.params.userId;
  User.destroy({where: {id: id} })
  .then((count)=> {
    if(count >= 1) {
      console.log(`deleted row(s): ${count}`)
    } else {
      res.send({error: `Failed to delete user with ${id}`})
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
}

/** Get user */
async function getUserProfile (req, res, next) {
  
  let userId = req.userId;

  const loadUser =  User.findOne({ where: { id: userId || 0 },
    include: [{model: Player, include: [{model: Assignment, attributes: ["id", "playerId", "userId", "eventId"], include: [{model: PP}]}]}]
  });
  const user = await loadUser;
  if (!user || user.active === 0 || user.role === 3) {
    res.status(401).json({
      result: null,
      error: "Not authenticated"
    });
  } else {
    res.status(200).json({
      result: user,
      error: null
    });
  }
}

module.exports.getUserProfile = getUserProfile;