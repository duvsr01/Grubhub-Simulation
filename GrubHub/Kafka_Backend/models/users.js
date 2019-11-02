const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
  email_id: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_type: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: false
  },
  profile_image: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
