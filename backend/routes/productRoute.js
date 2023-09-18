import express from "express";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import {
  createProduct,
  getProductList,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", isAuth, isAdmin, createProduct);
productRouter.get("/", isAuth, getProductList);

export default productRouter;
