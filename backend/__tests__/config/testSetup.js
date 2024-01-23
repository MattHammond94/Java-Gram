import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
process.env.NODE_ENV = 'test'
console.log(`Tests are running in the: ${process.env.NODE_ENV}`);

const testDatabaseConnector = async () => {
  try {
    const connected = await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    console.log(`Connected to the test database @: ${connected.connection.host}`);
    
  } catch(error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const testDatabaseUsersTruncator = async () => {
  try {
    await mongoose.connection.collections.users.drop();
  } catch(error) {
    console.error(error)
  }
}

const testDatabasePostsTruncator = async () => {
  try {
    await mongoose.connection.collections.posts.drop();
  } catch(error) {
    // console.error(error)
  }
}

const testDatabaseCommentTruncator = async () => {
  try {
    await mongoose.connection.collections.comments.drop();
  } catch(error) {
    console.error(error)
  }
}

const testDatabaseConnectionCloser = async () => {
  try {
    await mongoose.connection.close();
  } catch(error) {
    console.error(error)
  }
}

export { 
  testDatabaseConnector,
  testDatabaseUsersTruncator,
  testDatabasePostsTruncator,
  testDatabaseCommentTruncator,
  testDatabaseConnectionCloser
};