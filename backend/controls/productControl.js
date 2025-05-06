import Product from "../models/productModel.js";

// @desc    Get all products with optional sorting and pagination
// @route   GET /api/products?sort=priceAsc|priceDesc|nameAsc|nameDesc&page=1&limit=3
// @access  Public
const getProducts = async (req, res) => {
  try {
    let sortOption = {};
    const { sort, page = 1, limit = 3 } = req.query;

    // Set sorting options based on the query
    switch (sort) {
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
      default:
        sortOption = {};
    }

    // Calculate the number of products to skip based on the page number
    const skip = (page - 1) * limit;

    // Get products with pagination and sorting
    const products = await Product.find()
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));
    // Count the total number of products for pagination
    const totalProducts = await Product.countDocuments();

    // Send the paginated products and the total number of products
    res.json({
      products,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
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
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

export { getProducts, getProductById };
