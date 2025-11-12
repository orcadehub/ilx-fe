import React from "react";
import { Collapse, Input, Button } from "antd";
import { FileTextOutlined, DeleteOutlined, PlusOutlined, DownOutlined } from "@ant-design/icons";

const MAX_POLLS = 3;
const MAX_OPTIONS = 4;

const defaultPoll = () => ({
    question: "",
    options: ["", ""]
});

import { useEffect } from "react";
import { Trash } from "lucide-react";

const PollContentBuilder = ({ polls, setPolls }) => {
    // Ensure at least one poll is present on mount
    useEffect(() => {
        if (!polls || polls.length === 0) {
            setPolls([defaultPoll()]);
        }
        // eslint-disable-next-line
    }, []);
    // Add poll
    const addPoll = () => {
        if (polls.length < MAX_POLLS) {
            setPolls([...polls, defaultPoll()]);
        }
    };

    // Remove poll (cannot remove last poll)
    const removePoll = (idx) => {
        if (polls.length > 1) {
            setPolls(polls.filter((_, i) => i !== idx));
        }
    };

    // Update poll
    const updatePoll = (idx, value) => {
        setPolls(polls.map((p, i) => (i === idx ? { ...p, ...value } : p)));
    };

    // Update option
    const updateOption = (pollIdx, optIdx, value) => {
        setPolls(
            polls.map((p, i) =>
                i === pollIdx
                    ? { ...p, options: p.options.map((o, j) => (j === optIdx ? value : o)) }
                    : p
            )
        );
    };

    // Add option
    const addOption = (pollIdx) => {
        setPolls(
            polls.map((p, i) =>
                i === pollIdx && p.options.length < MAX_OPTIONS
                    ? { ...p, options: [...p.options, ""] }
                    : p
            )
        );
    };

    // Remove option
    const removeOption = (pollIdx, optIdx) => {
        setPolls(
            polls.map((p, i) =>
                i === pollIdx && p.options.length > 2
                    ? { ...p, options: p.options.filter((_, j) => j !== optIdx) }
                    : p
            )
        );
    };

    return (
        <div className="my-4">
            <div className="rounded-xl bg-[var(--card)] border !border-[var(--border)] p-6 mb-6 flex items-center justify-center">
                <div className="flex flex-col justify-center items-center">
                    <h4 className="text-sm font-semibold mb-1">
                        <FileTextOutlined className="mr-2 text-xl" />Poll Content for Twitter
                    </h4>
                    <div className="text-[var(--mutedText)] text-center">Create up to 3 poll questions with up to 4 options each</div>
                </div>
            </div>
            <Collapse
                accordion={false}
                expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} style={{ color: 'var(--primary)' }} />}
                bordered={false}
                className="custom-poll-collapse"
                defaultActiveKey={[0]}
            >
                {polls.map((poll, idx) => (
                    <Collapse.Panel
                        header={<span className="poll-label">Poll {idx + 1}</span>}
                        key={idx}
                        extra={
                            polls.length > 1 ? (
                                <span className="remove-poll-btn" onClick={e => { e.stopPropagation(); removePoll(idx); }}>
                                    <Trash className="text-red-500" size={16} /> <span className="text-red-500 font-normal">Remove</span>
                                </span>
                            ) : null
                        }
                    >
                        <div className="poll-question-block">
                            <label className="poll-q-label">Question</label>
                            <Input
                                className="poll-q-input"
                                maxLength={150}
                                value={poll.question}
                                onChange={e => updatePoll(idx, { question: e.target.value })}
                                placeholder="Enter your poll question (max 150 chars)"
                            />
                            <div className="poll-options-block">
                                {poll.options.map((opt, optIdx) => (
                                    <div className="poll-option-row" key={optIdx}>
                                        <Input
                                            className="poll-opt-input"
                                            maxLength={60}
                                            value={opt}
                                            onChange={e => updateOption(idx, optIdx, e.target.value)}
                                            placeholder={`Option ${optIdx + 1}`}
                                        />
                                        {poll.options.length > 2 && (
                                            <button
                                                className="remove-opt-btn"
                                                type="button"
                                                onClick={() => removeOption(idx, optIdx)}
                                            >
                                                <Trash className="text-red-500" size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {poll.options.length < MAX_OPTIONS && (
                                    <button className="add-opt-btn" type="button" onClick={() => addOption(idx)}>
                                        <PlusOutlined /> Add Option
                                    </button>
                                )}
                            </div>
                        </div>
                    </Collapse.Panel>
                ))}
            </Collapse>
            {polls.length < MAX_POLLS && (
                <div className="!flex !justify-center items-center">
                    <button className="!flex !justify-center items-center text-[var(--text)] border-2 w-full py-2 border-dashed !border-[var(--border)] !rounded-xl" onClick={addPoll}>
                        <PlusOutlined /> Add Another Question ({polls.length + 1}/3)
                    </button>
                </div>
            )}
            <div className="rounded-xl bg-[var(--bgPage2)] border !border-[var(--border)] p-4 text-xs text-[var(--primary)] mt-4 poll-guidelines-box">
                <div className="font-semibold mb-1">Poll Guidelines:</div>
                <ul className="list-disc pl-5">
                    <li>Each poll question can be up to 150 characters</li>
                    <li>Minimum 2 options required, maximum 4 options allowed</li>
                    <li>Clear, concise questions work best for engagement</li>
                    <li>Consider your audience when crafting options</li>
                </ul>
            </div>
            <style>{`
                .custom-poll-collapse .ant-collapse-item {
                    background: var(--card);
                    border-radius: 12px;
                    margin-bottom: 14px;
                    border: 1.5px solid var(--border);
                }
                .custom-poll-collapse .ant-collapse-header {
                    font-weight: 600;
                    font-size: 16px;
                    color: var(--text);
                    background: var(--bgPage2);
                    border-radius: 12px 12px 0 0;
                }
                .custom-poll-collapse .ant-collapse-content {
                    background: var(--card);
                }
                .poll-label {
                    color: var(--text);
                }
                .remove-poll-btn {
                    color: var(--danger);
                    font-size: 15px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .remove-poll-btn .remove-text {
                    color: var(--danger);
                    font-size: 15px;
                }
                .poll-question-block {
                    margin-bottom: 10px;
                }
                .poll-q-label {
                    font-weight: 500;
                    color: var(--text);
                    margin-bottom: 4px;
                    display: block;
                }
                .poll-q-input {
                    width: 100%;
                    border: 1.5px solid var(--border);
                    border-radius: 8px;
                    padding: 8px 12px;
                    font-size: 15px;
                    margin-bottom: 10px;
                    background: var(--card);
                    color: var(--text);
                }
                .poll-options-block {
                    margin-top: 6px;
                }
                .poll-option-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                .poll-opt-input {
                    flex: 1;
                    border: 1.5px solid var(--border);
                    border-radius: 8px;
                    padding: 7px 10px;
                    font-size: 14px;
                    background: var(--card);
                    color: var(--text);
                }
                .remove-opt-btn {
                    background: none;
                    border: none;
                    color: var(--danger);
                    cursor: pointer;
                    font-size: 16px;
                    padding: 0 4px;
                }
                .add-opt-btn {
                    background: none;
                    border: 1.5px dashed var(--border);
                    color: var(--primary);
                    border-radius: 8px;
                    padding: 4px 12px;
                    font-size: 14px;
                    cursor: pointer;
                    margin-top: 2px;
                }
                .add-poll-btn-wrap {
                    margin-bottom: 18px;
                }
                .add-poll-btn {
                    width: 100%;
                    background: none;
                    border: 1.5px dashed var(--border);
                    color: var(--primary);
                    border-radius: 12px;
                    padding: 12px 0;
                    font-size: 17px;
                    font-weight: 500;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .poll-guidelines-box {
                    background: #e6f0ff;
                    border-radius: 12px;
                    border: 1.5px solid var(--border);
                    padding: 18px 20px 14px 20px;
                    color: #2563eb;
                    margin-top: 8px;
                }
                @media (max-width: 700px) {
                    .custom-poll-collapse .ant-collapse-header {
                        font-size: 15px;
                    }
                    .poll-q-input, .poll-opt-input {
                        font-size: 13.5px;
                    }
                    .add-poll-btn {
                        font-size: 15px;
                        padding: 10px 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default PollContentBuilder;
