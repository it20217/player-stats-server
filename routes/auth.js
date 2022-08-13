const express = require("express");
const User = require("../models/user");
const { body, validationResult } = require('express-validator');
const router = express.Router();
const authController = require("../controllers/auth");

/** Sign up */

router.post("/signup", [
    body("email")
      .isEmail() 
      .withMessage("Please provide the correct email")
      .custom((value) => {
        return User.findOne({ where: { email: value } }).then(user => {
            console.log(user);
          if (user) {
            return Promise.reject("The email is already exist");
          }
        });
      }),
    body("password").trim().isLength({min: 8}).withMessage("Please enter the correct password. Min length is 8 characters."),
    body("firstName").trim().not().isEmpty().withMessage("Enter first name"),
    body("lastName").trim().not().isEmpty().withMessage("Enter last name."),
    body("address").trim().not().isEmpty().withMessage("Enter address."),
    body("city").trim().not().isEmpty().withMessage("Enter city"),
    body("zipCode").trim().not().isEmpty().withMessage("Enter post code"),
    body("phone").trim().not().isEmpty().withMessage("Enter phone number."),
    body("dataProtectionAccepted").trim().equals("true").withMessage("Please accept data protection policy")
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      res.status(422).json({
        result: null,
        error: errors.array()
      });
    } else {
      authController.signup(req, res);
    }
});

/** Signin */

// router.post("/login", authController.login, function(req, res) {

// });

router.post("/login", 
  body("email").isEmail() .withMessage("Invalid Email"), 
  body("password").trim().isLength({min: 8}).withMessage("Invalid password"),
 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    res.status(422).json({
      result: null,
      error: errors.array()
    });
  } else {
    authController.login(req, res);
  }
});

module.exports = router;