import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const demographicsData = [
    { name: "18-24", value: 35, fill: "#4169E1" },
    { name: "25-34", value: 40, fill: "#8A2BE2" },
    { name: "35-44", value: 15, fill: "#FF1493" },
    { name: "45-54", value: 7, fill: "#00CED1" },
    { name: "55+", value: 3, fill: "#FFD700" },
];

export function DemographicsChart() {
    return (
        <div className="p-3">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                Audience Demographics
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Pie
                        data={demographicsData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={{ fontSize: 12 }}
                        labelLine={false}
                    >
                        {demographicsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
