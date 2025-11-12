import React, { useState } from "react";
import { Modal, Input, Checkbox, TimePicker, Button } from "antd";

const dayOptions = [
    { label: "Sunday", value: "sunday" },
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
];

const SocialMediaSettingsModal = ({ open, onCancel, onSave, platformName, setEditingData }) => {
    const [url, setUrl] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);

    const reset = () => {
        setSelectedDays([]);
        setFromTime(null);
        setToTime(null);
        setUrl("");
    }
     
    const handleSave = () => {
        console.log("Saving data:", platformName);
       setEditingData((prev) => ({
            ...prev,
            platformname: platformName,
            url,
            day: selectedDays,
            time: { from: fromTime, to: toTime },
        }))
        onSave({ url, selectedDays, fromTime, toTime });
        reset();
     }

    return (
        <Modal
            title={`Edit Social Media Settings (${platformName})`}
            open={open}
            onCancel={onCancel}
            footer={null}
            centered
            className="rounded-xl capitalize"
            style={{zIndex: 1600}}
        >
            <div className="flex flex-col gap-6 mt-4">

                {/* Profile URL */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Profile URL</label>
                    <Input
                        placeholder={`Enter your ${platformName?.toLowerCase()} Profile URL`}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="h-11"
                    />
                </div>

                {/* Preferred Days */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium">Preferred Days</label>
                    <div className="grid grid-cols-2 gap-y-2">
                        {dayOptions.map((day) => (
                            <Checkbox
                                key={day.value}
                                value={day.value}
                                checked={selectedDays.includes(day.value)}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    setSelectedDays((prev) =>
                                        checked
                                            ? [...prev, day.value]
                                            : prev.filter((d) => d !== day.value)
                                    );
                                }}
                            >
                                {day.label}
                            </Checkbox>
                        ))}
                    </div>
                </div>

                {/* Preferred Time */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">
                        Preferred Time{" "}
                        <span className="text-gray-400 text-xs">(Used for Auto Scheduling (IST))</span>
                    </label>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">From Time</label>
                            <TimePicker
                                className="w-full h-11"
                                value={fromTime}
                                onChange={(time) => setFromTime(time)}
                                format="HH:mm"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">To Time</label>
                            <TimePicker
                                className="w-full h-11"
                                value={toTime}
                                onChange={(time) => setToTime(time)}
                                format="HH:mm"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        onClick={onCancel}
                        className="h-10 px-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSave}
                        className="h-10 px-6 !bg-indigo-600 hover:!bg-indigo-500"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SocialMediaSettingsModal;
