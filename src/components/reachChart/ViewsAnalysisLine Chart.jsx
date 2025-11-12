import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const reachViewsData = [
    { day: "Mon", Reach: 14000, Views: 26000 },
    { day: "Tue", Reach: 15000, Views: 29000 },
    { day: "Wed", Reach: 18000, Views: 34000 },
    { day: "Thu", Reach: 20000, Views: 42000 },
    { day: "Fri", Reach: 17800, Views: 38000 },
    { day: "Sat", Reach: 15000, Views: 33000 },
    { day: "Sun", Reach: 14500, Views: 30000 },
];

export function ReachVsViewsChart() {
    return (
        <div className="p-3">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                Reach vs Views Trend Analysis
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <LineChart data={reachViewsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="Reach" stroke="#4169E1" strokeWidth={2} />
                    <Line type="monotone" dataKey="Views" stroke="#FFD700" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
