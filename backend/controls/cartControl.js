import CartItem from "../models/cartModel.js";
import Product from "../models/productModel.js";

// @desc Add or update a cart item
// @route POST /api/cart
// @access Public
const addOrUpdateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Invalid productId or quantity" });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the quantity is greater than the available stock
    if (quantity > product.countInStock) {
      return res.status(400).json({
        message: `Only ${product.countInStock} units are available in stock`,
      });
    }

    let cartItem = await CartItem.findOne({ productId });

    if (cartItem) {
      // If product exists in the cart, update quantity
      cartItem.quantity = quantity;

      // Decrease the product stock by the quantity added to the cart
      product.countInStock -= quantity;

      await cartItem.save();
      await product.save();
    } else {
      // If product doesn't exist in the cart, add new cart item
      cartItem = await CartItem.create({ productId, quantity });

      // Decrease the product stock by the quantity added to the cart
      product.countInStock -= quantity;

      await product.save();
    }

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get all cart items
// @route GET /api/cart
// @access Public
const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("productId");
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { addOrUpdateCartItem, getCart };
