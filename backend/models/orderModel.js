import mongoose from "mongoose";

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Order model
export const Order = mongoose.model("Order", orderSchema);
