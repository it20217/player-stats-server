const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const EventType = sequelize.define("event_type", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true
});

module.exports = EventType;