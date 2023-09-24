import express from "express";
import { createAddress } from "../controllers/addressController.js";
import { isAuth } from "../middlewares/auth.js";

const addressRouter = express.Router();

addressRouter.post("/", isAuth, createAddress);

export default addressRouter;
