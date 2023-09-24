import { Category } from "../models/categoryModel.js";
import { Product } from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
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

    const imageArr = [];

    req.files.images.map((img) => imageArr.push({ name: img.filename }));
    console.log(imageArr);

    const product = await Product.create({
      name: name,
      description: description,
      slug: slug,
      price: price,
      images: imageArr,
      is_active: is_active,
      category_id: category_id,
      created_by: req.user_id,
    });

    res.status(201).json({
      product: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Some error while creating Products. Error is " + err,
    });
  }
};

export const getProductList = async (req, res) => {
  const { limit, current_page } = req.query;

  const product = await Product.find({})
    .limit(limit * 1)
    .skip((current_page - 1) * limit);

  var isLastPage = true;
  const totalLength = product.length;

  if (totalLength == limit) {
    isLastPage = false;
  }

  res.status(200).json({
    product_list: product,
    is_last_page: isLastPage,
  });
};

export const editProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      message: "Product edited successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Some error while product edit",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Some error while deleting Product",
    });
  }
};
