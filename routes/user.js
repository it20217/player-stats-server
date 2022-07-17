const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const isAuth = require("../middleware/auth");

// /* GET users listing. */
// router.get('/user', function(req, res, next) {
//   res.send('respond with a resource');
// });

/** Get all users */
router.get("/users", userController.getUsers);

/** Get user settings */
// router.get("/user/settings/:id", isAuth, userController.getUserSettings);

/** Update user settings */
// router.post("/user/settings/update/:id", isAuth, userController.updateUserSettings);

module.exports = router;
