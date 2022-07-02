const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Role = require("./player");

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
      model: User,
      key: "id"
    }
  },
  dribbling: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  passing: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  shooting: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  tackling: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  aggression: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  concentartion: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  leadership: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  teamwork: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  decisions: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  endurance: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  acceleration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  jumping: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  },
  sprint30m: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "en",
  }
}, {
  underscored: true
});

module.exports = PP;