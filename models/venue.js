const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const City = require("./city");

const Venue = sequelize.define("venue", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  // Set FK relationship (hasOne) with `City`
  cityId: {
    type: Sequelize.INTEGER,
    references: {
      model: City,
      key: "id"
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true
});

module.exports = Venue;