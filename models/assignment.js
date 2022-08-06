const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Player = require("./player")
const User = require("./user")
const Event = require("./event")

const Assignment = sequelize.define("assignment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  // Set FK relationship (hasMany) with `User`
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  // Set FK relationship (hasOne) with `Event`
  eventId: {
    type: Sequelize.INTEGER,
    references: {
      model: Event,
      key: "id"
    }
  },
  // Set FK relationship (hasOne) with `Player`
  playerId: {
    type: Sequelize.INTEGER,
    references: {
      model: Player,
      key: "id"
    }
  }
}, {
  underscored: true
});

module.exports = Assignment;