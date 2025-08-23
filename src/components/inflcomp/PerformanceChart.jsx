import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const PerformanceChart = () => {
  return (
    <div className="bg-white rounded-4 p-3 shadow-sm">
      <h6 className="fw-bold mb-3">
        Content Performance by Platform
      </h6>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={[
              { name: "Instagram", value: 40 },
              { name: "Facebook", value: 30 },
              { name: "Twitter", value: 15 },
              { name: "YouTube", value: 15 },
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            label
          >
            <Cell fill="#4c75f2" />
            <Cell fill="#90ee90" />
            <Cell fill="#ffa500" />
            <Cell fill="#ffcccb" />
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;