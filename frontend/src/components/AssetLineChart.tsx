import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AssetLineChart: React.FC = () => {
  const data = [
    { month: 'Jan', assets: 50 },
    { month: 'Feb', assets: 70 },
    { month: 'Mar', assets: 120 },
    { month: 'Apr', assets: 150 },
    { month: 'May', assets: 180 },
    { month: 'Jun', assets: 200 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="assets" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AssetLineChart;
