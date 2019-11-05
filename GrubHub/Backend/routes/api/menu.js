const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const passport = require("passport");

router.get(
  "/getMenu",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log(" Inside GetMenu request is" + request);

    kafka.make_request("get_menu", request.query, function(err, results) {
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
  "/getBuyerMenu",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside BuyerMenu Request is" + request);

    kafka.make_request("get_buyer_menu", request.query, function(err, results) {
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
  "/updatemenu",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Update Menu Post Request");
    console.log("Req Body : ", request.body);
    kafka.make_request("update_menu", request.body, function(err, results) {
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
