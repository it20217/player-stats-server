const Assignment = require("../models/assignment");


/** Get all events */
exports.getAssignments = (req, res, next) => { 
  Assignment.findAll({ 
    attributes: ["assignment_id", "player_id", "user_id", "event_id"]})
    .then(events => {
    res.status(200).json({
      result: events,
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

/** Post NEW assignment */
async function addAssignment (req, res, next) {
  console.log("req.body", req.body);
  const newAssignment = req.body;
  const createdAssignment = Assignment.create({
    userId: newAssignment.user_id,
    event_id: newAssignment.event_id,
    player_id: newAssignment.player_id
  });
  console.log("!!!AWAITING FOR RESPONSE")
  let event = await createdAssignment;

  if (event) {
    res.status(200).json({
      result: "New Assignment has been added",
      error: null
    });
  } else {
    res.status(403).json({
      result: null,
      error: `Fail to assign player id ${req.body.player_id}`
    });
  }
}

module.exports.addAssignment = addAssignment;

/** Delete Event */

exports.deleteAssignments = (req, res) => {
  const id = req.params.id;
  console.log("assignmentId", req.params.id)
  Assignment.destroy({where: {assignmentId: id} })
  .then((count)=> {
    // if(count >= 1) {
    //   console.log(`deleted row(s): ${count}`)
    // } else {
    //   res.send({error: `Failed to delete Assignment with ${id}`})
    // }
    res.status(200).json({
      result: "Assignment has been removed",
      error: null
    });
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Assignment with id=" + id
    });
  });
}