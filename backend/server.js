import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import ProductRouter from "./routes/ProductRouter.js";
import cartRouter from "./routes/cartRouter.js";

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
app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
