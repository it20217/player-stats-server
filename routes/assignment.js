const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignment");
const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const isAuth = require("../middleware/auth");



/** Get all events */
router.get("/assignments", assignmentController.getAssignments);

/** Get assignments dataset */
router.get("/assignments/dataset", assignmentController.getAssignmentDataset);

/** Post new event */
router.post("/POST/assignment", assignmentController.addAssignment);

/** Delete event */
router.delete("/DELETE/assignments/:id", assignmentController.deleteAssignments)


module.exports = router;