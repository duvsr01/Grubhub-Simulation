var connection = new require("./kafka/connection");
const mongoose = require("mongoose");

//topics files
var login = require("./services/login.js");
var register = require("./services/register.js");
var get_profile = require("./services/get_profile.js");
var update_profile = require("./services/update_profile.js");
var get_menu = require("./services/get_menu.js");
var update_menu = require("./services/update_menu.js");
var get_buyer_menu = require("./services/get_buyer_menu.js");
var get_restaurants = require("./services/get_restaurants.js");
var search_item = require("./services/search_item.js");
var manage_orders = require("./services/manage_orders.js");
var place_order = require("./services/place_order.js");
var update_order = require("./services/update_order.js");
var upcoming_orders = require("./services/upcoming_orders.js");
var past_orders = require("./services/past_orders.js");
var send_msg = require("./services/send_msg.js");
var view_buyer_msg = require("./services/view_buyer_msg.js");
var view_owner_msg = require("./services/view_owner_msg.js");

// Mongoose DB config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { poolSize: 10 })
  .then(() =>
    console.log("Kafka Backend running - MongoDB Connected from Mongoose")
  )
  .catch(err => console.log(err));

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login_user", login);
handleTopicRequest("register", register);
handleTopicRequest("get_profile", get_profile);
handleTopicRequest("update_profile", update_profile);
handleTopicRequest("get_menu", get_menu);
handleTopicRequest("update_menu", update_menu);
handleTopicRequest("get_buyer_menu", get_buyer_menu);
handleTopicRequest("get_restaurants", get_restaurants);
handleTopicRequest("search_item", search_item);
handleTopicRequest("manage_orders", manage_orders);
handleTopicRequest("place_order", place_order);
handleTopicRequest("update_order", update_order);
handleTopicRequest("upcoming_orders", upcoming_orders);
handleTopicRequest("past_orders", past_orders);
handleTopicRequest("send_msg", send_msg);
handleTopicRequest("view_buyer_msg", view_buyer_msg);
handleTopicRequest("view_owner_msg", view_owner_msg);
