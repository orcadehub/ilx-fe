import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const EngagementChart = ({ platformData = {} }) => {
  const chartData = Object.entries(platformData).map(([platform, data]) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    engagement: data.posts > 0 ? Math.round((data.likes + data.comments) / data.posts) : 0
  }));

  const fallbackData = [
    { platform: "Instagram", engagement: 52 },
    { platform: "Facebook", engagement: 45 },
    { platform: "YouTube", engagement: 38 },
    { platform: "Twitter", engagement: 28 }
  ];

  const displayData = chartData.length > 0 ? chartData : fallbackData;

  return (
    <div className="p-3">
      <h6 className=" mb-3 text-[var(--text)]">Platform Engagement</h6>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={displayData}
        >
          <XAxis
            dataKey="platform"
            tick={{ fill: 'var(--text)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={{ stroke: 'var(--border)' }}
          />
          <YAxis
            tick={{ fill: 'var(--text)', fontSize: 12 }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={{ stroke: 'var(--border)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text)'
            }}
          />
          <Area
            type="monotone"
            dataKey="engagement"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;