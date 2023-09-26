import React from "react";
import Navbar from "./components/Navbar";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import VerifyOTP from "./components/VerifyWithOTP";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </>
  );
};

export default App;
