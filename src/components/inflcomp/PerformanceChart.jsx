import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const PerformanceChart = ({ platformData = {} }) => {
  const chartData = Object.entries(platformData).map(([platform, data]) => ({
    name: platform.charAt(0).toUpperCase() + platform.slice(1),
    value: data.posts
  }));

  const fallbackData = [
    { name: "Instagram", value: 40 },
    { name: "Facebook", value: 30 },
    { name: "Twitter", value: 15 },
    { name: "YouTube", value: 15 },
  ];

  const data = chartData.length > 0 ? chartData : fallbackData;

  const colors = [
    "var(--primary)",
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
  ];

  return (
    <div className="p-3">
      <h6 className="mb-3 text-[var(--text)]">
        Content Performance by Platform
      </h6>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            labelLine={false}
            label={{ fontSize: 12 }}  
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend
            wrapperStyle={{
              color: 'var(--text)',
              fontSize: '10px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;