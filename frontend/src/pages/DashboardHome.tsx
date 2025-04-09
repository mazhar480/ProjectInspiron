import React from "react";
import KPICards from "../components/KPICards";
import AssetLineChart from "../components/AssetLineChart";
import AssetPieChart from "../components/AssetPieChart";
import AssetBarChart from "../components/AssetBarChart";

const DashboardHome: React.FC = () => {
  return (
    <div className="center-content max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      {/* KPI Cards Section */}
      <KPICards />

      {/* Charts Section with responsive grid layout */}
      <div className="grid-container mb-6">
        <div className="col-span-1">
          <AssetLineChart />
        </div>
        <div className="col-span-1">
          <AssetPieChart />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <AssetBarChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
