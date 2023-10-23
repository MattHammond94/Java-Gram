import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Database connection:
import connectDB from "./config/databaseConnector.js";

connectDB();

// Routes:
import userRoutes from './routes/userRoutes.js'

// Config:
const port = process.env.PORT || 4444;
const app = express();

// Middleware: 
app.use(morgan('dev'));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('server is running');
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
