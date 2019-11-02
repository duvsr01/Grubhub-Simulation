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

//Load User Model
const User = require("../../models/users");
const Restaurant = require("../../models/restaurants");

router.get("/getMenu", function(request, response) {
  console.log("request is" + request);
  let test = request.toString();
  console.log("test" + test);
  let email = request.query.email;
  console.log("Owner email ID is" + email);

  Restaurant.findOne({
    users: {
      email_id: email
    }
  }).then(restaurant => {
    if (!restaurant) {
      console.log("no restaurant found");
      let result = "No restaurants found";
      let data = { success: false, result: result };
      return response.status(400).json(data);
    } else {
      console.log("restaurant details are " + restaurant);
      let data = {
        success: true,
        menu: restaurant.res_menu
      };
      return response.status(200).json(data);
    }
  });
});

router.get("/getBuyerMenu", function(request, response) {
  console.log("request is" + request);
  let test = request.toString();
  console.log("test" + test);
  let resID = request.query.resID;
  console.log("Restaurant ID is" + resID);

  Restaurant.findOne({
    _id: resID
  }).then(restaurant => {
    if (!restaurant) {
      console.log("no restaurant found");
      let result = "No restaurants found";
      let data = { success: false, result: result };
      return response.status(400).json(data);
    } else {
      console.log("restaurant details are " + restaurant);
      let data = {
        success: true,
        menu: restaurant.res_menu
      };
      return response.status(200).json(data);
    }
  });
});

router.post("/updatemenu", function(request, response) {
  console.log("Inside Update Menu Post Request");

  console.log("Req Body : ", request.body);
  let data = request.body;

  var email = request.body.email;
  var menu = request.body.menu;

  console.log("email is" + email);
  console.log("menu is" + menu);

  Restaurant.findOneAndUpdate(
    {
      users: {
        email_id: email
      }
    },
    { $set: { res_menu: menu } },
    { upsert: true }
  )
    .then(result => {
      console.log("Updated Restaurant Document:", result);
      data = {
        success: true,
        result: result
      };
      return response.status(200).json(data);
    })
    .catch(err =>
      console.log("Error ocuured while updating menu details" + err)
    );
});

module.exports = router;
