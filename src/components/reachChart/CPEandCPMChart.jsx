import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const cpeCpmData = [
    { metric: "CPE", value: 63 },
    { metric: "CPM", value: 70 },
];

export function CpeCpmChart() {
    return (
        <div className="p-3">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                CPE & CPM Metrics
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={cpeCpmData}   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="metric" tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'var(--text)', fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4169E1"  barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
