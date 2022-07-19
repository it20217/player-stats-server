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
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id"
    }
  },
  // Set FK relationship (hasOne) with `City`
  city_id: {
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
  zip_code: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true
});

module.exports = Address;