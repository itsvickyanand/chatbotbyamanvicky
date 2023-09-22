import express from "express";
import { addToCart, getCartItems, removeCartItems } from "../controllers/cartController.js";
import { isAuth } from "../middlewares/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", isAuth, addToCart);
cartRouter.post("/remove-cart-items", isAuth, removeCartItems)
cartRouter.get("/", isAuth, getCartItems);

export default cartRouter;
