// import mongoose from "mongoose";
const mongoose = require("mongoose");

const specHelper = () => {
  beforeAll((done) => {
    mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    done();
  });
};

module.exports = specHelper;