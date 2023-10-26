import app from './app.js';

// Database connection:
import connectDB from "./config/databaseConnector.js";

const startServer = async() => {
  let port;
  const environment = process.env.NODE_ENV
  
  try { 
    await connectDB(environment); 
  }
  catch(error) {
    console.log(error)
  }

  if (environment === 'test') {
    port = process.env.TEST_PORT;
  } else {
    port = process.env.PORT || 4000;
  }
  
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

startServer();

export default startServer;
