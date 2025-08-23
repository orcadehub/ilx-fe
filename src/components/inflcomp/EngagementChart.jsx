import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const EngagementChart = () => {
  return (
    <div className="bg-white rounded-4 p-3 shadow-sm">
      <h6 className="fw-bold mb-3">Engagement Rate Over Time</h6>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={[
            { month: "Feb", rate: 52 },
            { month: "Mar", rate: 56 },
            { month: "Apr", rate: 59 },
            { month: "May", rate: 62 },
            { month: "Jun", rate: 65 },
          ]}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#4c75f2"
            fill="#aecbfa"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;