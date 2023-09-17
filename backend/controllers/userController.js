import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import mailer from "../helper/mailer.js";
import { OTP } from "../models/otpModel.js";

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

  const generatedOTP = Math.floor(100000 + Math.random() * 900000);
  const expirationTime = moment().add(5, "minutes").toDate();
  const user = await User.create({
    name: name,
    username: username,
    email: email,
    password: await bcrypt.hash(password, 12),
  });

  const Otp = new OTP({
    user_id: user._id,
    email: email,
    otp: await bcrypt.hash(generatedOTP.toString(), 12),
    expires_at: expirationTime,
  });

  await Otp.save();

  mailer({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verify your account",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a
              href=""
              style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"
            >
              ECOM
            </a>
          </div>
          <p style="font-size:1.1em">Hi, ${name}</p>
          <p>
            Thank you for choosing ECOM. Use the following OTP to complete
            your Sign Up procedures. OTP is valid for 5 minutes
          </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
            ${generatedOTP}
          </h2>
          <p style="font-size:0.9em;">
            Regards,
            <br />
            ECOM
          </p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
  });

  res.status(201).json({
    message:
      "Account created succefully. Please verify your account with OTP which is already sent to your mail",
  });
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;

  const generatedOTP = Math.floor(100000 + Math.random() * 900000);
  const expirationTime = moment().add(5, "minutes").toDate();

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({
      message: "No user found against this email",
    });
  }

  const Otp = new OTP({
    user_id: user._id,
    email: email,
    otp: await bcrypt.hash(generatedOTP.toString(), 12),
    expires_at: expirationTime,
  });

  await Otp.save();

  mailer({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Verify your account",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a
              href=""
              style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"
            >
              ECOM
            </a>
          </div>
          <p style="font-size:1.1em">Hi, ${user.name}</p>
          <p>
            Thank you for choosing ECOM. Use the following OTP to complete
            your Sign Up procedures. OTP is valid for 5 minutes
          </p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
            ${generatedOTP}
          </h2>
          <p style="font-size:0.9em;">
            Regards,
            <br />
            ECOM
          </p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
  });

  res.status(200).json({
    message: "OTP Sent successfully",
  });
};

export const verifyUser = async (req, res) => {
  const otp = await OTP.findOne({ email: req.body.email });
  const user = await User.findOne({ email: req.body.email });

  if (!otp) {
    return res.status(400).json({
      message: "OTP Expire. Please regenrate OTP.",
    });
  }

  if (bcrypt.compare(otp.otp, req.body.otp)) {
    user.is_email_varified = true;
    otp.otp = "";

    await user.save();

    return res.status(200).json({ message: "User verified succefully!" });
  }
  res.status(400).json({
    message: "Invalid Otp",
  });
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
      { user_id: user._id, is_admin: user.is_admin, email: user.email },
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

export const getUsersList = async (req, res) => {
  const { current_page, limit } = req.query;

  const users = await User.find({})
    .limit(limit * 1)
    .skip((current_page - 1) * limit)
    .sort({ createdAt: -1 });

  var isLastPage = true;
  const totalLength = users.length;

  if (totalLength == limit) {
    isLastPage = false;
  }

  res.status(200).json({
    users_list: users,
    is_last_page: isLastPage,
  });
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
