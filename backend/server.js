import express from "express";
import morgan from "morgan";
const port = 4444;

const app = express();

app.use(morgan('dev'));

app.listen(port, () => console.log(`Server started on port ${port}`));
