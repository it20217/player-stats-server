const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAuth = require("../middleware/auth");

/** Get user profile */
router.get("/user", isAuth, userController.getUserProfile);

/** Get all users */
router.get("/users", userController.getUsers);

/** Get trainer list */
router.get("/trainers", userController.getTrainers);

/** Delete user */
router.delete("/delete/:userId", userController.deleteUsers)

module.exports = router;
