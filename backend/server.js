import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();
connectDB();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
