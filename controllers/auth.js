const User = require("../models/user");
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
    const resetToken = confirmToken;
    const resetTokenExp = Date.now() + 7200000;
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
      console.log("user created!", data.players.length)
      User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        city: data.city || "Dublin",
        address: data.address || "",
        zipCode: data.zipCode || "",
        language: data.language || "en",
        role: 0,
        created: currentDate,
        updated: currentDate,
        lastLogin: currentDate,
        dataProtectionAccepted: data.dataProtectionAccepted ? 1 : 0,
        offersAccepted: data.dataProtectionAccepted ? 1 : 0,
        active: 1,
        resetToken: resetToken,
        resetTokenExp: resetTokenExp,
        agbAccepted: data.agbAccepted || 0
      })
      .then(loadedUser => {
        
        if (data?.players?.firstName?.length > 0 && data?.players?.lastName?.length > 0) {

          Player.create({
            firstName: data.players.firstName,
            lastName: data.players.lastName,
            birthYear: data.players.birthYear,
            homeClub: data.players.homeClub,
            userId: loadedUser.id
          }).then(player => {
            console.log("PLAYER WAS CREATED", player);
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
      .catch(error => {
        console.log("Catch register", error)
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
  console.log(email, password, loadedUser.password);
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
      
      const token = jwt.sign({ email: loadedUser.email, id: loadedUser.id, 
        firstName: loadedUser.firstName, lastName: loadedUser.lastName, role: loadedUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({
        result: token,
        error: null
      });  
    }
  }
}

module.exports.login = login;