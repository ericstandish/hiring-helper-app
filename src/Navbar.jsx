import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <nav className={`fixed top-0 w-full z-10 ${scrollPosition > 0 ? "bg-teal-400 navbar-solid transition-all duration-300" : "bg-transparent navbar-transparent transition-all duration-300"} py-3`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center saira-1">
        <div className="flex items-center">
          <Link to="/" onClick={handleLinkClick} className="flex items-center">
            <img src="/favicon.ico" alt="favicon" className="h-12 md:h-20 mr-4 md:mr-24" />
          </Link>
          <ul className="flex space-x-2 md:space-x-4"> {/* Reduced space between items for mobile view */}
            <li>
              <Link
                to="/"
                onClick={() => { handleLinkClick(); navigate('/'); }}
                className="px-2 py-1 md:px-4 md:py-2 rounded-full bg-orange-500 text-white hover:text-orange-100 transition duration-300 ease-in-out focus:outline-none text-sm md:text-base">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/ahptool"
                onClick={() => { handleLinkClick(); navigate('/ahptool'); }}
                className="px-2 py-1 md:px-4 md:py-2 rounded-full bg-orange-500 text-white hover:text-orange-100 transition duration-300 ease-in-out focus:outline-none text-sm md:text-base">
                AHP Tool
              </Link>
            </li>
            <li>
              <Link
                to="/example"
                onClick={() => { handleLinkClick(); navigate('/example'); }}
                className="px-2 py-1 md:px-4 md:py-2 rounded-full bg-orange-500 text-white hover:text-orange-100 transition duration-300 ease-in-out focus:outline-none text-sm md:text-base">
                Example
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;