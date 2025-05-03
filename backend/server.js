import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import ProductRouter from "./routes/ProductRouter.js";

dotenv.config();

const app = express();
connectDB();

//middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.use("/api/products", ProductRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
