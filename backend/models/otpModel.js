import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    email: String,
    otp: String,
    expires_at: {
      type: Date,
      expires: 1,
    },
  },
  { timestamps: true }
);

export const OTP = mongoose.model("OTP", otpSchema);
