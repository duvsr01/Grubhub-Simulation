const express = require("express");
const mysql = require("mysql");
const router = express.Router();
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const url = require("url");
const querystring = require("querystring");
var passwordHash = require("password-hash");
var mongo = require("mongodb");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load User Model
const User = require("../../models/users");
const Restaurant = require("../../models/restaurants");

router.post("/login", function(request, response) {
  console.log("Inside Login Post Request");
  console.log("Req Body : ", request.body);
  var email = request.body.email;
  var password = request.body.password;

  User.findOne({ email_id: email })
    .then(user => {
      if (!user) {
        return response.status(400).json("User not found");
      } else {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return response.status(400).json("Password is incorrect");
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
                    response.json({
                      success: true,
                      token: "Bearer " + token
                    });
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
                        response.json({
                          success: true,
                          token: "Bearer " + token
                        });
                      }
                    );

                    // return response.status(200).json(res_obj);
                  }
                });
              }
            }
          })
          .catch(err => console.log("Error occured at login" + err));
      }
    })
    .catch(err => console.log("Error ocuured at login" + err));
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user._id,
      email: req.user.email_id,
      firstName: req.user.first_name,
      lastName: req.user.last_name,
      userType: req.user.user_type
    });
  }
);

router.post("/register", function(request, response) {
  console.log("Inside Register Post Request");
  console.log("Req Body : ", request.body);

  var email = request.body.email;
  var firstname = request.body.firstname;
  var lastname = request.body.lastname;
  var password = request.body.password;
  var user_type = request.body.usertype;

  User.findOne({ email_id: email }).then(user => {
    if (user) {
      return response.status(400).json({ email: "User already exists" });
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
              response.status(200).json(user);
              console.log(
                " The user record entered with id " + user._id,
                "The user email id is " + user.email_id
              );
              if (user_type === "owner") {
                let restaurant_name = request.body.restaurant_name;
                let restaurant_zipcode = request.body.restaurant_zipcode;
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
                    console.log("Error while creating restaurant " + err);
                  });
              }
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.get("/home", function(request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

module.exports = router;
