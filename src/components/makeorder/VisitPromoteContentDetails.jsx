
import React from "react";
import { Collapse, DatePicker, Select, Input, Switch } from "antd";
import { ClockCircleOutlined, EnvironmentOutlined, GiftOutlined, FileTextOutlined, UserOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { TextArea } = Input;

const VisitPromoteContentDetails = () => (
    <div className="my-4">
        <div className="rounded-xl bg-[var(--bgPage2)] border !border-[var(--border)] p-6 mb-6">
            <h3 className="!text-[20px] md:text-[20px] !font-bold mb-1 text-[var(--text)] text-center">Visit & Promote Content Details</h3>
            <div className="text-[var(--mutedText)] mb-2 text-[15px] text-center">Complete the details below for your visit and promotion requirements</div>
            <style>{`
                        .ant-select-selector, .ant-picker, .ant-input, .ant-input-affix-wrapper, .ant-input-textarea {
                            background: var(--bgPage2) !important;
                            color: var(--text) !important;
                            border-color: var(--border) !important;
                        }
                        .ant-select-arrow {
                            color: var(--text) !important;
                        }
                        .ant-select-dropdown {
                            background: var(--bgPage2) !important;
                            color: var(--text) !important;
                        }
                        .ant-select-item-option-content {
                            color: var(--text) !important;
                        }
                        .ant-collapse-header {
                            color: var(--text) !important;
                            font-weight: 600;
                            border-bottom: none !important;
                        }
                        .ant-switch {
                            background: var(--border) !important;
                        }
                        .ant-switch-checked {
                            background: #6c63ff !important;
                        }
                        .ant-input::placeholder, .ant-input-textarea::placeholder {
                            color: var(--mutedText) !important;
                            opacity: 1 !important;
                        }
                        /* Remove all panel borders, including open panel bottom border */
                        .ant-collapse > .ant-collapse-item {
                            border-top: none !important;
                            border-bottom: none !important;
                        }
                        .ant-collapse > .ant-collapse-item.ant-collapse-item-active {
                            border-bottom: none !important;
                        }
                        .ant-collapse > .ant-collapse-item:last-child {
                            border-bottom: none !important;
                        }
                        .ant-collapse-header {
                            border-radius: 12px;
                            border: none;
                        }
                    `}</style>
        </div>
        <Collapse
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            className="mb-4 border-0"
            style={{ background: "transparent" }}
        >
            {/* 1. Basic Info */}
            <Panel header={<span className="text-[var(--text)] !border-0 ">
                <ClockCircleOutlined className="mr-2" />1. Basic Info</span>} key="1">
                <div className="flex flex-col md:flex-row gap-6 !bg-[var(--bgPage2)] ">
                    <div className="flex-1">
                        <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Preferred Visit Dates</label>
                        <DatePicker.RangePicker className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Preferred Time Slot</label>
                        <Select defaultValue="Flexible" className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" dropdownStyle={{ background: 'var(--bgPage2)', color: 'var(--text)' }}>
                            <Select.Option value="Flexible">Flexible</Select.Option>
                            <Select.Option value="Morning">Morning</Select.Option>
                            <Select.Option value="Afternoon">Afternoon</Select.Option>
                            <Select.Option value="Evening">Evening</Select.Option>
                        </Select>
                    </div>
                </div>
            </Panel>
            {/* 2. Visit Location */}
            <Panel header={<span className="text-[var(--text)]"><EnvironmentOutlined className="mr-2" />2. Visit Location</span>} key="2">
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Venue Name</label>
                    <Input className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="e.g., Trendy Fashion Boutique" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Full Address</label>
                    <TextArea rows={2} className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="Complete address with pincode" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Landmark & Nearby Transit Info (Optional)</label>
                    <Input className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="e.g., Near Central Mall, Metro Station 5 min walk" />
                </div>
                <div className="text-xs text-[var(--mutedText)] bg-[var(--bgPage2)] border border-[var(--border)] rounded p-2">
                    <span className="font-semibold">Tip:</span> Ensure address is accurate and include COVID safety protocols or ID verification requirements if applicable
                </div>
            </Panel>
            {/* 3. Offers & Facilities for Influencer */}
            <Panel header={<span className="text-[var(--text)]"><GiftOutlined className="mr-2" />3. Offers & Facilities for Influencer</span>} key="3">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[var(--text)] text-[15px]">Travel Reimbursement</span>
                        <Switch className="mr-2" />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[var(--text)] text-[15px]">Food/Refreshments Provided</span>
                        <Switch className="mr-2" />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[var(--text)] text-[15px]">Stay Provided (if outstation)</span>
                        <Switch className="mr-2" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Any Gifts, Coupons or Vouchers? (Optional)</label>
                        <Input className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="e.g., Free products worth ₹2000, Discount coupons" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Other Perks</label>
                        <Input className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="e.g., Free Products, Partner Collaborations" />
                    </div>
                </div>
            </Panel>
            {/* 4. Content Expectations */}
            <Panel header={<span className="text-[var(--text)]"><FileTextOutlined className="mr-2" />4. Content Expectations</span>} key="4">
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Brief Description</label>
                    <TextArea rows={3} className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="e.g., Shoot product demo inside the store, post 2 stories tagging us" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Hashtags to Use</label>
                    <Input className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="e.g., #BrandName #Fashion #NewCollection" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Handles to Tag</label>
                    <Input className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="e.g., @brandname @storename" />
                </div>
            </Panel>
            {/* 5. Notes & Instructions */}
            <Panel header={<span className="text-[var(--text)]"><UserOutlined className="mr-2" />5. Notes & Instructions</span>} key="5">
                <div className="mb-4">
                    <label className="block mb-1 font-semibold text-[var(--text)] text-[15px]">Special Guidelines, Dress Code, Dos & Don'ts</label>
                    <TextArea rows={3} className="w-full !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)]" placeholder="Any specific instructions, dress code, or guidelines for the visit" />
                </div>
            </Panel>
        </Collapse>
    </div>
);

export default VisitPromoteContentDetails;
