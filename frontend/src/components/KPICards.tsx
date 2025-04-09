// KPICards.tsx
import React from "react";
import { FaBox, FaExclamationTriangle, FaTools, FaDollarSign } from "react-icons/fa";

const KPICards: React.FC = () => {
  const kpiData = [
    { title: "Total Assets", value: 123, icon: <FaBox className="text-3xl" /> },
    { title: "Active Incidents", value: 15, icon: <FaExclamationTriangle className="text-3xl" /> },
    { title: "Inventory Items", value: 200, icon: <FaTools className="text-3xl" /> },
    { title: "Total Value", value: "$1,500,000", icon: <FaDollarSign className="text-3xl" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out flex justify-center items-center"
        >
          <div className="flex items-center justify-between">
            <div>{kpi.icon}</div>
            <div className="text-right">
              <h4 className="font-semibold">{kpi.title}</h4>
              <p className="text-2xl">{kpi.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
