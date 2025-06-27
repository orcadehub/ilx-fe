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
  Dropdown,
} from "react-bootstrap";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

function Chats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  const isMobile = window.innerWidth <= 768;
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    const userId = user.id;
    socket.emit("join", userId);

    socket.on("connect", () => {
      console.log("🟢 Connected to socket:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  // Scroll to bottom on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("new_message", (msg) => {
      console.log("📩 Received new message:", msg);

      // Only push message if it’s for the currently active chat
      if (active && (msg.from === active.id || msg.to === active.id)) {
        setMessages((prev) => [
          ...prev,
          {
            id: msg.id,
            fromMe: msg.from !== active.id,
            text: msg.text,
          },
        ]);
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [active]);

  // Fetch all chat contacts
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/chats", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();

        if (response.ok) {
          const formattedContacts = data.chats
            .map((chat) => ({
              id: chat.other_user_id,
              name: chat.other_user_name,
              avatar: `https://picsum.photos/seed/${chat.other_user_id}/100`,
              preview: chat.last_message,
              timestamp: new Date(chat.timestamp),
            }))
            .sort((a, b) => b.timestamp - a.timestamp);

          setContacts(formattedContacts);
        } else {
          console.error("Failed to fetch chats:", data.message);
        }
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
  }, []);

  // Fetch messages between logged-in user and selected contact
  const handleContactSelect = async (contact) => {
    setActive(contact);
    setMessages([]); // clear previous
    if (isMobile) setShowChat(true);

    try {
      const response = await fetch(
        `http://localhost:4000/api/chat/${contact.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const mappedMessages = data.messages.map((msg) => ({
          id: msg.id,
          fromMe: msg.sender_id !== contact.id,
          text: msg.content,
        }));
        setMessages(mappedMessages);
      } else {
        console.error("Failed to fetch messages:", data.message);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !active) return;

    const newMessage = {
      id: Date.now(),
      fromMe: true,
      text: message,
    };

    // Add message optimistically to UI
    // setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    socket.emit("send_message", {
      to: active.id,
      content: newMessage.text,
      token: localStorage.getItem("token"),
    });
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
        style={{ overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      >
        {/* Sidebar */}
        {(!isMobile || !showChat) && (
          <Col xs={12} md={3} className="bg-white border-end px-0">
            <div className="px-4 py-3 border-bottom">
              <h5 className="mb-0 fw-bold fs-4">Chats</h5>
            </div>
            <div className="p-3 border-bottom">
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
                        active?.id === c.id ? "#EEF2FF" : "transparent",
                    }}
                  >
                    <img
                      src={c.avatar}
                      alt="avatar"
                      className="rounded-circle"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="fw-semibold text-dark">{c.name}</div>
                      <div className="text-muted small">{c.preview}</div>
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
            <div className="d-flex align-items-center justify-content-between border-bottom p-3 bg-white">
              <div className="d-flex align-items-center">
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
                      <div className="fw-semibold text-dark">{active.name}</div>
                      {/* <div className="small text-muted">Online</div> */}
                    </div>
                  </>
                )}
              </div>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="span"
                  bsPrefix="p-0 border-0 bg-transparent"
                >
                  <i
                    className="bi bi-three-dots-vertical"
                    style={{ fontSize: "1.3rem", cursor: "pointer" }}
                  ></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Messages */}
            <div
              className="flex-grow-1 px-3 py-3"
              style={{
                backgroundColor: "#F8FAFC",
                overflowY: "auto",
                height: "calc(100vh - 250px)", // adjust based on your layout
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`d-flex mb-3 ${
                    m.fromMe ? "justify-content-end" : "justify-content-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-4 shadow-sm ${
                      m.fromMe ? "bg-primary text-white" : "bg-white border"
                    }`}
                    style={{ maxWidth: "70%" }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Message Input */}
            <div className="border-top bg-white p-3">
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
                />
                <Button variant="light" className="px-3">
                  <i className="bi bi-mic text-secondary"></i>
                </Button>
                <Button
                  variant="primary"
                  className="px-3"
                  onClick={sendMessage}
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
