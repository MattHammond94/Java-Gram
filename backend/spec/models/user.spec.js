// import mongoose from "mongoose";
// import specHelper from "../specHelper.js";

const mongoose = require("mongoose");
const specHelper = require("../specHelper");

specHelper();

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });
});