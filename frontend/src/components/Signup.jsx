import React, { useState } from "react";
import { userBaseUrl } from "../apiUrl";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profile_image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData()

    try {
      const response = await axios({
        method: "post",
        url: `${userBaseUrl}/signup`,
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      if (response.status === 201) {
        console.log(response);
        toast.success("Signup Successfully. Please varify your account");
        secureLocalStorage.setItem("USER_EMAIL", formData.email);
        navigate("/verify-otp");
      }
    } catch (err) {
      if (err.response.status !== 500) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    }

    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-sgguest-bg flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-4/12 mt-10">
        <h2 className="text-2xl mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* email */}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* password  */}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Profile Photo */}
          <div className="mb-4">
            <label
              htmlFor="profile_image"
              className="block text-sm font-medium text-gray-600"
            >
              Profile Photo
            </label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Sign Up
            </button>
          </div>
          <p className="mt-2 text-right">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500">
              Sign In
            </a>
          </p>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default SignUp;
