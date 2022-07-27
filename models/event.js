const Sequelize = require("sequelize");
const database = require("../utils/database");
const User = require("./user");
const Venue = require("./venue");
const EventType = require("./event_type")

const Event = database.define("event", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  // Set FK relationship (hasOne) with `User`
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  }, 
  // Set FK relationship (hasOne) with `Venue`
  venue_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Venue,
      key: "id"
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },  
  // Set FK relationship (hasOne) with `EventType`
  event_type_id: {
    type: Sequelize.INTEGER,
    references: {
      model: EventType,
      key: "id"
    }
  },
  count: {  
    type: Sequelize.INTEGER,
    allowNull: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  underscored: true
});

module.exports = Event;