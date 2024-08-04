import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/authService';
import { FaCaretDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-blue-500">
      <div className="flex items-center space-x-6">
        <div className="text-white text-2xl font-bold">Eldar</div>
        {user && user.role === 'ADMIN' && (
          <>
            <Link to="/tasks" className="text-white text-lg hover:text-gray-300">
              Tasks
            </Link>
            <Link to="/admin" className="text-white text-lg hover:text-gray-300">
              Users
            </Link>
          </>
        )}
      </div>
      {user && (
        <div className="relative">
          <button
            className="text-white focus:outline-none flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>Welcome, {user.name}</span>
            <FaCaretDown className={`ml-2 transition-all ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
