import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const engagementData = [
    { day: "Mon", Instagram: 2800, Facebook: 1400, Twitter: 600, YouTube: 1000 },
    { day: "Tue", Instagram: 3200, Facebook: 3000, Twitter: 800, YouTube: 1200 },
    { day: "Wed", Instagram: 4600, Facebook: 3500, Twitter: 1000, YouTube: 1400 },
    { day: "Thu", Instagram: 5900, Facebook: 4200, Twitter: 1300, YouTube: 1600 },
    { day: "Fri", Instagram: 5000, Facebook: 2800, Twitter: 1100, YouTube: 1300 },
    { day: "Sat", Instagram: 3600, Facebook: 2000, Twitter: 900, YouTube: 1000 },
    { day: "Sun", Instagram: 3300, Facebook: 1900, Twitter: 700, YouTube: 800 },
];
const Label = props => {
    const { x, y, value } = props;

    return (
        <text
            x={x}
            y={y}
            dx={"2%"}
            dy={"-1%"}
            fontSize="15"
            fontWeight="bold"
            fill={"#181818"}
            textAnchor="left"
        >
            {value}
        </text>
    );
};

export function EngagementChart() {
    return (
        <div className="p-3">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                Platform Engagement Comparison
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={engagementData}
                    label={<Label />}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="day"
                        tick={{ fill: 'var(--text)', fontSize: 12 }}
                        axisLine={{ stroke: 'var(--border)' }}
                        tickLine={{ stroke: 'var(--border)' }}
                    />
                    <YAxis tick={{ fill: 'var(--text)', fontSize: 12 }}
                        axisLine={{ stroke: 'var(--border)' }}
                        tickLine={{ stroke: 'var(--border)' }}
                    />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />

                    <Bar dataKey="Instagram" fill="#4169E1" />
                    <Bar dataKey="Facebook" fill="#8A2BE2" />
                    <Bar dataKey="Twitter" fill="#FF1493" />
                    <Bar dataKey="YouTube" fill="#00CED1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
