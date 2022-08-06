const Sequelize = require("sequelize");
let sequelize;

if (process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);
} else {
  sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    dialect: "mysql", 
    host: process.env.MYSQL_HOST,
    dialectOptions: {
      useUTC: true,
    },
    // dateStrings: [
    //   'DATE',
    //   'DATETIME'
    // ],
    timezone: "+00:00" // Writing to database
  });
}

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;