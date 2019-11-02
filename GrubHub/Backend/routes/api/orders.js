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
const Order = require("../../models/orders");

router.post("/placeOrder", function(request, response) {
  console.log("Inside Place order Post Request");
  // console.log("inside request:", request);
  console.log("Req Body : ", request.body);
  let data = request.body;
  console.log("data is" + data);

  data.map((item, itemIndex) => {
    const newOrder = new Order({
      buyer_id: item.buyer_id,
      buyer_email: item.buyer_email,
      res_id: item.resID,
      res_name: item.resName,
      item_name: item.item,
      item_price: item.price,
      item_qty: item.qty,
      order_status: "New"
    });

    console.log("buyer_id is " + item.buyer_id);
    console.log("buyer_email is " + item.buyer_email);
    console.log("restaurant_id is " + item.resID);
    console.log("restaurant_id is " + item.resName);
    console.log("item_name is" + item.item);
    console.log("item_price is" + item.price);
    console.log("item_qty is" + item.qty);

    newOrder.save().then(order => {
      response.status(200).json(order);
      console
        .log(
          " The Order is saved with id " + order._id,
          "The restaurant id is " + order.res_id
        )
        .catch(err =>
          console.log("Order could not be placed successfully" + err)
        );

      var flag = 0;
    });
  });
});

router.get("/pastOrders", function(request, response) {
  console.log("Inside past orders request is " + request);
  let test = request.toString();
  console.log("test" + test);

  let buyer_id = request.query.buyer_id;
  console.log("Buyer ID is" + buyer_id);

  Order.find({
    buyer_id: buyer_id,
    order_status: { $in: ["Delivered", "Cancelled"] }
  })
    .then(order => {
      if (order) {
        console.log("Order details are" + order);
        return response.status(200).json(order);
      }
    })
    .catch(err => console.log("Error while getting orders" + err));
});

router.get("/upcomingOrders", function(request, response) {
  console.log("Inside upcoming orders request is " + request);
  let test = request.toString();
  console.log("test" + test);

  let buyer_id = request.query.buyer_id;
  console.log("Buyer ID is" + buyer_id);

  Order.find({
    buyer_id: buyer_id,
    order_status: { $in: ["New", "Ready", "Preparing"] }
  })
    .then(order => {
      if (order) {
        console.log("Order details are" + order);
        return response.status(200).json(order);
      }
    })
    .catch(err => console.log("Error while getting orders" + err));
});

router.get("/manageOrders", function(request, response) {
  console.log("Inside Manage orders request is " + request);
  let test = request.toString();
  console.log("test" + test);
  let resID = request.query.resID;
  console.log("Restaurant ID is" + resID);

  Order.find({
    res_id: resID
  })
    .then(order => {
      if (order) {
        console.log("Order details are" + order);
        return response.status(200).json(order);
      }
    })
    .catch(err => console.log("Error while getting orders" + err));
});

router.post("/updateOrder", function(request, response) {
  console.log("Inside Update Order Post Request");
  // console.log("inside request:", request);
  console.log("Req Body : ", request.body);
  let data = request.body;
  var resID = request.body.resID;
  let buyer_id = request.body.buyer_id;
  let orderstatus = request.body.orderstatus;
  console.log("data is" + data);
  console.log("resID is" + resID);

  Order.updateMany(
    { buyer_id: buyer_id, res_id: resID },
    {
      $set: { order_status: orderstatus }
    },
    { upsert: true }
  )
    .then(order => {
      console.log("Updated Order Document:", order);
      data = {
        success: true,
        result: order
      };
      return response.status(200).json(data);
    })
    .catch(err => console.log("Error while updating order status"));
});

module.exports = router;
