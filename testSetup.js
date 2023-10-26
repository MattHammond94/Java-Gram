import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const testLogger = () => {
  console.log('Tests are running as expected...')
}

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
    console.log('Database has been cleared.')
  } catch(error) {
    console.log(error)
  }
}

const testDatabaseConnectionCloser = async () => {
  try {
    await mongoose.connection.close();
    console.log('Test database connection closed.')
  } catch(error) {
    console.log(error)
  }
}

testLogger();

export { 
  testDatabaseConnector,
  testDatabaseUsersTruncator,
  testDatabaseConnectionCloser
};