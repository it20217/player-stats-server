const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Role = require("./player");
const User = require("./user");
const Player = require("./player");

const PP = sequelize.define("player_performance", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  // Set FK relationship (hasOne) with `Player`
  playerId: {
    type: Sequelize.INTEGER,
    references: {
      model: Player,
      key: "id"
    }
  },
  // Set FK relationship (hasOne) with `User`
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
  dribbling: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  passing: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  shooting: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  tackling: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  aggression: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  concentartion: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  leadership: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  teamwork: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  decisions: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  endurance: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  acceleration: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  jumping: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  sprint30m: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  }
}, {
  underscored: true
});

module.exports = PP;