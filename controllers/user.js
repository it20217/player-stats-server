const User = require("../models/user");

/** Get all users */
exports.getUsers = (req, res, next) => { 
  User.findAll({ 
    attributes: ["firstName", "lastName", "id", "city", 
    "email", "language", "phone", "role", "updated", "active",
    "dataProtectionAccepted", "address", "city", "zipCode"]}).then(users => {
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