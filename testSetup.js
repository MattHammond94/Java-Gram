import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const testLogger = () => {
  console.log('Tests are running as expected...')
}

const testDatabaseConnector = async () => {
  const connected = await mongoose.connect(process.env.TEST_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`Connected to the test database @: ${connected.connection.host}`);
};

const testDatabaseUsersTruncator = async () => {
  await mongoose.connection.collections.users.drop();

  console.log('Database has been cleared.')
}

const testDatabaseConnectionCloser = async () => {
  await mongoose.connection.close();

  console.log('Test database connection closed.')
}

testLogger();

export { 
  testDatabaseConnector,
  testDatabaseUsersTruncator,
  testDatabaseConnectionCloser
};