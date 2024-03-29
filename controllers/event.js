const Event = require("../models/event");
const Assignment = require("../models/assignment");
const Player = require("../models/player");
const User = require("../models/user");
const Venue = require("../models/venue");

/** Get all info */
async function getEventsDataset (req, res) {
 
  const users = await User.findAll();
  const trainers = users.filter(user => user.role_id === 2);
  const players = await Player.findAll();
  const venues = await Venue.findAll();
  if (users && trainers && players && venues) {
    res.status(200).json({
      result: {
        users: users,
        trainers: trainers,
        players: players,
        venues: venues
      },
      error: null
    });
  } else {
    res.status(403).json({
      result: null,
      error: "Fail to add a new event"
    });
  }
}

module.exports.getEventsDataset = getEventsDataset;

/** Get all events */
exports.getEvents = (req, res) => { 
  Event.findAll({ 
    attributes: ["id", "name", "description", "date", "user_id", "venue_id", "event_type_id", "count", "description"],
      include: [
        {model: Assignment, attributes: ["id", "player_id", "event_id", "user_id"], include: [Player]}
      ]
    }).then(events => {
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

/** Post NEW event */
async function addEvent (req, res, next) {

  let request = req.body;

  const loadUser =  User.findOne({ where: { id: request?.user_id || 0 } });
  const user = await loadUser;
  if (!user || user.active === 0 || user.role === 3) {
    res.status(401).json({
      result: null,
      error: "Not authenticated"
    });
  } else {
    const createdEvent = Event.create({
      name: req.body.name,
      userId: req.body.user_id,
      venue_id: req.body.venue_id,
      date: req.body.date,
      event_type_id: req.body.event_type_id,
      count: 0,
      description: " "
    });

    let event = await createdEvent;
  
    if (event) {
      res.status(200).json({
        result: "New Event has been created",
        error: null
      });
    } else {
      res.status(403).json({
        result: null,
        error: "Fail to add a new event"
      });
    }
  }
}
module.exports.addEvent = addEvent;

/** Delete Event */

exports.deleteEvents = (req, res) => {
  const id = req.params.id;
  Event.destroy({where: {id: id} })
  .then((count)=> {
    if(count >= 1) {
      console.log(`deleted row(s): ${count}`)
    } else {
      res.send({error: `Failed to delete Event with ${id}`})
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Event with id=" + id
    });
  });
}