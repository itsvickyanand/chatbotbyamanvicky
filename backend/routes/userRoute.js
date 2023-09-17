import express from "express";
import {
  getUserById,
  updateIsAdmin,
  signin,
  signup,
  verifyUser,
  getUsersList,
  resendOtp,
} from "../controllers/userController.js";
import { isAdmin, isAuth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.patch("/verify", verifyUser);
userRouter.post("/signin", signin);
userRouter.post("/resend-otp", resendOtp);
userRouter.get("/", isAuth, getUsersList);
userRouter.get("/:id", isAuth, getUserById);
userRouter.patch("/:id", isAuth, isAdmin, updateIsAdmin);

export default userRouter;
