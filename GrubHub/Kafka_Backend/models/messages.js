const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const MessageSchema = new Schema({
  buyer_id: {
    type: String
  },
  buyer_email: {
    type: String
  },
  res_id: {
    type: String
  },
  msg: {
    type: String
  },
  resName: {
    type: String
  },
  order_id: {
    type: String
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
