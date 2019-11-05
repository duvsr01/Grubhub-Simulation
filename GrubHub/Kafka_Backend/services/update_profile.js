const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../models/users");
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  console.log("Inside Update Profile Post Request");

  var firstname = msg.firstname;
  var lastname = msg.lastname;
  var email = msg.email;
  var phone = msg.phone;
  var user_password = msg.password;

  User.findOne({ email_id: email })
    .then(user => {
      if (!user) {
        err = { error: "User not found" };
        callback(null, err);
        //return response.status(400).json("User not found");
      } else {
        bcrypt.compare(user_password, user.password).then(isMatch => {
          if (!isMatch) {
            err = { error: "Password is incorrect" };
            callback(null, err);
            //return response.status(400).json("Password is incorrect");
          } else {
            console.log("user details are" + user);
            let user_type = user.user_type;

            User.findOneAndUpdate(
              { email_id: user.email_id },
              {
                first_name: firstname,
                last_name: lastname,
                phone_number: phone,
                email_id: email
              },
              { upsert: true }
            ).then(
              result => {
                console.log("Updated Document:", result);
                data = {
                  success: true,
                  result: result
                };
                callback(null, data);
                // return response.status(200).json(data);
              },
              err => {
                console.log(err);
                console.log("Error updating Profile");
                err = { error: "Error updating Profile" };
                callback(null, err);

                //return response.status(400).json(err);
              }
            );

            if (user_type === "owner") {
              let restaurantname = msg.restaurantname;
              let restaurant_cuisine = msg.restaurant_cuisine;
              let restaurantzip = msg.restaurantzip;
              console.log("printing email" + email);
              Restaurant.findOneAndUpdate(
                {
                  users: {
                    email_id: email
                  }
                },
                {
                  res_name: restaurantname,
                  res_zipcode: restaurantzip,
                  res_cuisine: restaurant_cuisine
                },
                { upsert: true }
              ).then(
                result => {
                  console.log("Updated Restaurant Document:", result);
                  data = {
                    success: true,
                    result: result
                  };
                },
                err => {
                  console.log(err);
                  console.log("Error updating Profile");
                  err = { error: "Error updating Profile" };
                  callback(null, err);
                }
              );
            }
          }
        });
      }
    })
    .catch(err => {
      console.log("Error ocuured while retreiving profile details" + err);
      err = { error: "Error ocuured while retreiving profile details" };
      callback(null, err);
    });
}

exports.handle_request = handle_request;
