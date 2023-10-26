import mongoose from "mongoose";

const connectDB = async (environment) => {
  let connectionString;

  if(environment === "test") {
    connectionString = process.env.TEST_DB_URI
  } else {
    connectionString = process.env.DB_URI
  }

  try {
    const connected = await mongoose.connect(connectionString);
    console.log(`Connected to DB at ${connected.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;