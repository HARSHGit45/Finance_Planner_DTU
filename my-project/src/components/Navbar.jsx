import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMenu, FiUser } from 'react-icons/fi';

const Dropdown = ({ items, isOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
      >
        {items.map((item, index) => (
          <Link key={index} to={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
            {item.title}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

const ProfileDropdown = ({ isOpen, onLogout }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full -right-12 mt-2 w-48 bg-[#fff3e0] rounded-lg shadow-lg py-2 z-50"
      >
        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</Link>
        <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Settings</Link>
        <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">
          Logout
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    console.log("User logged out"); // Replace with actual logout logic
  };

  return (
    <div className="bg-[#fff3e0]/60 py-2 fixed top-3 left-0 right-0 z-50 mx-4 md:mx-12 rounded-lg">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="text-black text-xl font-bold">FinancePro</Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/home">Dashboard</Link>
          <Link to="/insights">Insights</Link>
          <Link to="/tools">Tools</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4 relative">
          <Link to="/login" className="text-black hover:text-gray-700">Log In</Link>
          <Link to="/signup" className="bg-[#012c23] text-white px-4 py-2 rounded-lg hover:bg-[#0b5223]">Free Trial</Link>

          {/* Profile Section */}
          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2">
              <FiUser size={24} className="text-black" />
              <FiChevronDown className={`transition-transform ${profileOpen ? "rotate-180" : ""}`} />
            </button>
            <ProfileDropdown isOpen={profileOpen} onLogout={handleLogout} />
          </div>
        </div>

        <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white rounded-lg shadow-lg py-2 absolute top-full left-0 w-full text-center z-50"
          >
            <Link to="/home" className="block py-2">Dashboard</Link>
            <Link to="/insights" className="block py-2">Insights</Link>
            <Link to="/tools" className="block py-2">Tools</Link>
            <Link to="/login" className="block py-2">Log In</Link>
            <Link to="/signup" className="block py-2 bg-[#012c23] text-white rounded-lg mx-4">Free Trial</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
