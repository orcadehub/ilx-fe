import React, { useState, useRef } from "react";
import { Dropdown, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";

const defaultCampaigns = [
    {
        label: (
            <div>
                <div className="text-14" style={{ color: "var(--text)" }}>Instagram Campaign - Summer Collection <span className="text-12 text-[var(--mutedText)]">(Post)</span></div>
                <div className="text-12 text-[var(--mutedText)]">ORD-2025-001 • Apr 1, 2025 10:15 AM</div>
            </div>
        ),
        value: "ORD-2025-001",
    },
    {
        label: (
            <div>
                <div className="text-14" style={{ color: "var(--text)" }}>TikTok Product Launch - New Tech Gadget <span className="text-12 text-[var(--mutedText)]">(Reel)</span></div>
                <div className="text-12 text-[var(--mutedText)]">ORD-2025-002 • Apr 2, 2025 11:30 AM</div>
            </div>
        ),
        value: "ORD-2025-002",
    },
    {
        label: (
            <div>
                <div className="text-14" style={{ color: "var(--text)" }}>YouTube Review Series - Beauty Products <span className="text-12 text-[var(--mutedText)]">(Video)</span></div>
                <div className="text-12 text-[var(--mutedText)]">ORD-2025-003 • Apr 5, 2025 2:20 PM</div>
            </div>
        ),
        value: "ORD-2025-003",
    },
    {
        label: (
            <div>
                <div className="text-14" style={{ color: "var(--text)" }}>Instagram Story Series - Fashion Week <span className="text-12 text-[var(--mutedText)]">(Post)</span></div>
                <div className="text-12 text-[var(--mutedText)]">ORD-2025-004 • Apr 9, 2025 9:45 AM</div>
            </div>
        ),
        value: "ORD-2025-004",
    },
    {
        label: (
            <div>
                <div className="text-14" style={{ color: "var(--text)" }}>Multi-Platform Wellness Campaign <span className="text-12 text-[var(--mutedText)]">(Poll)</span></div>
                <div className="text-12 text-[var(--mutedText)]">ORD-2025-005 • Apr 12, 2025 4:00 PM</div>
            </div>
        ),
        value: "ORD-2025-005",
    },
];

const defaultPeriods = [
    { label: "Last 24 hours", value: "24h" },
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 3 months", value: "3m" },
    { label: "Last 6 months", value: "6m" },
    { label: "Last 12 months", value: "12m" },
];

export default function DualDropdown({
    campaigns = defaultCampaigns,
    periods = defaultPeriods,
    onCampaignChange,
    onPeriodChange,
    initialCampaign,
    initialPeriod,
}) {
    const [search, setSearch] = useState("");
    const [selectedCampaign, setSelectedCampaign] = useState(initialCampaign || campaigns[0].value);
    const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod || periods[0].value);
    const searchInputRef = useRef(null);

    const filteredCampaigns = campaigns.filter((c) => {
        // Try to match on visible text
        let text = "";
        if (typeof c.label === "string") text = c.label;
        else if (c.label && c.label.props && c.label.props.children && c.label.props.children[0]) {
            text = c.label.props.children[0].props.children[0] || "";
        }
        return text.toLowerCase().includes(search.toLowerCase());
    });

    const campaignMenu = (
        <div className="w-80 min-w-[320px]  bg-[var(--card)] p-0 rounded-xl shadow-lg">
            <div className="sticky top-0 z-10 bg-[var(--card)] px-3 pt-3 pb-2 border-b border-[var(--border)]">
                <Input
                    ref={searchInputRef}
                    placeholder="Search campaigns..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="placeholder:text-[var(--primary)] text-12 !bg-[var(--card)] !text-[var(--text)] border !border-[var(--border)] px-2 py-1 rounded"
                    // style={{ borderColor: "var(--border)" }}
                    allowClear
                />
            </div>
            <div className="max-h-60 overflow-y-auto px-2 py-2">
                {filteredCampaigns.map((c) => (
                    <div
                        key={c.value}
                        className={`rounded-lg cursor-pointer ${selectedCampaign === c.value ? 'bg-[var(--card)] text-white' : 'hover:bg-[var(--hover2)] text-[var(--text)]'} text-14 mb-1 px-3 py-2 flex flex-col`}
                        style={{ border: '1px solid var(--border)', fontWeight: selectedCampaign === c.value ? 600 : 400 }}
                        onClick={() => {
                            setSelectedCampaign(c.value);
                            onCampaignChange && onCampaignChange(c.value);
                        }}
                    >
                        {c.label}
                    </div>
                ))}
                {filteredCampaigns.length === 0 && (
                    <div className="text-center text-12 text-[var(--mutedText)] py-2">No campaigns found</div>
                )}
            </div>
        </div>
    );

    const periodMenu = (
        <div className="w-48 min-w-[180px] bg-[var(--card)] p-2 rounded-xl border !border-[var(--border)] shadow-lg">
            {periods.map((p) => (
                <div
                    key={p.value}
                    className={`rounded-lg cursor-pointer ${selectedCampaign === p.value ? 'bg-[var(--card)] text-white' : 'hover:bg-[var(--hover2)] text-[var(--text)]'} text-14 mb-1 px-3 py-2 flex flex-col`}
                    style={{ fontWeight: selectedCampaign === p.value ? 600 : 400 }}
                        onClick={() => {
                        setSelectedPeriod(p.value);
                        onPeriodChange && onPeriodChange(p.value);
                    }}
                >
                    {p.label}
                </div>
            ))}
        </div>
    );

    return (
        <div className="w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            {/* Left Dropdown */}
            <div className="w-full sm:w-[60%]">
                <Dropdown
                    overlay={campaignMenu}
                    trigger={["click"]}
                    placement="bottomLeft"
                    onOpenChange={open => {
                        if (open) setTimeout(() => searchInputRef.current?.focus(), 100);
                    }}
                >
                    <div className="w-full bg-[var(--card)] border !border-[var(--border)] rounded-xl px-4 py-2 flex items-center justify-between cursor-pointer text-14" style={{ minHeight: 48 }}>
                        <div className="truncate text-left">
                            {campaigns.find(c => c.value === selectedCampaign)?.label}
                        </div>
                        <DownOutlined className="ml-2 text-12 text-[var(--text)]" />
                    </div>
                </Dropdown>
            </div>
            {/* Right Dropdown */}
            <div className="w-full sm:w-[40%] sm:max-w-[220px] sm:ml-auto">
                <Dropdown overlay={periodMenu} trigger={["click"]} placement="bottomRight">
                    <div className="w-full bg-[var(--card)] border !border-[var(--border)] rounded-xl px-4 py-2 flex items-center justify-between cursor-pointer text-14" style={{ minHeight: 48 }}>
                        <span className="truncate text-left text-14 text-[var(--text)] ">
                            {periods.find(p => p.value === selectedPeriod)?.label}
                        </span>
                        <DownOutlined className="ml-2 text-12 text-[var(--text)] " />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}
