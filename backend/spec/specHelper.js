import mongoose from "mongoose";

const specHelper = () => {
  beforeAll((done) => {
    mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    done();
  });
};

export default specHelper;