// ```jsx
// src/components/ChatHeader.js
import React from "react";
import { Button } from "react-bootstrap";

const ChatHeader = ({ active, isMobile, onBack }) => {
  return (
    <div className="d-flex align-items-center justify-content-start border-bottom p-3 bg-white">
      {isMobile && (
        <Button variant="light" className="me-2" onClick={onBack}>
          ⬅
        </Button>
      )}
      {active && (
        <>
          <img
            src={active.avatar}
            alt="avatar"
            className="rounded-circle me-2"
            width={40}
            height={40}
          />
          <div>
            <div className="fw-semibold text-dark fs-5">{active.name}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatHeader;
// ```