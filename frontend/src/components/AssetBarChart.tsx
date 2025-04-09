import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AssetBarChart: React.FC = () => {
  const data = [
    { department: 'HR', count: 50 },
    { department: 'Finance', count: 40 },
    { department: 'IT', count: 60 },
    { department: 'Admin', count: 70 },
    { department: 'Sales', count: 80 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="department" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AssetBarChart;
