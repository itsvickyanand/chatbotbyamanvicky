import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_email_varified: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: "",
    },
    cart: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    order_history: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
