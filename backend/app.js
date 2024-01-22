import express from "express";
// import path from 'path';
import cors from 'cors';
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Routes:
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

// Create app:
const app = express();

// Middleware:
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// if (process.env.NODE_ENV === 'production') {
//   console.log('Yep ok')
//   const __dirname = path.resolve();
//   app.use(express.static(path.join(__dirname, 'frontend/dist')));

//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
// } else {
//   app.get('/', (req, res) => {
//     console.log("Ok then")
//     res.send('server is running');
//   })
// }


app.use(notFound);
app.use(errorHandler);

export default app;