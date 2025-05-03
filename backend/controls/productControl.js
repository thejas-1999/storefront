import Product from "../models/ProductModel.js";

// @desc    Get all products with optional sorting
// @route   GET /api/products?sort=priceAsc|priceDesc|nameAsc|nameDesc
// @access  Public
const getProducts = async (req, res) => {
  try {
    let sortOption = {};

    switch (req.query.sort) {
      case "priceAsc":
        sortOption = { price: 1 };
        break;
      case "priceDesc":
        sortOption = { price: -1 };
        break;
      case "nameAsc":
        sortOption = { name: 1 };
        break;
      case "nameDesc":
        sortOption = { name: -1 };
        break;
    }

    const products = await Product.find().sort(sortOption);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    // Handles invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

export { getProducts, getProductById };
