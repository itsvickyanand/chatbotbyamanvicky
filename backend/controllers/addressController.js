import { Address } from "../models/addressModel.js";

export const createAddress = async (req, res) => {
  const { village, post_office, district, state, pincode, country } = req.body;
  try {
    const address = await Address.create({
      user: req.user_id,
      village: village,
      post_office: post_office,
      district: district,
      state: state,
      pincode: pincode,
      country: country,
    });

    res.status(201).json({
      message: "Address created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAddressList = async (req, res) => {
  const { limit, current_page } = req.params;
  try {
    const addressLists = await Address.find({})
      .limit(limit * 1)
      .skip((current_page - 1) * limit);
  } catch (error) {}
};
