const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const City = require("./city");
const User = require("./user");

const Address = sequelize.define("address", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  // Set FK relationship (hasOne) with `User`
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  // Set FK relationship (hasOne) with `City`
  cityId: {
    type: Sequelize.INTEGER,
    references: {
      model: City,
      key: "id"
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true
});

module.exports = Address;