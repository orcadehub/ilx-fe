// ```jsx
// src/components/ChatPane.js
import React from "react";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

const ChatPane = ({
  active,
  isMobile,
  onBack,
  messages,
  formatDateLabel,
  messagesEndRef,
  message,
  onMessageChange,
  onSend,
  connectionError,
  onFileUpload,
  onToggleExpansion,
}) => {
  return (
    <>
      <ChatHeader active={active} isMobile={isMobile} onBack={onBack} />
      <MessagesList
        messages={messages}
        formatDateLabel={formatDateLabel}
        messagesEndRef={messagesEndRef}
        onToggleExpansion={onToggleExpansion}
      />
      <MessageInput
        message={message}
        onMessageChange={onMessageChange}
        onSend={onSend}
        disabled={!!connectionError}
        onFileUpload={onFileUpload}
      />
    </>
  );
};

export default ChatPane;
// ```