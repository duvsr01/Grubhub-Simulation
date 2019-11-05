const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const passport = require("passport");

router.get(
  "/getRst",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside GetRestaurants request");
    console.log("Request is" + request);
    kafka.make_request("get_restaurants", request.query, function(
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

router.post(
  "/searchItem",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Search Item Request");
    console.log("request is" + request);

    console.log("Inside Search Post Request");
    console.log("Req Body : ", request.body);

    kafka.make_request("search_item", request.body, function(err, results) {
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
