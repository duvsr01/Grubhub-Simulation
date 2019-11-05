const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const passport = require("passport");

router.post(
  "/sendMsg",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Send Message Post Request");
    // console.log("inside request:", request);
    console.log("Req Body : ", request.body);
    kafka.make_request("send_msg", request.body, function(err, results) {
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
  "/viewBuyerMsg",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside View Buyer Message request is " + request);

    kafka.make_request("view_buyer_msg", request.query, function(err, results) {
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
  "/viewOwnerMsg",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside View Owner Message request is " + request);

    kafka.make_request("view_owner_msg", request.query, function(err, results) {
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
