import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const lineData = [
    { month: "Jan", instagram: 1000, youtube: 900, facebook: 800, twitter: 600 },
    { month: "Feb", instagram: 1200, youtube: 950, facebook: 950, twitter: 700 },
    { month: "Mar", instagram: 1400, youtube: 1000, facebook: 1100, twitter: 800 },
    { month: "Apr", instagram: 1600, youtube: 1050, facebook: 1200, twitter: 900 },
    { month: "May", instagram: 1800, youtube: 1100, facebook: 1300, twitter: 950 },
    { month: "Jun", instagram: 2000, youtube: 1200, facebook: 1400, twitter: 1000 },
];

const barData = [
    { month: "Jan", clicks: 2500 },
    { month: "Feb", clicks: 3000 },
    { month: "Mar", clicks: 3500 },
    { month: "Apr", clicks: 3200 },
    { month: "May", clicks: 4000 },
];

const SocialAnalyticsCharts = () => {
    return (
        <div
            style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                background: "transparent",
                color: "#fff",
            }}
        >
            {/* Audience Growth Trajectory */}
            <div
                style={{
                    background: "var(--bgPage2)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--text)",
                    padding: "1rem",
                    flex: "1 1 45%",
                    minWidth: "300px",
                }}
            >
                <h3 className="text-14 font-bold text-[var(--text)]">
                    Audience Growth Trajectory
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111",
                                border: "1px solid #333",
                                color: "#fff",
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="instagram"
                            stroke="#f472b6"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#f472b6" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="youtube"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#ef4444" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="facebook"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#3b82f6" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="twitter"
                            stroke="#60a5fa"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#60a5fa" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Link Clicks by Month */}
            <div
                style={{
                    background: "var(--bgPage2)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--text)",
                    padding: "1rem",
                    flex: "1 1 45%",
                    minWidth: "300px",
                }}
            >
                <h3 className="text-14 font-bold text-[var(--text)]">
                    Link Clicks by Month
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="month" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#111",
                                border: "1px solid #333",
                                color: "#fff",
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="clicks"
                            fill="#a78bfa"
                            barSize={40}
                            name="Link Clicks"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SocialAnalyticsCharts;
