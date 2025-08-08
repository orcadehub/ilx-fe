// ```jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

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

    // Create socket connection with enhanced options
    socketRef.current = io(baseURL, {
      auth: { token },
      transports: ["websocket", "polling"], // Prefer WebSocket, fallback to polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 10000,
    });

    // Set up event listeners
    socketRef.current.on("connect", () => {
      console.log("🟢 Socket connected:", socketRef.current.id);
      setConnectionError(null);
      socketRef.current.emit("join", user.id);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("🔴 Socket disconnected:", reason);
      setConnectionError("Disconnected from server. Attempting to reconnect...");
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
      setConnectionError(`Failed to connect: ${err.message}`);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Handle incoming messages
  useEffect(() => {
    if (!socketRef.current) return;

    const handleNewMessage = (msg) => {
      console.log("📩 New message received:", msg);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const isForCurrentChat =
        active && (msg.from === active.id || msg.to === active.id);
      const isFromOtherUser = msg.from !== user.id;

      if (isForCurrentChat) {
        setMessages((prev) => [
          ...prev,
          {
            id: msg.id,
            fromMe: msg.from === user.id,
            text: msg.text,
            timestamp: new Date(),
          },
        ]);
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
          console.error("Failed to fetch chats:", data.message);
          setConnectionError(`Failed to fetch chats: ${data.message}`);
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
        setConnectionError("Error loading chat contacts.");
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
              avatar: `https://picsum.photos/seed/${data.id}/100`,
              preview: "",
              timestamp: new Date(),
            };

            setContacts((prev) => {
              const alreadyExists = prev.some((c) => c.id === newContact.id);
              return alreadyExists ? prev : [...prev, newContact];
            });

            handleContactSelect(newContact);
          } else {
            console.error("User not found:", data.message);
            setConnectionError(`User not found: ${data.message}`);
          }
        } catch (err) {
          console.error("Error fetching new user:", err);
          setConnectionError("Error loading user details.");
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

    const interval = setInterval(() => {
      fetchMessages(contact.id);
    }, 5000); // Increased to 5s to reduce server load

    setRefreshInterval(interval);
  };

  const fetchMessages = async (contactId) => {
    try {
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
        }));

        setMessages(mappedMessages);
      } else {
        console.error("Failed to fetch messages:", data.message);
        setConnectionError(`Failed to fetch messages: ${data.message}`);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setConnectionError("Error loading messages.");
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

  const sendMessage = async () => {
    if (!message.trim() || !active || !socketRef.current) return;

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const tempId = Date.now();
    const newMessage = {
      id: tempId,
      fromMe: true,
      text: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
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

    try {
      socketRef.current.emit("send_message", {
        to: active.id,
        content: message,
        token: localStorage.getItem("token"),
      }, (ack) => {
        if (ack && ack.error) {
          console.error("Message send failed:", ack.error);
          setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
          setConnectionError("Failed to send message. Please try again.");
        }
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setConnectionError("Error sending message.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), fromMe: true, text: `📎 File: ${file.name}` },
      ]);
    }
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
        {/* Connection Error Alert */}
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

        {/* Sidebar */}
        {(!isMobile || !showChat) && (
          <Col xs={12} md={3} className="border-end px-0">
            <div className="px-4 py-3 border-bottom bg-white">
              <h5 className="mb-0 fw-bold fs-4 text-dark">Chats</h5>
            </div>
            <div className="p-3 border-bottom bg-white">
              <Form.Control
                placeholder="Search..."
                className="rounded-pill border border-dark shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ListGroup
              variant="flush"
              style={{ overflowY: "auto", height: "calc(100vh - 250px)" }}
            >
              {contacts
                .filter((c) =>
                  c.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((c) => (
                  <ListGroup.Item
                    key={c.id}
                    onClick={() => handleContactSelect(c)}
                    className="d-flex align-items-center gap-3 px-3 py-3 border-0 border-bottom"
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        active?.id === c.id ? "#e0e7ff" : "transparent",
                    }}
                  >
                    <img
                      src={c.avatar}
                      alt="avatar"
                      className="rounded-circle"
                      width={40}
                      height={40}
                    />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="d-flex justify-content-between">
                        <div className="fw-semibold text-dark text-truncate">
                          {c.name}
                        </div>
                        <div className="text-muted small">
                          {c.timestamp?.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      <div className="text-muted small text-truncate">
                        {c.preview}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        )}

        {/* Chat Pane */}
        {(isMobile ? showChat : true) && (
          <Col xs={12} md={9} className="d-flex flex-column">
            {/* Chat Header */}
            <div className="d-flex align-items-center justify-content-start border-bottom p-3 bg-white">
              {isMobile && (
                <Button
                  variant="light"
                  className="me-2"
                  onClick={() => setShowChat(false)}
                >
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
                    <div className="fw-semibold text-dark fs-5">
                      {active.name}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Messages */}
            <div
              className="flex-grow-1 px-3 py-3"
              style={{
                backgroundColor: "#fff",
                overflowY: "auto",
                height: "calc(100vh - 250px)",
              }}
            >
              {(() => {
                const grouped = {};
                messages.forEach((msg) => {
                  const rawTimestamp = msg.timestamp
                    ? new Date(msg.timestamp)
                    : new Date();
                  const dateKey = rawTimestamp.toDateString();
                  if (!grouped[dateKey]) grouped[dateKey] = [];
                  grouped[dateKey].push({ ...msg, timestamp: rawTimestamp });
                });

                return Object.entries(grouped).map(([dateKey, msgs]) => (
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
                        key={m.id}
                        className={`d-flex ${
                          m.fromMe
                            ? "justify-content-end"
                            : "justify-content-start"
                        } mb-2`}
                      >
                        <div
                          className={`rounded-3 shadow-sm ${
                            m.fromMe
                              ? "bg-primary text-white"
                              : "bg-white border"
                          }`}
                          style={{ maxWidth: "70%", padding: "8px 12px" }}
                        >
                          <div>{m.text}</div>
                          <div
                            className="text-end"
                            style={{
                              fontSize: "0.7rem",
                              color: m.fromMe ? "#e5e7eb" : "#6b7280",
                              marginTop: "2px",
                            }}
                          >
                            {m.timestamp &&
                              new Date(m.timestamp).toLocaleTimeString(
                                "en-IN",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "Asia/Kolkata",
                                }
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ));
              })()}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Message Input */}
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
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  disabled={!!connectionError}
                />
                <Button variant="light" className="px-3">
                  <i className="bi bi-mic text-secondary"></i>
                </Button>
                <Button
                  variant="primary"
                  className="px-3"
                  onClick={sendMessage}
                  disabled={!!connectionError}
                >
                  <i className="bi bi-send text-white"></i>
                </Button>
              </InputGroup>
              <input
                type="file"
                id="fileInput"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Chats;
// ```