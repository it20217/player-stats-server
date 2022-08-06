const User = require("../models/user");


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
  console.log("id", req.params.userId)
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