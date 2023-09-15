import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// .env path configration
dotenv.config({ path: "./.env" });

export const signup = async (req, res) => {
  const { name, username, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exist with " + email,
    });
  }

  const existingUsername = await User.findOne({ username: username });

  if (existingUsername) {
    return res.status(400).json({
      message: "username " + username + " already in use",
    });
  }

  const user = await User.create({
    name: name,
    username: username,
    email: email,
    password: await bcrypt.hash(password, 12),
  });

  res.status(201).json(user);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      message: "No user found with given email",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (isPasswordMatched) {
    const token = jwt.sign(
      { user_id: user._id, is_admin: user.is_admin },
      process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({
      user: user,
      token: token,
    });
  } else {
    return res.status(400).json({
      message: "Password does not matched",
    });
  }
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(400).json({
      message: "No user found with given id",
    });
  }

  res.status(200).json({
    user: user,
  });
};

export const updateIsAdmin = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({
      message: "No user found with given id",
    });
  }
  if (req.is_admin) {
    user.is_admin = req.body.is_admin;

    await user.save();

    return res.status(200).json({
      user: user,
    });
  } else {
    return res.status(401).json({
      message: "Only admin can edit user roles",
    });
  }
};
