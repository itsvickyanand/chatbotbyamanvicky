import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    let cart = await Cart.findOne({ user_id: req.user_id });
    const product = await Product.findById(product_id);

    if (!cart) {
      cart = new Cart({
        user_id: req.user_id,
        items: [],
        total_price: 0,
      });
    }

    // check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.product_id == product_id
    );

    console.log(existingItem);

    if (existingItem) {
      existingItem.quantity += quantity;
      cart.total_price += Number(product.price) * Number(quantity);
    } else {
      cart.items.push({
        product_id: product_id,
        quantity: quantity,
      });
      cart.total_price = Number(product.price) * Number(quantity);
    }

    await cart.save();

    res.status(201).json({
      message: "Items added to cart",
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the item to the cart" });
  }
};

export const getCartItems = async (req, res) => {
  const cartItems = await Cart.find({ user_id: req.user_id }).populate(
    "items.product_id"
  );

  if (!cartItems) {
    return res.status(400).json({
      message: "cart not found",
    });
  }

  res.status(200).json({
    cart_items: cartItems,
  });
};
