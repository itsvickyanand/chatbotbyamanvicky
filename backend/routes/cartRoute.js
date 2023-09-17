import express from "express";
import { addToCart, getCartItems } from "../controllers/cartController.js";
import { isAuth } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", isAuth, addToCart);
cartRouter.get("/", isAuth, getCartItems);

export default cartRouter;
