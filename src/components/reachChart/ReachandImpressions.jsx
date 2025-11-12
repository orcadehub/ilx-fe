import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const reachImpressionsData = [
    { day: "Mon", Instagram: 6000, Facebook: 3000, Twitter: 2000, YouTube: 1500 },
    { day: "Tue", Instagram: 9000, Facebook: 5000, Twitter: 3000, YouTube: 2500 },
    { day: "Wed", Instagram: 12000, Facebook: 7000, Twitter: 3500, YouTube: 3000 },
    { day: "Thu", Instagram: 15000, Facebook: 8500, Twitter: 4000, YouTube: 3500 },
    { day: "Fri", Instagram: 14000, Facebook: 8000, Twitter: 3500, YouTube: 3200 },
    { day: "Sat", Instagram: 11000, Facebook: 6500, Twitter: 2800, YouTube: 2500 },
    { day: "Sun", Instagram: 10000, Facebook: 6000, Twitter: 2500, YouTube: 2300 },
];

export function ReachImpressionsChart() {
    return (
        <div className="p-3">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                Reach & Impressions Analysis
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={reachImpressionsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Area type="monotone" dataKey="Instagram" stackId="1" stroke="#4169E1" fill="#4169E1" />
                    <Area type="monotone" dataKey="Facebook" stackId="1" stroke="#8A2BE2" fill="#8A2BE2" />
                    <Area type="monotone" dataKey="Twitter" stackId="1" stroke="#FF1493" fill="#FF1493" />
                    <Area type="monotone" dataKey="YouTube" stackId="1" stroke="#00CED1" fill="#00CED1" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
