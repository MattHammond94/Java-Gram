import mongoose from "mongoose";
import specHelper from "../specHelper.js";

specHelper();

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });
});