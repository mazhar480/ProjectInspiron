import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import DashboardHome from "./pages/DashboardHome";
import AdminSettings from "./modules/AssetManagement/AdminSettings";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Default Route: Redirect to /dashboard */}
          <Route index element={<DashboardHome />} /> {/* Default route for '/' */}
          
          {/* Regular Routes */}
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/settings" element={<AdminSettings />} />
          
          {/* Add other routes here */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
