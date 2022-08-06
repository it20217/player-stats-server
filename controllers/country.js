const Country = require("../models/country");

/** Get all countries */

exports.getCountries = (req, res, next) => {

  Country.findAll({
    attributes: ["id", "code", "name"]}).then((countries)=> {
      res.status(200).json({
        result: countries,
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