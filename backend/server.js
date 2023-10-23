import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

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

app.listen(port, () => console.log(`Server started on port ${port}`));
