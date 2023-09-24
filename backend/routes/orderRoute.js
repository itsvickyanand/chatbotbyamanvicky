import express from "express";
import {
  createOrder,
  getOrders,
  getOrdersForUser,
  handleOrderStatus,
} from "../controllers/orderController.js";
import { isAdmin, isAuth } from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, createOrder);
orderRouter.patch("/status", isAuth, handleOrderStatus);
orderRouter.get("/user-order", isAuth, getOrdersForUser);
orderRouter.get("/", isAuth, isAdmin, getOrders);

export default orderRouter;
