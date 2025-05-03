import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  label: String,
  value: String,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mainImage: { type: String, required: true },
  images: [String],
  description: { type: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, default: 0 },
  specifications: [specificationSchema],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
