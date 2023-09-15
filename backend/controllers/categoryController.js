import { Category } from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  const { name, category_code, is_active } = req.body;

  const existingCategory = await Category.findOne({
    category_code: category_code,
  });

  if (existingCategory) {
    return res.status(400).json({
      message: "Category already exist with category code " + category_code,
    });
  }
  const category = await Category.create({
    name: name,
    category_code: category_code,
    is_active: is_active,
  });

  res.status(201).json({
    category: category,
  });
};

export const getCategoryList = async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    category_list: categories,
    is_last_page: true,
  });
};

export const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({
      message: "No category found with given id",
    });
  }

  res.status(200).json({
    category: category,
  });
};
