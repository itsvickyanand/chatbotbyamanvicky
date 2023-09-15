import express from "express";
import { isAdmin, isAuth } from "../middlewares/auth.js";
import { createProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", isAuth, isAdmin ,createProduct);

export default productRouter;
