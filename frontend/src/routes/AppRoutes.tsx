// AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import DashboardHome from "../modules/Dashboard/DashboardHome";
import AdminSettings from "../modules/AssetManagement/AdminSettings";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="settings" element={<AdminSettings />} />
        {/* Add more routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
