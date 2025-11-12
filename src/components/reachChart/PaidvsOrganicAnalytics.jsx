import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Label } from "recharts";

const paidVsOrganicData = [
    { name: "Paid", value: 85500, fill: "#4169E1" },
    { name: "Organic", value: 128500, fill: "#32CD32" },
];

const detailedPaidOrganic = [
    { name: "Paid Impressions", value: 45000, fill: "#6495ED" },
    { name: "Paid Reach", value: 32000, fill: "#1E90FF" },
    { name: "Paid Engagement", value: 8500, fill: "#4682B4" },
    { name: "Organic Impressions", value: 68000, fill: "#98FB98" },
    { name: "Organic Reach", value: 48000, fill: "#3CB371" },
    { name: "Organic Engagement", value: 12500, fill: "#2E8B57" },
];

export function PaidVsOrganicChart() {
    return (
        <div className="p-3">
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text)' }}>
                Paid vs Organic Analytics
            </h3>
            <div className='!h-full md:h-[280px]' style={{ display: 'flex', alignItems: 'center'  }}>
                {/* Chart on the left */}
                <div style={{ flex: '0 0 60%' }}>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={paidVsOrganicData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={70}
                                label={{ fontSize: 12 }}
                            >
                                {paidVsOrganicData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <Label
                                    value="Total Activity"
                                    position="centerBottom"
                                    fill="var(--text)"
                                    style={{ fontSize: 10, fontWeight: 400 }}
                                />
                                <Label
                                    value="25K"
                                    position="centerTop"
                                    fill="var(--text)"
                                    style={{ fontSize: 12, fontWeight: 600,marginTop: '4px' }}
                                />
                            </Pie>
                            <Pie
                                data={detailedPaidOrganic}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={100}
                                label={{ fontSize: 10 }}
                            >
                                {detailedPaidOrganic.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Information on the right */}
                <div style={{ flex: '0 0 40%', paddingLeft: '20px' }}>
                    <div style={{ marginBottom: '5px' }}>
                        <h4 className="text-12 !font-bold">
                            Overview
                        </h4>
                        {paidVsOrganicData.map((item, index) => (
                            <div key={index} className='flex items-center' >
                                <div className='!rounded-full' style={{ width: '8px', height: '8px', backgroundColor: item.fill, marginRight: '8px', borderRadius: '2px' }}></div>
                                <span style={{ fontSize: '12px', color: 'var(--text)' }}>
                                    {item.name}: {item.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 className="text-12 !font-bold">
                            Detailed Breakdown
                        </h4>
                        {detailedPaidOrganic.map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                                <div className='!rounded-full' style={{ width: '8px', height: '8px', backgroundColor: item.fill, marginRight: '8px', borderRadius: '2px' }}></div>
                                <span style={{ fontSize: '11px', color: 'var(--mutedText)' }}>
                                    {item.name}: {item.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
