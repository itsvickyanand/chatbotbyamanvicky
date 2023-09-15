import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category_code: {
    type: String,
    required: true,
    unique: true,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

export const Category = mongoose.model("Category", categorySchema);
