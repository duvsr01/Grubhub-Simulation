const express = require("express");
const app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var cors = require("cors");
app.set("view engine", "ejs");
const mongoose = require("mongoose");
const passport = require("passport");
var kafka = require("./kafka/client");

//defining routes
const login = require("./routes/api/login");
const profile = require("./routes/api/profile");
const restaurants = require("./routes/api/restaurants");
const orders = require("./routes/api/orders");
const menu = require("./routes/api/menu");
const messages = require("./routes/api/messages");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose DB config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected from Mongoose"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//use routes
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/restaurants", restaurants);
app.use("/api/orders", orders);
app.use("/api/menu", menu);
app.use("/api/messages", messages);

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
