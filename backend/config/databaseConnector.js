import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to DB at ${connected.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;