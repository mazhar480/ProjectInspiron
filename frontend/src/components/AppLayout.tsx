import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 text-white h-full p-6 space-y-6">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />
        
        {/* Content Section */}
        <main className="p-6 overflow-auto flex justify-center items-center">
          {/* Dynamically Render Child Routes */}
          <div className="w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
