import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import config from "../config";
import ContactsSidebar from "../components/chat/ContactsSidebar";
import ChatPane from "../components/chat/ChatPane";

const baseURL = import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL;
const wsURL = import.meta.env.MODE === "development" ? config.WS_BASE_URL : config.WS_PROD_URL;

const formatDateLabel = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);
  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7)
    return date.toLocaleDateString("en-IN", { weekday: "long" });

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function Chats() {
  const { id: selectedId } = useParams();
  const socketRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [connectionError, setConnectionError] = useState(null);
  const isMobile = window.innerWidth <= 768;
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) {
      setConnectionError("Please log in to access chats.");
      return;
    }

    console.log("Connecting to WebSocket URL:", wsURL); // Debug log
    socketRef.current = io(wsURL, {
      auth: { token },
      transports: ["websocket", "polling"], // Fallback to polling for debugging
      secure: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current.on("connect", () => {
      setConnectionError(null);
      socketRef.current.emit("join", user.id);
      console.log("🟢 WebSocket connected");
    });

    socketRef.current.on("disconnect", (reason) => {
      setConnectionError(`Disconnected from server. Reason: ${reason}. Attempting to reconnect...`);
      console.log("🔴 WebSocket disconnected:", reason);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
      setConnectionError(`Failed to connect: ${err.message}`);
    });

    socketRef.current.on("error", (err) => {
      console.error("WebSocket error:", err);
      setConnectionError(`WebSocket error: ${err.message || err}`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        console.log("🧹 WebSocket disconnected and cleaned up");
      }
    };
  }, []);

  // Handle incoming messages
  useEffect(() => {
    if (!socketRef.current) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const handleNewMessage = (msg) => {
      console.log("📩 Received new message:", msg); // Debug log
      const isForCurrentChat =
        active && (msg.from === active.id || msg.to === active.id);
      const isFromOtherUser = msg.from !== user.id;

      if (isForCurrentChat) {
        setMessages((prev) => {
          const existingMessageIndex = prev.findIndex(
            (m) => m.tempId && m.tempId === msg.tempId
          );
          if (existingMessageIndex !== -1 && msg.from === user.id) {
            const updatedMessages = [...prev];
            updatedMessages[existingMessageIndex] = {
              id: msg.id,
              fromMe: true,
              text: msg.text,
              timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
              tempId: undefined,
              isExpanded: false,
            };
            return updatedMessages;
          } else {
            return [
              ...prev,
              {
                id: msg.id,
                fromMe: msg.from === user.id,
                text: msg.text,
                timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
                isExpanded: false,
              },
            ];
          }
        });
      }

      if (isFromOtherUser) {
        setContacts((prev) =>
          prev
            .map((contact) =>
              contact.id === msg.from
                ? {
                    ...contact,
                    preview:
                      msg.text.length > 30
                        ? `${msg.text.substring(0, 30)}...`
                        : msg.text,
                    timestamp: new Date(),
                  }
                : contact
            )
            .sort((a, b) => b.timestamp - a.timestamp)
        );
      }
    };

    socketRef.current.on("new_message", handleNewMessage);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("new_message", handleNewMessage);
      }
    };
  }, [active]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch all chat contacts
  useEffect(() => {
    const fetchChats = async () => {
      try {
        console.log("Fetching chats from:", `${baseURL}/api/chats`); // Debug log
        const response = await fetch(`${baseURL}/api/chats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          const formattedContacts = data.chats
            .map((chat) => ({
              id: chat.other_user_id,
              name: chat.other_user_name,
              avatar: chat.profile_pic,
              preview: chat.last_message,
              timestamp: new Date(chat.timestamp),
            }))
            .sort((a, b) => b.timestamp - a.timestamp);

          setContacts(formattedContacts);
        } else {
          setConnectionError(`Failed to fetch chats: ${data.message}`);
        }
      } catch (err) {
        setConnectionError("Error loading chat contacts.");
        console.error("Fetch chats error:", err);
      }
    };

    fetchChats();
  }, []);

  // Auto-open chat from route param
  useEffect(() => {
    const trySelectOrFetchUser = async () => {
      if (!selectedId) return;

      const existingContact = contacts.find(
        (c) => c.id.toString() === selectedId
      );

      if (existingContact) {
        handleContactSelect(existingContact);
      } else {
        try {
          const res = await fetch(`${baseURL}/api/users/${selectedId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await res.json();

          if (res.ok) {
            const newContact = {
              id: data.id,
              name: data.name,
              avatar: data.profilePic,
              preview: "",
              timestamp: new Date(),
            };

            setContacts((prev) => {
              const alreadyExists = prev.some((c) => c.id === newContact.id);
              return alreadyExists ? prev : [...prev, newContact];
            });

            handleContactSelect(newContact);
          } else {
            setConnectionError(`User not found: ${data.message}`);
          }
        } catch (err) {
          setConnectionError("Error loading user details.");
          console.error("Fetch user error:", err);
        }
      }
    };

    trySelectOrFetchUser();
  }, [contacts, selectedId]);

  // Fetch messages for selected contact
  const handleContactSelect = async (contact) => {
    setActive(contact);
    setMessages([]);
    if (isMobile) setShowChat(true);

    if (refreshInterval) {
      clearInterval(refreshInterval);
    }

    await fetchMessages(contact.id);

    // const interval = setInterval(() => {
    //   fetchMessages(contact.id);
    // }, 5000);

    // setRefreshInterval(interval);
  };

  const fetchMessages = async (contactId) => {
    try {
      console.log("Fetching messages from:", `${baseURL}/api/chat/${contactId}`); // Debug log
      const response = await fetch(`${baseURL}/api/chat/${contactId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        const mappedMessages = data.messages.map((msg) => ({
          id: msg.id,
          fromMe: msg.sender_id !== contactId,
          text: msg.content,
          timestamp: new Date(msg.timestamp),
          isExpanded: false,
        }));

        setMessages(mappedMessages);
      } else {
        setConnectionError(`Failed to fetch messages: ${data.message}`);
      }
    } catch (err) {
      setConnectionError("Error loading messages.");
      console.error("Fetch messages error:", err);
    }
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [refreshInterval]);

  const sendMessage = () => {
    if (!message.trim() || !active || !socketRef.current) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const tempId = Date.now();
    const newMessage = {
      tempId,
      fromMe: true,
      text: message,
      timestamp: new Date(),
      isExpanded: false,
    };
    setMessages((prev) => [...prev, newMessage]); // Add optimistic message
    setMessage("");

    setContacts((prev) =>
      prev
        .map((contact) =>
          contact.id === active.id
            ? {
                ...contact,
                preview:
                  message.length > 30
                    ? `${message.substring(0, 30)}...`
                    : message,
                timestamp: new Date(),
              }
            : contact
        )
        .sort((a, b) => b.timestamp - a.timestamp)
    );

    socketRef.current.emit(
      "send_message",
      {
        to: active.id,
        content: message,
        tempId,
        token: localStorage.getItem("token"),
      },
      (ack) => {
        if (ack && ack.error) {
          setMessages((prev) => prev.filter((m) => m.tempId !== tempId));
          setConnectionError("Failed to send message. Please try again.");
          console.error("Send message error:", ack.error);
        } else {
          console.log("✅ Message sent successfully:", ack);
        }
      }
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        {
          tempId: Date.now(),
          fromMe: true,
          text: `📎 File: ${file.name}`,
          timestamp: new Date(),
          isExpanded: false,
        },
      ]);
    }
  };

  const toggleMessageExpansion = (messageId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId || msg.tempId === messageId
          ? { ...msg, isExpanded: !msg.isExpanded }
          : msg
      )
    );
  };

  return (
    <Container
      fluid
      className="bg-light d-flex justify-content-center"
      style={{ height: "90vh" }}
    >
      <Row
        className="flex-grow-1 w-100"
        style={{
          overflow: "hidden",
          backgroundColor: "var(--primary-color)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {connectionError && (
          <Alert
            variant="danger"
            onClose={() => setConnectionError(null)}
            dismissible
            className="m-3 position-absolute"
            style={{ zIndex: 1000 }}
          >
            {connectionError}
          </Alert>
        )}

        {(!isMobile || !showChat) && (
          <Col xs={12} md={3} className="border-end px-0">
            <ContactsSidebar
              contacts={contacts}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              active={active}
              onSelectContact={handleContactSelect}
            />
          </Col>
        )}

        {(isMobile ? showChat : true) && (
          <Col xs={12} md={9} className="d-flex flex-column">
            <ChatPane
              active={active}
              isMobile={isMobile}
              onBack={() => setShowChat(false)}
              messages={messages}
              formatDateLabel={formatDateLabel}
              messagesEndRef={messagesEndRef}
              message={message}
              onMessageChange={setMessage}
              onSend={sendMessage}
              connectionError={connectionError}
              onFileUpload={handleFileUpload}
              onToggleExpansion={toggleMessageExpansion}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Chats;