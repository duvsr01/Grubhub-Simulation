const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const passport = require("passport");

router.post(
  "/placeOrder",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Place order Post Request");
    // console.log("inside request:", request);
    console.log("Req Body : ", request.body);
    let data = request.body;
    kafka.make_request("place_order", request.body, function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        response.status(400).json(errors);
      } else {
        console.log("Inside place order");
        if (results.success) {
          response.end(JSON.stringify(results));
        } else response.status(400).json(results);
      }
    });
  }
);

router.get(
  "/pastOrders",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside past orders request is " + request);

    kafka.make_request("past_orders", request.query, function(err, results) {
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
  }
);

router.get(
  "/upcomingOrders",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside upcoming orders request is " + request);

    kafka.make_request("upcoming_orders", request.query, function(
      err,
      results
    ) {
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
  }
);

router.get(
  "/manageOrders",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Manage orders Request is" + request);

    kafka.make_request("manage_orders", request.query, function(err, results) {
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
  }
);

router.post(
  "/updateOrder",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Update Order Post Request");
    // console.log("inside request:", request);
    console.log("Req Body : ", request.body);
    kafka.make_request("update_order", request.body, function(err, results) {
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
  }
);

module.exports = router;
