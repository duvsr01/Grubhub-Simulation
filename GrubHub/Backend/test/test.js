var assert = require("chai").assert;
const request = require("supertest");
const app = require("../app");
const expect = require("chai").expect;

describe("Login API", function() {
  it("Should be successful if credential is valid", function(done) {
    request(app)
      .post("/api/login/login")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({ email: "sruthi.duvvuri@gmail.com", password: "admin" })
      .expect(200)
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
      .post("/api/login/register")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        firstname: "Skaar",
        lastname: "Sagar",
        email: "skaar@gmail.com",
        password: "admin",
        usertype: "buyer"
      })
      .expect(200)
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
      .post("/api/profile/updprofile")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWRjMTk5MDgwZjgxYWE2MzUwODkxZjc2IiwiZW1haWxfaWQiOiJzcnV0aGkuZHV2dnVyaUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiU3J1dGhpIiwibGFzdF9uYW1lIjoiRHV2dnVyaSIsInVzZXJfdHlwZSI6ImJ1eWVyIiwiaWF0IjoxNTczMDU1ODI5LCJleHAiOjE1NzMwNTk0Mjl9.qPmCT8FbKhCmaOM3XYlibKHa4-itsJd3o0LFn78CbBs"
      )
      .send({
        firstname: "Sruthi",
        lastname: "Duvvuri",
        email: "sruthi.duvvuri@gmail.com",
        phone: "8106719106",
        password: "admin"
      })
      .expect(200)
      .expect(function(response) {
        expect(response).not.to.be.empty;
      })
      .end(done);
  });
});

describe("Place Order", function() {
  it("Should place order", function(done) {
    request(app)
      .post("/api/orders/placeOrder")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWRjMTk5MDgwZjgxYWE2MzUwODkxZjc2IiwiZW1haWxfaWQiOiJzcnV0aGkuZHV2dnVyaUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiU3J1dGhpIiwibGFzdF9uYW1lIjoiRHV2dnVyaSIsInVzZXJfdHlwZSI6ImJ1eWVyIiwiaWF0IjoxNTczMDU1ODI5LCJleHAiOjE1NzMwNTk0Mjl9.qPmCT8FbKhCmaOM3XYlibKHa4-itsJd3o0LFn78CbBs"
      )
      .send([
        {
          buyer_id: "5dc199080f81aa6350891f76",
          buyer_email: "sruthi.duvvuri@gmail.com",
          resID: "5dc26cb5271efb06752b2ecc",
          resName: "Joeys Restaurant",
          item: "Pan cakes",
          price: "20",
          qty: "1"
        }
      ])
      .expect(200)
      .expect(function(response) {
        expect(response).not.to.be.empty;
      })
      .end(done);
  });
});

describe("Update Order", function() {
  it("Should update order", function(done) {
    request(app)
      .post("/api/orders/updateOrder")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWRjMjZjYjUyNzFlZmIwNjc1MmIyZWNiIiwiZW1haWxfaWQiOiJqb2V5QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJKb2V5IiwibGFzdF9uYW1lIjoiVHJpYmlhbm5pIiwidXNlcl90eXBlIjoib3duZXIiLCJwaG9uZV9udW1iZXIiOiI5MTA0ODU3NDAzNSIsInJlc19pZCI6IjVkYzI2Y2I1MjcxZWZiMDY3NTJiMmVjYyIsInJlc3RfbmFtZSI6IkpvZXlzIFJlc3RhdXJhbnQiLCJyZXN0X3ppcGNvZGUiOiI4OTIzNzIiLCJpYXQiOjE1NzMwNTc4MDcsImV4cCI6MTU3MzA2MTQwN30.Bow8wLaOU6wqrzYKHxKiurJS4udW5hfHZpiK0tRPbqc"
      )
      .send({
        buyer_id: "5dc199080f81aa6350891f76",
        resID: "5dc26cb5271efb06752b2ecc",
        orderstatus: "Ready"
      })
      .expect(200)
      .expect(function(response) {
        expect(response).not.to.be.empty;
      })
      .end(done);
  });
});
