import { Order } from "../models/orderModel.js";
import { Product } from "../models/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    const product = await Product.findById(product_id);
    console.log(product);

    const order = await Order.create({
      user: req.user_id,
      products: [
        {
          product: product_id,
          quantity: 1,
        },
      ],
      totalAmount: product.price * quantity,
    });

    res.status(201).json({
      message: "Order created successfully.",
      data: {
        orderNumber: order._id,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { limit, current_page } = req.query;
    const orderList = await Order.find({}).populate("products.product")
      .limit(limit * 1)
      .skip((current_page - 1) * limit);

    var isLastPage = true;
    const totalLength = orderList.length;

    if (totalLength == limit) {
      isLastPage = false;
    }

    res.status(200).json({
      orders_list: orderList,
      is_last_page: isLastPage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const handleOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;
    const order = await Order.findById(order_id);

    if (status == "confirmed") {
      return res.status(400).json({
        message: "You cannot confirm your order",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status changed to " + status + " successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};