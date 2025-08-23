// ```jsx
// src/components/MessageInput.js
import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const MessageInput = ({
  message,
  onMessageChange,
  onSend,
  disabled,
  onFileUpload,
}) => {
  return (
    <div className="border-top p-3 bg-white">
      <InputGroup className="rounded-pill border shadow-sm overflow-hidden">
        <Button
          variant="light"
          onClick={() => document.getElementById("fileInput").click()}
          className="px-3"
        >
          <i className="bi bi-paperclip text-secondary"></i>
        </Button>
        <FormControl
          placeholder="Type your message..."
          className="border-0"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          disabled={disabled}
        />
        <Button variant="light" className="px-3">
          <i className="bi bi-mic text-secondary"></i>
        </Button>
        <Button
          variant="primary"
          className="px-3"
          onClick={onSend}
          disabled={disabled}
        >
          <i className="bi bi-send text-white"></i>
        </Button>
      </InputGroup>
      <input
        type="file"
        id="fileInput"
        onChange={onFileUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default MessageInput;
// ```