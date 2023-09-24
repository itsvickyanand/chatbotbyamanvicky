import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    post_office: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{6}$/.test(v);
        },
        message: "Invalid PIN code format for India",
      },
    },
    country: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
