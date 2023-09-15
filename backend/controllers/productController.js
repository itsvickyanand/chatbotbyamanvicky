import { Category } from "../models/categoryModel.js";
import { Product } from "../models/productModel.js";

export const createProduct = async (req, res) => {
  const { name, description, slug, price, is_active, category_id } = req.body;

  const existingProduct = await Product.findOne({
    slug: slug,
  });

  if (existingProduct) {
    return res.status(400).json({
      message: "Product already exist with slug " + slug,
    });
  }

  // check category id exist or not

  const existingCategory = await Category.findOne({ _id: category_id });

  if (!existingCategory) {
    return res.status(400).json({
      message: "No category found with given category id",
    });
  }

  const product = await Product.create({
    name: name,
    description: description,
    slug: slug,
    price: price,
    is_active: is_active,
    category_id: category_id,
    created_by: req.user_id,
  });

  res.status(201).json({
    product: product,
  });
};
