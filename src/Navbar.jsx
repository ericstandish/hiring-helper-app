import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-10 ${scrollPosition > 0 ? "bg-teal-500 navbar-solid transition-all duration-300" : "bg-transparent navbar-transparent transition-all duration-300"} py-3`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center saira-1">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/favicon.ico" alt="favicon" className="h-20 mr-24" />
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="px-4 py-2 rounded-full bg-orange-500 text-white hover:text-orange-100 transition duration-300 ease-in-out focus:outline-none"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/ahptool"
                className="px-4 py-2 rounded-full bg-orange-500 text-white hover:text-orange-100 transition duration-300 ease-in-out focus:outline-none"
              >
                AHP Tool
              </Link>
            </li>
            <li>
              <Link
                to="/example"
                className="px-4 py-2 rounded-full bg-orange-500 text-white hover:text-orange-100 transition duration-300 ease-in-out focus:outline-none"
              >
                Example
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition duration-300 ease-in-out focus:outline-none">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
