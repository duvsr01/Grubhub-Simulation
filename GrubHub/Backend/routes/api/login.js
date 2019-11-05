const express = require("express");
const router = express.Router();
const passport = require("passport");
var kafka = require("../../kafka/client");
const mongoose = require("mongoose");

//Load User Model
const User = require("../../models/users");
const Restaurant = require("../../models/restaurants");

router.post("/login", function(request, response) {
  console.log("Inside Login Post Request");
  console.log("Req Body : ", request.body);

  kafka.make_request("login_user", request.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      response.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        response.end(JSON.stringify(results));
      } else response.status(400).json(results);
    }
  });
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

  kafka.make_request("register", request.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      response.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        response.end(JSON.stringify(results));
      } else response.status(400).json(results);
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
