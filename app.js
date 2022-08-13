const express = require('express');
const bcrypt = require("bcryptjs");
const sequilize = require("./utils/database");
const app = express();

const authRoutes = require('./routes/auth')
const userRoutes = require("./routes/user");
const cityRoutes = require("./routes/city");
const countryRoutes = require("./routes/country");
const playerRoutes = require("./routes/player");
const eventRoutes = require("./routes/event");
const assignmentRoutes = require("./routes/assignment");
const venueRoutes = require("./routes/venue");
const ppRoutes = require("./routes/pp");

const bodyParser = require("body-parser");

const Role = require("./models/role");
const User = require("./models/user");
const Country = require("./models/country");
const City = require("./models/city");
const Player = require("./models/player");
const Venue = require("./models/venue");
const EventType = require("./models/event_type");
const Event = require("./models/event");
const Assignment = require("./models/assignment");
const Address = require("./models/address");
const PP = require("./models/player_performance");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(userRoutes);  
app.use(cityRoutes);  
app.use(countryRoutes);  
app.use(authRoutes);
app.use(playerRoutes);
app.use(eventRoutes);
app.use(assignmentRoutes);
app.use(venueRoutes);
app.use(ppRoutes);

/** Model Association */
Country.hasMany(City, {constrains: true, onDelete: "CASCADE"});
City.belongsTo(Country, {foreignKey: "country_id"});
City.hasMany(Venue);
User.hasOne(Role);
User.hasOne(Address);
User.hasMany(Player);
User.hasMany(Assignment);
User.hasMany(Event);
User.hasMany(PP);
User.belongsTo(Role, {foreignKey: "role_id"});
Player.hasMany(Assignment);
Player.belongsTo(User, {foreignKey: "user_id"});
Address.belongsTo(User, {constrains: true, onDelete: "CASCADE"});
Event.hasMany(Assignment);
Event.belongsTo(User, {foreignKey: "user_id"});
Event.belongsTo(Venue, {foreignKey: "venue_id"});
Assignment.belongsTo(Event, {foreignKey: "event_id"});
Assignment.belongsTo(Player, {foreignKey: "player_id"});
Assignment.belongsTo(User, {foreignKey: "user_id"});
Assignment.hasMany(PP);
Assignment.hasMany(PP);
Venue.belongsTo(City, {foreignKey: "city_id"});
Venue.hasMany(Event);
PP.belongsTo(Assignment, {foreignKey: "assignment_id"});
PP.belongsTo(User, {foreignKey: "user_id"});;

module.exports = app;
