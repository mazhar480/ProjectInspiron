// Topbar.tsx
import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

const Topbar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
      <div className="text-xl font-bold">Admin Dashboard</div>
      
      {/* Search bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
        />
        <div className="absolute top-3 right-3">
          <FaSearch className="text-white" />
        </div>
      </div>
      
      {/* Notifications and Profile */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <div className="relative">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <FaBell />
          </button>
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 text-center">3</span>
        </div>

        {/* Profile Icon and Dropdown */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="w-8 h-8 rounded-full text-gray-300" />
          <span>Admin</span>
          <div className="relative">
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <FaUserCircle />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg p-2">
              <ul>
                <li className="p-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer">Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
