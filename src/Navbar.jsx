import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-teal-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/favicon.ico" alt="Your Logo" className="h-8 mr-4" />
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white hover:text-orange-100 transition duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/ahptool"
                className="text-white hover:text-orange-100 transition duration-300 ease-in-out"
              >
                AHP Tool
              </Link>
            </li>
            <li>
              <Link
                to="/example"
                className="text-white hover:text-orange-100 transition duration-300 ease-in-out"
              >
                Example
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button className="px-4 py-2 rounded-lg bg-white text-orange-500 hover:bg-orange-100 transition duration-300 ease-in-out focus:outline-none">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
