const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require("bcryptjs");
const sequilize = require("./utils/database");
const app = express();

const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth')
const userRoutes = require("./routes/user");

const bodyParser = require("body-parser");

//const adminRoutes = require("./routes/admin");
//const rootRoutes = require("./routes/home");
//const testRoutes = require("./routes/test");

const Role = require("./models/role");
const User = require("./models/user");
const Country = require("./models/country");
const City = require("./models/city");
const Player = require("./models/player");
const Venue = require("./models/venue");
const EventType = require("./models/event_type");
const Event = require("./models/event");
const Address = require("./models/address");
const PP = require("./models/player_perfomance");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(userRoutes);  
app.use(authRoutes);
//app.use(rootRoutes);
//app.use(adminRoutes);
//app.use(testRoutes)

Country.hasMany(City, {constrains: true, onDelete: "CASCADE"});
City.belongsTo(Country, {foreignKey: "country_id"});
City.hasMany(Venue);
Role.hasMany(User);
User.belongsTo(Role, {foreignKey: "role_id"});
User.hasMany(Player);
User.hasOne(Address);
User.hasMany(PP);
Player.belongsTo(User, {constrains: true, onDelete: "CASCADE"});
Player.hasMany(Event);
Player.hasMany(PP);
Event.belongsTo(User, {foreignKey: "user_id"});
Event.belongsTo(Venue, {foreignKey: "venue_id"});
Event.hasMany(PP);
Venue.belongsTo(City, {foreignKey: "city_id"});
Venue.hasMany(Event);
Address.belongsTo(User, {foreignKey: "user_id", constrains: true, onDelete: "CASCADE"});
PP.belongsTo(Player, {foreignKey: "player_id", constrains: true, onDelete: "CASCADE"});
PP.belongsTo(User, {foreignKey: "user_id"});
PP.belongsTo(Event, {foreignKey: "event_id"});

sequilize.sync()
.then(() => {
  return Country.count();
})
.then(countries => {
  if (countries === 0) {
    return Country.bulkCreate([
      { name: "Ireland", code: "IE" }, { name: "France", code: "FR" }, { name: "Germany", code: "DE" }, { name: "Spain", code: "ES" },
      { name: "Italy", code: "IT" }, { name: "Portugal", code: "PRT" }
    ])
  }
  return countries;
})
.then(() => {
  return City.count();
})
.then(cities => {
  if (cities === 0) {
    return City.bulkCreate([
      { name: "Dublin", country_id: 1 }, { name: "Shannon", country_id: 1 }, { name: "Limerick", country_id: 1 }, 
      { name: "Paris", country_id: 2 }, { name: "Leipzig", country_id: 3 }, { name: "Berlin", country_id: 3 }, 
      { name: "Madrid", country_id: 4 }, { name: "Rome", country_id: 5 }, { name: "Aveiro", country_id: 6 }
    ])
  }
  return cities;
})
.then(() => {
  return Role.count();
})
.then(roles => {
  if (roles === 0) {
    return Role.bulkCreate([{ name: "admin"}, { name: "trainer" }, { name: "user" }])
  }
  return roles;
})
.then(() => {
  return EventType.count();
})
.then(eventTypes => {
  if (eventTypes === 0) {
    return EventType.bulkCreate([{ name: "Training" }, { name: "Camp" }, { name: "Game" }])
  }
  return eventTypes;
})
.then(() => {
  return Venue.count();
})
.then(venues => {
  if (venues === 0) {
    return Venue.bulkCreate([{ name: "Aviva Stadium", address: "Dublin 4", city_id: 1 },
    { name: "Tallaght Stadium", address: "Whitestown Way, Tallaght, Dublin 24", city_id: 1 }, 
    { name: "Markets Field", address: "22 34 Garryowen Rd, Limerick, V94 TP9W", city_id: 3 },
    { name: "Le Parc des Princes", address: "24 Rue du Commandant Guilbaud, 75016 Paris", city_id: 4 },
    { name: "Red Bull Arena", address: "Am Sportforum 3, 04105 Leipzig", city_id: 5 },
    { name: "Olympiastadion Berlin", address: "Olympischer Platz 3, 14053 Berlin", city_id: 6 },
    { name: "Santiago Bernabéu Stadium", address: "Av. de Concha Espina, 1, 28036 Madrid", city_id: 7 },
    { name: "Stadio Olimpico", address: "Viale dei Gladiatori, 00135 Roma RM", city_id: 8 },
    { name: "Estádio Municipal de Aveiro", address: "Lugar Taboeira, Aveiro", city_id: 9 }])
  }
  return venues;
})
.then(() => {
  return User.count();
})
.then(users => {
  if (users === 0) {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const password = process.env.MASTER_USER;
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
      return User.create({firstName: "Igor", lastName: "Tokarev", email: "igor.tokarev@outlook.com", password: hashedPassword,
      phone: "04235", role_id: 1, dataProtectionAccepted: 1, offersAccepted: 1, active: 1})
    });
  }
  return users;
})
.then(players=> {
  if (players === 0) {
      return Player.create({firstName: "Max", lastName: "Mustermann", birthYear: 2012, homeClub: "Football Academy of Ireland"})
    }
  return players;
})


module.exports = app;
