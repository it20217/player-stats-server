const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const Country = require("./country");

const City = sequelize.define("city", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  // Set FK relationship (hasOne) with `Country`
  countryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Country,
      key: "id",
      allowNull: false
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true
});

module.exports = City;