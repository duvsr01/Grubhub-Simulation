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

//Load  Models
const Message = require("../../models/messages");

router.post("/sendMsg", function(request, response) {
  console.log("Inside Send Message Post Request");
  // console.log("inside request:", request);
  console.log("Req Body : ", request.body);
  let data = request.body;
  var resID = request.body.resID;
  let buyer_id = request.body.buyer_id;
  let buyer_email = request.body.buyer_email;
  let msg = request.body.msg;
  let resName = request.body.resName;
  let order_id = request.body.order_id;
  console.log("data is" + data);
  console.log("resID is" + resID);

  const newMessage = new Message({
    buyer_id: buyer_id,
    buyer_email: buyer_email,
    res_id: resID,
    msg: msg,
    resName: resName,
    order_id: order_id
  });

  newMessage
    .save()
    .then(msg => {
      response.status(200).json(msg);
      console.log(
        " The Messages collection is updated with msg id " + msg._id,
        "The message is mapped to buyer " + msg.buyer_email
      );
    })
    .catch(err => response.status(400).json(err));
});

router.get("/viewBuyerMsg", function(request, response) {
  console.log("Inside View Buyer Message request is " + request);
  let test = request.toString();
  console.log("test" + test);

  let buyer_id = request.query.buyer_id;
  console.log("Buyer ID is" + buyer_id);

  Message.find({
    buyer_id: buyer_id
  })
    .then(msg => {
      if (msg) {
        console.log("Message details are" + msg);
        return response.status(200).json(msg);
      }
    })
    .catch(err => console.log("Error while getting Messages" + err));
});

router.get("/viewOwnerMsg", function(request, response) {
  console.log("Inside View Owner Message request is " + request);
  let test = request.toString();
  console.log("test" + test);

  let res_id = request.query.res_id;
  console.log("Restaurant ID is" + res_id);

  Message.find({
    res_id: res_id
  })
    .then(msg => {
      if (msg) {
        console.log("Message details are" + msg);
        return response.status(200).json(msg);
      }
    })
    .catch(err => console.log("Error while getting Messages" + err));
});

module.exports = router;
