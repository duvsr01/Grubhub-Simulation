const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const RestaurantSchema = new Schema({
  res_name: {
    type: String,
    required: true
  },
  res_zipcode: {
    type: String,
    required: false
  },
  res_cuisine: {
    type: String,
    required: false
  },
  res_image: {
    type: String,
    required: false
  },
  res_address: {
    type: String,
    required: false
  },
  users: {
    email_id: {
      type: String,
      required: true
    }
  },
  res_menu: {
    type: Array
  }
});

module.exports = Restaurant = mongoose.model("restaurants", RestaurantSchema);
