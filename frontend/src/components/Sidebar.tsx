import React, { useState } from "react";
import { FaTachometerAlt, FaCogs, FaUsers, FaChartBar, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 rounded-md bg-gray-700 hover:bg-gray-600"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className={`md:block ${isOpen ? "block" : "hidden"} md:w-64 bg-gray-800 text-white p-6 space-y-6`}>
        <div className="text-2xl font-bold text-blue-500">Brand</div>
        <ul>
          <li>
            <Link to="/dashboard" className="flex items-center py-3 text-lg hover:bg-gray-700 rounded transition duration-200">
              <FaTachometerAlt className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center py-3 text-lg hover:bg-gray-700 rounded transition duration-200">
              <FaCogs className="mr-3" /> Settings
            </Link>
          </li>
          <li>
            <Link to="/assets" className="flex items-center py-3 text-lg hover:bg-gray-700 rounded transition duration-200">
              <FaUsers className="mr-3" /> Assets
            </Link>
          </li>
          <li>
            <Link to="/reports" className="flex items-center py-3 text-lg hover:bg-gray-700 rounded transition duration-200">
              <FaChartBar className="mr-3" /> Reports
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
