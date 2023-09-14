import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

export const Product = mongoose.model("Product", productSchema);
