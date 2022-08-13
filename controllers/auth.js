const User = require("../models/user");
const Address = require("../models/address");
const Player = require("../models/player");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/** Save a new user */
exports.signup = (req, res, next) => {
  const data = req.body;
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const password = data.password;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.status(500).json({
        result: null,
        error: "Failure occured during registration"
      });
    }
    const confirmToken = buffer.toString("hex");
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
      User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        language: data.language || "en",
        role_id: 3,
        dataProtectionAccepted: data.dataProtectionAccepted ? 1 : 0,
        active: 1,
        agbAccepted: data.agbAccepted || 0
      })
      .then(loadedUser => {
        Address.create({
          user_id: loadedUser.id,
          city_id: data.city,
          address: data.address,
          zip_code: data.zipCode,
        })
        .then(userAddress => {
          if (data?.players?.firstName?.length > 0 && data?.players?.lastName?.length > 0) {
            
            console.log("CREATING PLAYER!")
  
            Player.create({
              firstName: data.players.firstName,
              lastName: data.players.lastName,
              birthYear: data.players.birthYear,
              homeClub: data.players.homeClub,
              userId: userAddress.user_id
            }).then(player => {
              console.log("PLAYER WAS CREATED");
              res.status(200).json({
                result: "Thank you for registartion.",
                error: null
              });
            }).catch(err => {
              console.log("ERROR CREATING PLAYER", err);
              res.status(202).json({
                result: `Thank you for registartion. Attention! Failure occured to save a player.`,
                error: null
              });
            });
  
          } else {
            console.log("No players", loadedUser.email)
            res.status(200).json({
              result: "Thank you for registartion.",
              error: null
            });
          }
        })
      })
      .catch(err => {
        console.log("CATCH REGISTER", err)
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        res.status(err.statusCode).json({
          result: null,
          error: "Failure occured during registartion"
        });
      })
    })
  });
}

/** Login */
async function login (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const user =  User.findOne({ where: { email: email } });
  const loadedUser = await user;
  if (!loadedUser) {
    res.status(401).json({
      result: null,
      error: "The user was not found."
    });
  } else if (loadedUser.active === 0 || loadedUser.active === false) {
    res.status(401).json({
      result: null,
      error: "The user is not activated. Please contact administartor."
    });
  } else {
    const isEqualPassword = await bcrypt.compare(password, loadedUser.password);
    if (!isEqualPassword) {
      res.status(403).json({
        result: null,
        error: [{msg: "The wrong username or password", param: "password"}]
      }); 
    } else {
      loadedUser.lastLogin = new Date();
      loadedUser.save();
      console.log("!!!!!!!user", loadedUser)
      const token = jwt.sign({ email: loadedUser.email, id: loadedUser.id, 
        firstName: loadedUser.firstName, lastName: loadedUser.lastName, role: loadedUser.role_id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({
        result: token,
        error: null
      });  
    }
  }
}

module.exports.login = login;