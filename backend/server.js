import app from './app.js';

// Database connection:
import connectDB from "./config/databaseConnector.js";

connectDB();

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`Server started on port ${port}`));
