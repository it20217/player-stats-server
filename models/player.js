const Sequelize = require("sequelize");
const User = require("./user");
const sequelize = require("../utils/database");

const Player = sequelize.define("player", {
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
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthYear: {
    type: Sequelize.STRING,
    allowNull: false
  },
  homeClub: {
    type: Sequelize.STRING,
    defaultValue: ""
  }
}, {
  underscored: true
});

module.exports = Player;