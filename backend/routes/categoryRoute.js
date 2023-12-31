import express from "express";
import {
  createCategory,
  getCategoryById,
  getCategoryList,
  updateCategoryIsActive,
} from "../controllers/categoryController.js";
import { isAdmin, isAuth } from "../middlewares/auth.js";

const categoryRouter = express.Router();

categoryRouter.post("/", isAuth, isAdmin, createCategory);
categoryRouter.get("/", isAuth, getCategoryList);
categoryRouter.get("/:id", isAuth, getCategoryById);
categoryRouter.patch("/:id", isAuth, isAdmin, updateCategoryIsActive);

export default categoryRouter;
