import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className="text-white hover:text-gray-300 mr-4">
              Home
            </Link>
          </li>
          <li>
            <Link to="/example" className="text-white hover:text-gray-300">
              Example
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
