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

router.get("/getRst", function(request, response) {
  console.log("Inside GetRestaurants request");
  console.log("Request is" + request);
  let test = request.toString();
  console.log("test");

  Restaurant.find({}, function(err, restaurants) {
    if (!restaurants) {
      console.log("No restaurants found");
      let data = {
        success: false,
        msg: "No restaurants found"
      };
      return response.status(400).json(data);
    } else {
      console.log("the restaurants list is " + restaurants);
      let data = {
        success: true,
        msg: restaurants
      };
      return response.status(200).json(data);
    }
  });
});

router.post("/searchItem", function(request, response) {
  console.log("Inside Search Item Request");
  console.log("request is" + request);
  let test = request.toString();
  console.log("test");

  console.log("Inside Search Post Request");
  console.log("Req Body : ", request.body);

  var searchItem = "";
  request.body.Search;
  if (request.body.Search) {
    searchItem = request.body.Search;
  }

  var cuisine = "";
  if (request.body.Cuisine) {
    cuisine = request.body.Cuisine;
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
        return response.status(200).json(restaurants);
      }
    }
  );
});

module.exports = router;
