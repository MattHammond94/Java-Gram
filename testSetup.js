import dotenv from "dotenv";
dotenv.config();

const testLogger = () => {
  console.log('I will be called before any test cases run')
}

testLogger();