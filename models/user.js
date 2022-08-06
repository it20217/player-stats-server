const {Sequelize} = require("sequelize");
const sequelize = require("../utils/database");
const Role = require("./role");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "en",
  },
  // Set FK relationship (hasOne) with `Roles`
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Role,
      key: "id"
    },
    defaultValue: 3
  },
  dataProtectionAccepted: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  agbAccepted: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  underscored: true
});

module.exports = User;