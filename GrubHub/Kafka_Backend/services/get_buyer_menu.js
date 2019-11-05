//Load User and Restaurant  Model
const User = require("../models/users");
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  console.log("Inside Get Buyer Menu Request");

  let resID = msg.resID;
  console.log("The resID is" + resID);

  Restaurant.findOne({
    _id: resID
  })
    .then(restaurant => {
      if (!restaurant) {
        console.log("no restaurant found");
        let result = "No restaurants found";
        let data = {
          success: false,
          result: result
        };
        callback(null, data);
        //return response.status(400).json(data);
      } else {
        console.log("restaurant details are " + restaurant);
        let data = {
          success: true,
          menu: restaurant.res_menu
        };
        callback(null, data);
        //return response.status(200).json(data);
      }
    })
    .catch(err => callback(null, err));
}

exports.handle_request = handle_request;
