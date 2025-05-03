import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

mongoose.connect(mongoUri).then(() => {
  console.log(`server is connected to database`);
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
});
