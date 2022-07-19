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