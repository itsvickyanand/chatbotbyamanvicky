import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo or website name */}
          <Link to="/" className="text-white text-xl font-semibold">
            YourLogo
          </Link>
        </div>

        {/* Hamburger menu button (visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl focus:outline-none"
          >
            {isOpen ? "X" : "☰"}
          </button>
        </div>

        {/* Navigation menu (visible on medium and larger screens) */}
        <div className={`md:flex space-x-4 ${isOpen ? "block" : "hidden"}`}>
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/products" className="text-white hover:underline">
            Products
          </Link>
          <Link to="/category" className="text-white hover:underline">
            Category
          </Link>
          <div className="relative">
            {/* Profile icon */}
            <button
              onClick={() => alert("Profile icon clicked")}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
