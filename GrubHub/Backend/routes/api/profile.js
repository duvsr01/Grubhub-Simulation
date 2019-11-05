const express = require("express");
const router = express.Router();
var kafka = require("../../kafka/client");
const passport = require("passport");

router.get(
  "/userprofile",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Get User profile Request");
    kafka.make_request("get_profile", request.query, function(err, results) {
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
  "/updprofile",
  passport.authenticate("jwt", { session: false }),
  function(request, response) {
    console.log("Inside Update Profile Post Request");
    console.log("Req Body : ", request.body);

    kafka.make_request("update_profile", request.body, function(err, results) {
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
