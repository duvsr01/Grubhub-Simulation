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
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../../models/users");
const Restaurant = require("../../models/restaurants");

router.get("/userprofile", function(request, response) {
  console.log("request is" + request);
  let test = request.toString();
  console.log("test");
  let email = request.query.email_id;
  console.log("email is" + email);

  User.findOne({ email_id: email }).then(user => {
    if (!user) {
      return response.status(400).json("User not found");
    } else {
      console.log("user details are" + user);
      if (user.user_type === "buyer") {
        console.log("login details are" + user);
        return response.status(200).json(user);
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

            return response.status(200).json(res_obj);
          }
        });
      }
    }
  });
});

router.post("/updprofile", function(request, response) {
  console.log("Inside Update Profile Post Request");
  console.log("Req Body : ", request.body);

  var firstname = request.body.firstname;
  var lastname = request.body.lastname;
  var email = request.body.email;
  var phone = request.body.phone;
  var user_password = request.body.password;

  User.findOne({ email_id: email })
    .then(user => {
      if (!user) {
        return response.status(400).json("User not found");
      } else {
        bcrypt.compare(user_password, user.password).then(isMatch => {
          if (!isMatch) {
            return response.status(400).json("Password is incorrect");
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
                //   res.writeHead(200, {
                //     "Content-Type": "text/plain"
                //   });
                data = {
                  success: true,
                  result: result
                };
                return response.status(200).json(data);
              },
              err => {
                console.log(err);
                console.log("Error updating Profile");
                //   res.writeHead(400, {
                //     "Content-Type": "text/plain"
                //   });
                return response.status(400).json(err);
              }
            );

            if (user_type === "owner") {
              let restaurantname = request.body.restaurantname;
              let restaurant_cuisine = request.body.restaurant_cuisine;
              let restaurantzip = request.body.restaurantzip;
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
                  //   res.writeHead(200, {
                  //     "Content-Type": "text/plain"
                  //   });
                  data = {
                    success: true,
                    result: result
                  };
                },
                err => {
                  console.log(err);
                  console.log("Error updating Profile");
                  //   res.writeHead(400, {
                  //     "Content-Type": "text/plain"
                  //   });
                }
              );
            }
          }
        });
      }
    })
    .catch(err =>
      console.log("Error ocuured while retreiving profile details" + err)
    );
});

module.exports = router;
