import React, { useEffect } from "react";
import { notification } from "antd";

/**
 * NotificationToast Component
 *
 * Props:
 * - open: boolean (when true, notification appears)
 * - type: 'success' | 'error' | 'warning' | 'info' (default: 'info')
 * - message: string
 * - description: string
 * - duration: number (optional, default 3 seconds)
 * - onClose: function (optional)
 */
const NotificationToast = ({
    open,
    type = "info",
    message,
    description,
    duration = 3,
    onClose,
}) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (open) {
           setTimeout(() => {
                api[type]({
                    message: message || type.toUpperCase(),
                    // description: description || "",
                    placement: "bottomRight",
                    duration,
                    className: `!bg-[var(--bg)] text-[var(--text)] border  ${type == "error" ? "!border-red-500" : "!border-[var(--border)]"}`,
                    onClose,
                });
            }, 0);
        }
    }, [open, type, message, duration, api, onClose]);

    return <>{contextHolder}</>;
};

export default NotificationToast;
