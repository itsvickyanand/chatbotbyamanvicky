import express from "express";
import {
  getUserById,
  updateIsAdmin,
  signin,
  signup,
} from "../controllers/userController.js";
import { isAdmin, isAuth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/:id", isAuth, getUserById);
userRouter.patch("/:id", isAuth, isAdmin, updateIsAdmin);

export default userRouter;
