import express from "express";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProductList,
} from "../controllers/productController.js";
import upload from "../helper/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  upload.fields([{ name: "images", maxCount: 5 }]),
  createProduct
);
productRouter.get("/", isAuth, isAdmin, getProductList);
productRouter.put("/:id", isAuth, isAdmin, editProduct);
productRouter.delete("/:id", isAuth, isAdmin, deleteProduct);

export default productRouter;
