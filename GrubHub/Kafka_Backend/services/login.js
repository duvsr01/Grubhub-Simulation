const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

//Load User Model
const User = require("../models/users");
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  const email = msg.email;
  const password = msg.password;

  User.findOne({ email_id: email })
    .then(user => {
      if (!user) {
        err = { error: "User not found" };
        callback(null, err);
      } else {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              err = { error: "Password is incorrect" };
              callback(null, err);
            } else {
              // User Matched

              console.log("user details are" + user);

              if (user.user_type === "buyer") {
                console.log("login details are" + user);

                const payload = {
                  user_id: user._id,
                  email_id: user.email_id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  user_type: user.user_type,
                  phone_number: user.phone_number
                }; // Create JWT Payload

                //Sign Token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    data = {
                      success: true,
                      token: "Bearer " + token
                    };
                    callback(null, data);
                  }
                );

                //return response.status(200).json(user);
              } else if (user.user_type === "owner") {
                console.log("enters owner loop");
                console.log("printing email" + email);

                var payload = {};

                payload.user_id = user._id;
                payload.email_id = user.email_id;
                payload.first_name = user.first_name;
                payload.last_name = user.last_name;
                payload.user_type = user.user_type;
                payload.phone_number = user.phone_number;

                Restaurant.findOne({
                  users: {
                    email_id: email
                  }
                }).then(restaurant => {
                  if (!restaurant) {
                    console.log("no restaurant found");
                  } else {
                    console.log("restaurant details are " + restaurant);
                    payload.res_id = restaurant._id;
                    payload.rest_name = restaurant.res_name;
                    payload.rest_zipcode = restaurant.res_zipcode;

                    console.log("res details are" + payload);

                    //Sign Token
                    jwt.sign(
                      payload,
                      keys.secretOrKey,
                      { expiresIn: 3600 },
                      (err, token) => {
                        data = {
                          success: true,
                          token: "Bearer " + token
                        };
                        callback(null, data);
                      }
                    );

                    // return response.status(200).json(res_obj);
                  }
                });
              }
            }
          })
          .catch(err => callback(null, err));
      }
    })
    .catch(err => callback(null, err));
}
exports.handle_request = handle_request;
