//Load Restaurants  Model
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  console.log("Inside Search Item Request");

  var searchItem = "";
  msg.Search;
  if (msg.Search) {
    searchItem = msg.Search;
  }

  var cuisine = "";
  if (msg.Cuisine) {
    cuisine = msg.Cuisine;
  }
  console.log("searchItem is " + searchItem);
  console.log("cuisine is" + cuisine);

  Restaurant.find(
    {
      $or: [
        { "res_menu.items.name": { $regex: searchItem, $options: "i" } },
        { res_cuisine: { $regex: cuisine, $options: "i" } }
      ]
    },

    function(err, restaurants) {
      if (restaurants) {
        console.log("restaurants found are" + restaurants);
        let data = {
          success: true,
          result: restaurants
        };
        callback(null, data);
        // return response.status(200).json(restaurants);
      }
    }
  );
}

exports.handle_request = handle_request;
