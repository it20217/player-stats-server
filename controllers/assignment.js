const Assignment = require("../models/assignment");
const Event = require("../models/event");
const Player = require("../models/player");


/** Get all events */
exports.getAssignments = (req, res, next) => { 
  Assignment.findAll({ 
    attributes: ["id", "player_id", "user_id", "event_id"]})
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
async function addAssignment (req, res) {
  const newAssignment = req.body;
  const createdAssignment = Assignment.create({
    userId: newAssignment.user_id,
    event_id: newAssignment.event_id,
    player_id: newAssignment.player_id
  });
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


/** Get assignments dataset */
async function getAssignmentDataset (req, res) {

  let events = await Event.findAll({ 
    attributes: ["id", "name", "description", "date", "event_type_id", "count", "description"],
      include: [
        {model: Assignment, attributes: ["id", "player_id", "event_id"], include: [Player]}
      ]
  });
  
  let players = await Player.findAll();

  /** Parse db object into JSON */
  let parsedEvents = JSON.parse(JSON.stringify(events, null, 2));

  parsedEvents.map(event => {
    if (event.assignments?.length > 0) {
      return event.assignments.map(assignment => {
        let playerName = players?.filter(player => player.id === assignment.player_id)[0];
        /** Parse db object into JSON */
        let newPlayer = JSON.parse(JSON.stringify(playerName, null, 2));
        assignment.firstName = newPlayer.firstName;
        assignment.lastName = newPlayer.lastName;
        assignment.homeClub = newPlayer.homeClub;
        return assignment;
      })
    }
  });

  if (parsedEvents && players) {
    res.status(200).json({
      result: {
        events: parsedEvents,
        players: players
      },
      error: null
    });
  } else {
    res.status(500).json({
      result: null,
      error: error
    });
  }

}

module.exports.getAssignmentDataset = getAssignmentDataset;