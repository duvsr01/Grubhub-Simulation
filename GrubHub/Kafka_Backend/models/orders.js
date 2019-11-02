const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const OrderSchema = new Schema({
  buyer_id: {
    type: String
  },
  buyer_email: {
    type: String
  },
  res_id: {
    type: String
  },
  res_name: {
    type: String
  },
  item_name: {
    type: String
  },
  item_price: {
    type: Number
  },
  item_qty: {
    type: Number
  },
  order_status: {
    type: String
  }
});

module.exports = Order = mongoose.model("orders", OrderSchema);
