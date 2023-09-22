import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const product = await Product.findById(product_id);

    let cart = await Cart.findOne({ user_id: req.user_id });

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

    console.log(existingItem, "existing items");
    var totalPrice = 0;
    if (existingItem) {
      existingItem.quantity += quantity;

      for (let i = 0; i < cart.items.length; i++) {
        const productPrice = await Product.findById(cart.items[i].product_id);

        totalPrice +=
          existingItem.product_id == productPrice.id
            ? Number(productPrice.price) * Number(quantity)
            : null;
      }

      cart.total_price += totalPrice;
    } else {
      console.log(product, "product ----");
      cart.items.push({
        product_id: product_id,
        quantity: quantity,
      });
      cart.total_price += Number(product.price) * Number(quantity);
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

export const removeCartItems = async (req, res) => {
  try {
    const { quantity, product_id } = req.body;
    const cart = await Cart.findOne({ user_id: req.user_id });
    if (!cart) {
      return res.status(400).json({
        message: "Cart not found",
      });
    }

    const product = await Product.findById(product_id);

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product_id == product_id
    );

    if (itemIndex !== -1) {
      const removedItem = cart.items[itemIndex];
      const removedProduct = await Product.findById(removedItem.product_id);
      const removedItemPrice = quantity * removedProduct.price;
      if (cart.items[itemIndex].quantity >= quantity) {
        if (cart.items[itemIndex].quantity > 1) {
          cart.items[itemIndex].quantity -= quantity;
          cart.total_price -= removedItemPrice;
        } else if (cart.items.length <= 1) {
          const cart = await Cart.deleteOne({ user_id: req.user_id });
          return res.status(200).json({ message: "Removed from cart" });
        } else {
          cart.items = [];
          cart.total_price -= removedItemPrice;
        }
      } else {
        return res
          .status(400)
          .json({
            message: "cart quantity should not be greter then given quantity",
          });
      }

      await cart.save();
    }

// delete cart when given quantity is equal to cart quantity

    res.status(200).json({ message: "test" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Some error while removing items from cart" });
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
