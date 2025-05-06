import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";

import products from "./data/products.js";
import Product from "./models/productModel.js";
import CartItem from "./models/CartItemModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await CartItem.deleteMany();

    const insertedProducts = await Product.insertMany(products);

    const sampleCartItems = [
      {
        productId: insertedProducts[0]._id,
        quantity: 2,
      },
      {
        productId: insertedProducts[1]._id,
        quantity: 1,
      },
    ];

    await CartItem.insertMany(sampleCartItems);

    console.log("Products and cart items imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await CartItem.deleteMany();

    console.log("Products and cart items destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
