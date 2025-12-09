import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} BricolApp. All rights reserved.
        </div>

        {/* Right side links */}
        <div className="flex space-x-4">
          <Link to="/about" className="text-blue-500 hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/contact" className="text-orange-500 hover:text-orange-600 transition">
            Contact
          </Link>
          <Link to="/privacy" className="text-gray-500 hover:text-gray-700 transition">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
