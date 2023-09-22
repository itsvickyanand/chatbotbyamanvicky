import express from "express";
import {
  createOrder,
  getOrders,
  handleOrderStatus,
} from "../controllers/orderController.js";
import { isAuth } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, createOrder);
orderRouter.patch("/status", isAuth, handleOrderStatus);
orderRouter.get("/", isAuth, getOrders)

export default orderRouter;
