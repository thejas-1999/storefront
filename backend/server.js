import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Import this to get the current file's path

import connectDB from "./config/db.js";
import ProductRouter from "./routes/ProductRouter.js";
import cartRouter from "./routes/cartRouter.js";

dotenv.config();

const app = express();
connectDB();

// Get the current directory of the module (to replace __dirname in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend build directory
if (process.env.NODE_ENV === "production") {
  // Serve the frontend build files
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  // Serve index.html for all routes (for React Router)
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.use("/api/products", ProductRouter);
app.use("/api/cart", cartRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
