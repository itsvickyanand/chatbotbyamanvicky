import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config({ path: "./.env" });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Token Required",
      });
    }

    token = token.split(" ")[1];

    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
    console.log(decodedToken);

    const user = await User.findById(decodedToken.user_id);

    if (!user) {
      return res.status(401).json({
        message: "invalid token",
      });
    }

    req.user_id = user._id;
    req.is_admin = user.is_admin;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized user",
    });
  }
};

export const isAdmin = (req, res, next) => {
   if(req.is_admin){
    next()
   }else{
    res.status(401).json({
        message: "unauthorized"
    })
   }
}
