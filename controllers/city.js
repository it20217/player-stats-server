const City = require("../models/city");

/** Get all users */
exports.getCities = (req, res, next) => { 
  City.findAll({ 
    attributes: ["id", "countryId", "name"]}).then(cities => {
    res.status(200).json({
      result: cities,
      error: null
    });
  })
  .catch(error => {
    res.status(500).json({
      result: null,
      error: error
    });
  })
}