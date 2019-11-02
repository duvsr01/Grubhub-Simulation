const express = require("express");
const mysql = require("mysql");
const app = express();
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
const url = require("url");
const querystring = require("querystring");
var passwordHash = require("password-hash");
var mongo = require("mongodb");
const mongoose = require("mongoose");
const passport = require("passport");

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

//Create Connection
/*const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "sruthi",
  password: "admin",
  database: "nodemysql"
});

//connect
db.connect(function(err) {
  if (err) {
    console.log("Connection Error" + err);
  } else {
    console.log("MySql Connected...");
  }
}); */

/* Direct Mongodb connection
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const db_url = "mongodb://localhost:27017";

// Database Name
const dbName = "nodedb";

// Use connect method to connect to the server
MongoClient.connect(db_url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
}); */

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
