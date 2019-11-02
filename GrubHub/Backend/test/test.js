var assert = require("chai").assert;
const request = require("supertest");
const app = require("../app");
const expect = require("chai").expect;

describe("Login API", function() {
  it("Should be successful if credential is valid", function(done) {
    request(app)
      .post("/login")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ email: "sruthi.duvvuri@gmail.com", password: "admin" })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function(response) {
        expect(response).not.to.be.empty;
        expect(response.body).to.be.an("object");
      })
      .end(done);
  });
});

describe("Register API", function() {
  it("Creation of Account should be successful", function(done) {
    request(app)
      .post("/register")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        firstname: "Alankrita",
        lastname: "B",
        email: "alankrita@gmail.com",
        password: "admin",
        usertype: "buyer",
        restaurant_name: "",
        restaurant_zipcode: ""
      })
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(function(response) {
        expect(response).not.to.be.empty;
        expect(response.status).to.equal(200);
      })
      .end(done);
  });
});

describe("Update Profile ", function() {
  it("Should update the profile", function(done) {
    request(app)
      .post("/updprofile")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        firstname: "Sruthi",
        lastname: "Duvvuri",
        email: "sruthi.duvvuri@gmail.com",
        phone: "8106719106",
        password: "admin",
        restaurantname: "",
        restaurant_cuisine: "",
        restaurantzip: ""
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function(response) {
        expect(response).not.to.be.empty;
      })
      .end(done);
  });
});
