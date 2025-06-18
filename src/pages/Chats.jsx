import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";
import { Paperclip, Mic, Send } from "react-bootstrap-icons";

function Chats() {
  const contacts = [
    {
      id: 1,
      name: "Kelly Sikkema",
      avatar: "https://picsum.photos/seed/1/100",
      preview: "In front of the Bar...",
    },
    {
      id: 2,
      name: "Alex Johnson",
      avatar: "https://picsum.photos/seed/2/100",
      preview: "Let's meet at 6pm.",
    },
    {
      id: 3,
      name: "Maria Garcia",
      avatar: "https://picsum.photos/seed/3/100",
      preview: "See you soon!",
    },
    {
      id: 4,
      name: "David Smith",
      avatar: "https://picsum.photos/seed/4/100",
      preview: "Can you send it now?",
    },
    {
      id: 5,
      name: "Emma Brown",
      avatar: "https://picsum.photos/seed/5/100",
      preview: "Work is done!",
    },
    {
      id: 21,
      name: "Alex Johnson",
      avatar: "https://picsum.photos/seed/2/100",
      preview: "Let's meet at 6pm.",
    },
    {
      id: 31,
      name: "Maria Garcia",
      avatar: "https://picsum.photos/seed/3/100",
      preview: "See you soon!",
    },
    {
      id: 41,
      name: "David Smith",
      avatar: "https://picsum.photos/seed/4/100",
      preview: "Can you send it now?",
    },
    {
      id: 51,
      name: "Emma Brown",
      avatar: "https://picsum.photos/seed/5/100",
      preview: "Work is done!",
    },
    {
      id: 22,
      name: "Alex Johnson",
      avatar: "https://picsum.photos/seed/2/100",
      preview: "Let's meet at 6pm.",
    },
    {
      id: 32,
      name: "Maria Garcia",
      avatar: "https://picsum.photos/seed/3/100",
      preview: "See you soon!",
    },
    {
      id: 42,
      name: "David Smith",
      avatar: "https://picsum.photos/seed/4/100",
      preview: "Can you send it now?",
    },
    {
      id: 52,
      name: "Emma Brown",
      avatar: "https://picsum.photos/seed/5/100",
      preview: "Work is done!",
    },
  ];

  const [active, setActive] = useState(contacts[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, fromMe: false, text: "Hello!" },
    { id: 2, fromMe: true, text: "Hey there!" },
    { id: 3, fromMe: false, text: "How are you?" },
    { id: 4, fromMe: true, text: "Doing great, thanks!" },
  ]);

  const [showChat, setShowChat] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), fromMe: true, text: message },
    ]);
    setMessage("");
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container
      fluid
      className="d-flex justify-content-center bg-light"
      style={{ height: "90vh", overflow: "hidden" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #dee2e6",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row className="flex-grow-1 g-0">
          {/* Sidebar */}
          {(!isMobile || !showChat) && (
            <Col
              xs={12}
              md={4}
              className="d-flex flex-column bg-white border-end"
            >
              <div className="p-4 border-bottom">
                <h5 className="mb-3 fw-bold text-primary">Chats</h5>
                <Form.Control
                  placeholder="Search chats"
                  className="shadow-sm"
                />
              </div>
              <ListGroup
                variant="flush"
                className="flex-grow-1"
                style={{ overflow: "auto", height: "70vh" }}
              >
                {contacts.map((c) => (
                  <ListGroup.Item
                    key={c.id}
                    action
                    active={active.id === c.id}
                    onClick={() => {
                      setActive(c);
                      if (isMobile) setShowChat(true);
                    }}
                    className="d-flex align-items-center p-3 border-0 border-bottom"
                  >
                    <img
                      src={c.avatar}
                      alt=""
                      className="rounded-circle me-3"
                      style={{ width: 45, height: 45, objectFit: "cover" }}
                    />
                    <div>
                      <strong>{c.name}</strong>
                      <div
                        className="text-muted"
                        style={{ fontSize: ".85rem" }}
                      >
                        {c.preview}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          )}

          {/* Chat Panel */}
          {(isMobile ? showChat : true) && (
            <Col
              xs={12}
              md={8}
              className="d-flex flex-column bg-white position-relative"
            >
              {/* Header */}
              <div className="d-flex align-items-center justify-content-between border-bottom p-3 bg-light">
                <div className="d-flex align-items-center">
                  {isMobile && (
                    <Button
                      size="sm"
                      variant="light"
                      className="me-2"
                      onClick={() => setShowChat(false)}
                    >
                      ⬅
                    </Button>
                  )}
                  <img
                    src={active.avatar}
                    alt=""
                    className="rounded-circle me-2"
                    style={{ width: 45, height: 45, objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-semibold">{active.name}</h6>
                    <small className="text-muted">Last seen 02:55 pm</small>
                  </div>
                </div>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    bsPrefix="p-0 border-0 bg-transparent"
                    as="span"
                    aria-label="More options"
                  >
                    <i
                      className="bi bi-three-dots-vertical"
                      style={{ fontSize: "1.25rem", cursor: "pointer" }}
                    />
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
                className="px-3 py-2"
                style={{
                  flexGrow: 1,
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 205px)",
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
                      className={`p-3 rounded-4 ${
                        m.fromMe
                          ? "bg-primary text-light"
                          : "bg-secondary text-light"
                      }`}
                      style={{ maxWidth: "70%" }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Sticky Input */}
              <div
                className="border-top p-3 bg-white shadow-sm"
                style={{ position: "sticky", bottom: 0, zIndex: 10 }}
              >
                <InputGroup className="rounded-pill border shadow-sm overflow-hidden">
                  {/* Attach Button */}
                  <Button
                    variant="light"
                    onClick={() => document.getElementById("fileInput").click()}
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "none", backgroundColor: "#f1f3f5" }}
                  >
                    <Paperclip size={18} />
                  </Button>

                  {/* Text Input */}
                  <FormControl
                    placeholder="Type your message…"
                    className="border-0 px-3"
                    style={{ backgroundColor: "#fff" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />

                  {/* Mic Button */}
                  <Button
                    variant="light"
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "none", backgroundColor: "#f1f3f5" }}
                  >
                    <Mic size={18} />
                  </Button>

                  {/* Send Button */}
                  <Button
                    variant="primary"
                    onClick={sendMessage}
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
                      border: "none",
                      padding: "0.375rem 1rem",
                    }}
                  >
                    <Send size={18} />
                  </Button>

                  {/* Hidden File Input */}
                  <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </InputGroup>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default Chats;
