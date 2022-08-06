const Venue = require("../models/venue");

/** Get list of Venues */
exports.getVenues = (req, res, next) => { 
  Venue.findAll({ 
    attributes: ["id","city_id", "address", "name"]})
    .then(events => {
    res.status(200).json({
      result: events,
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

/** Delete Venue */

exports.deleteVenues = (req, res) => {
  const id = req.params.id;
  console.log("id", req.params.id)
  Venue.destroy({where: {id: id} })
  .then((count)=> {
    if(count >= 1) {
      console.log(`deleted row(s): ${count}`)
    } else {
      res.send({error: `Failed to delete Venue with ${id}`})
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Venue with id=" + id
    });
  });
}