import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const clicksData = [
    { day: "Mon", Clicks: 500 },
    { day: "Tue", Clicks: 750 },
    { day: "Wed", Clicks: 1000 },
    { day: "Thu", Clicks: 850 },
    { day: "Fri", Clicks: 700 },
    { day: "Sat", Clicks: 400 },
    { day: "Sun", Clicks: 450 },
];

export function ClicksChart() {
    return (
        <div className="p-3">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                Daily Clicks Analysis
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={clicksData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="Clicks" fill="#A9A9A9" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
