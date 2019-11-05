const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../models/users");
const Restaurant = require("../models/restaurants");

function handle_request(msg, callback) {
  console.log("Inside Register Post Request");

  var email = msg.email;
  var firstname = msg.firstname;
  var lastname = msg.lastname;
  var password = msg.password;
  var user_type = msg.usertype;

  User.findOne({ email_id: email }).then(user => {
    if (user) {
      err = { error: "User already exists" };
      callback(null, err);
    } else {
      const profile_image = gravatar.url(email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        email_id: email,
        first_name: firstname,
        last_name: lastname,
        password: password,
        user_type: user_type,
        profile_image
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              data = {
                success: true,
                user: user
              };
              callback(null, data);
              // response.status(200).json(user);
              console.log(
                " The user record entered with id " + user._id,
                "The user email id is " + user.email_id
              );
              if (user_type === "owner") {
                let restaurant_name = msg.restaurant_name;
                let restaurant_zipcode = msg.restaurant_zipcode;
                const newRestaurant = new Restaurant({
                  users: {
                    email_id: user.email_id
                  },
                  res_name: restaurant_name,
                  res_zipcode: restaurant_zipcode
                });
                newRestaurant
                  .save()
                  .then(restaurant => {
                    console.log(
                      "restaurant is inserted " + restaurant._id,
                      "The restaurant name is " + restaurant.res_name
                    );
                  })
                  .catch(err => {
                    err => callback(null, err);
                    console.log("Error while creating restaurant " + err);
                  });
              }
            })
            .catch(err => {
              callback(null, err);
              console.log(err);
            });
        });
      });
    }
  });
}

exports.handle_request = handle_request;
