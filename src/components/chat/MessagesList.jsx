// ```jsx
// src/components/MessagesList.js
import React from "react";
import { Button } from "react-bootstrap";

const MessagesList = ({ messages, formatDateLabel, messagesEndRef, onToggleExpansion }) => {
  const grouped = {};
  const MESSAGE_LIMIT = 200; // Character limit for truncation

  messages.forEach((msg) => {
    const rawTimestamp = msg.timestamp ? new Date(msg.timestamp) : new Date();
    const dateKey = rawTimestamp.toDateString();
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push({ ...msg, timestamp: rawTimestamp });
  });

  return (
    <div
      className="flex-grow-1 px-3 py-3"
      style={{
        backgroundColor: "#fff",
        overflowY: "auto",
        height: "calc(100vh - 250px)",
      }}
    >
      {Object.entries(grouped).map(([dateKey, msgs]) => (
        <div key={dateKey}>
          <div className="text-center my-3">
            <span
              className="px-3 py-1 rounded-pill"
              style={{
                background: "#e5e7eb",
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {msgs.map((m) => (
            <div
              key={m.id || m.tempId}
              className={`d-flex ${
                m.fromMe ? "justify-content-end" : "justify-content-start"
              } mb-2`}
            >
              <div
                className={`rounded-3 shadow-sm ${
                  m.fromMe ? "bg-primary text-white" : "bg-white border"
                }`}
                style={{ maxWidth: "70%", padding: "8px 12px" }}
              >
                <div>
                  {m.text.length > MESSAGE_LIMIT && !m.isExpanded ? (
                    <>
                      {m.text.substring(0, MESSAGE_LIMIT)}...
                      <Button
                        variant="link"
                        className={`p-0 ${m.fromMe ? "text-light" : "text-primary"}`}
                        style={{ textDecoration: "none", fontSize: "0.8rem" }}
                        onClick={() => onToggleExpansion(m.id || m.tempId)}
                      >
                        Show More
                      </Button>
                    </>
                  ) : (
                    m.text
                  )}
                </div>
                <div
                  className="text-end"
                  style={{
                    fontSize: "0.7rem",
                    color: m.fromMe ? "#e5e7eb" : "#6b7280",
                    marginTop: "2px",
                  }}
                >
                  {m.timestamp &&
                    new Date(m.timestamp).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessagesList;
// ```