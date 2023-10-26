import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Routes:
import userRoutes from './routes/userRoutes.js'

// Create app:
const app = express();

// Middleware:
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('server is running');
})

app.use(notFound);
app.use(errorHandler);

export default app;