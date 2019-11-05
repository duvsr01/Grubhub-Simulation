//Load Restaurants  Model
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  console.log("Inside Get Restaurants Request");

  Restaurant.find({}, function(err, restaurants) {
    if (!restaurants) {
      console.log("No restaurants found");
      let data = {
        success: false,
        result: "No restaurants found"
      };
      callback(null, data);
      // return response.status(400).json(data);
    } else if (restaurants) {
      console.log("the restaurants list is " + restaurants);
      let data = {
        success: true,
        result: restaurants
      };
      callback(null, data);
      // return response.status(200).json(data);
    } else {
      err => callback(null, err);
    }
  });
}

exports.handle_request = handle_request;
