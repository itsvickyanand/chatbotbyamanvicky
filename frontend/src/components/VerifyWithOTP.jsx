import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userBaseUrl } from "../apiUrl";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [resent, setResent] = useState(false);

  const handleOTPChange = (e) => {
    const value = e.target.value;
    // Ensure that the OTP contains only digits and is limited to 6 characters
    if (/^[0-9]{0,6}$/.test(value)) {
      setOTP(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length === 6) {
      try {
        const response = await axios({
          method: "patch",
          url: `${userBaseUrl}/verify`,
          data: JSON.stringify({
            email: secureLocalStorage.getItem("USER_EMAIL"),
            otp: otp,
          }),
          headers: {
            "Content-Type": `application/json`,
          },
        });

        if (response.status === 200) {
          console.log(response);
          toast.success("User verified Successfully");
          alert(response.data.message);
          navigate("/signin");
        }
      } catch (err) {
        console.log(err.response);
        if (err.response.status !== 500) {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        }
      }
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${userBaseUrl}/resend-otp`,
        data: JSON.stringify({
          email: secureLocalStorage.getItem("USER_EMAIL"),
        }),
        headers: {
          "Content-Type": `application/json`,
        },
      });

      if (response.status === 200) {
        toast.success("OTP sent succeffully");
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.status !== 500) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6">Verify Your Account</h2>
        <form onSubmit={handleSubmit}>
          {/* OTP Input */}
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-600"
            >
              Enter OTP (6 digits)
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOTPChange}
              maxLength="6"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Verify
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Resend OTP
            </button>
          </div>

          {/* Message */}
          {message && (
            <div className="text-red-500 text-sm mb-2">{message}</div>
          )}
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default VerifyOTP;
