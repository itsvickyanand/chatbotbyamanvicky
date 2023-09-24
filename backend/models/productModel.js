import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        name: String,
      },
    ],
    is_active: {
      type: Boolean,
      default: false,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
