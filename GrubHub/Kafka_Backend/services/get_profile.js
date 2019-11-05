//Load User Model
const User = require("../models/users");
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  console.log("Inside Get Profile Request");

  console.log("request is" + JSON.stringify(msg));
  let test = msg.toString();
  console.log("test");

  var email = msg.email_id;
  console.log("email is" + email);

  User.findOne({ email_id: email }).then(user => {
    if (!user) {
      err = { error: "User not found" };
      callback(null, err);
    } else {
      console.log("user details are" + user);
      if (user.user_type === "buyer") {
        data = {
          success: true,
          user: user
        };
        callback(null, data);
      } else if (user.user_type === "owner") {
        console.log("enters owner loop");
        console.log("printing email" + email);

        var res_obj = {};

        res_obj._id = user._id;
        res_obj.email_id = user.email_id;
        res_obj.first_name = user.first_name;
        res_obj.last_name = user.last_name;
        res_obj.password = user.password;
        res_obj.user_type = user.user_type;
        res_obj.profile_image = user.profile_image;
        res_obj.phone_number = user.phone_number;

        Restaurant.findOne({
          users: {
            email_id: email
          }
        }).then(restaurant => {
          if (!restaurant) {
            console.log("no restaurant found");
          } else {
            console.log("restaurant details are " + restaurant);
            res_obj.res_id = restaurant._id;
            res_obj.rest_name = restaurant.res_name;
            res_obj.rest_zipcode = restaurant.res_zipcode;
            res_obj.rest_cuisine = restaurant.res_cuisine;

            console.log("res details are" + res_obj);

            data = {
              success: true,
              user: res_obj
            };
            callback(null, data);

            //return response.status(200).json(res_obj);
          }
        });
      }
    }
  });
}

exports.handle_request = handle_request;
