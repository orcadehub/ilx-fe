import React, { useState } from "react";
import { Card, Form, Row, Col, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Support = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Payment not reflected",
      message: "I paid yesterday but the dashboard still shows pending.",
      status: "active",
      date: "2025-06-17",
    },
    {
      id: 2,
      subject: "Bug in dashboard",
      message: "Unable to generate report after selecting date.",
      status: "resolved",
      date: "2025-06-12",
    },
  ]);
  const [newTicket, setNewTicket] = useState({ subject: "", message: "" });

  const handleCreateTicket = () => {
    if (newTicket.subject && newTicket.message) {
      setTickets([
        ...tickets,
        {
          id: tickets.length + 1,
          subject: newTicket.subject,
          message: newTicket.message,
          status: "active",
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewTicket({ subject: "", message: "" });
      setActiveTab("active");
    }
  };

  const renderCreateTicket = () => (
    <Card className="p-5 border-0 shadow rounded-4 bg-white">
      <h4 className="mb-4 fw-bold text-primary">🎫 Create a Support Ticket</h4>

      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label className="fw-medium">Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Briefly describe the issue"
              value={newTicket.subject}
              onChange={(e) =>
                setNewTicket({ ...newTicket, subject: e.target.value })
              }
              className="rounded-3 py-3"
            />
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Form.Label className="fw-medium">Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Provide detailed information about your issue..."
              value={newTicket.message}
              onChange={(e) =>
                setNewTicket({ ...newTicket, message: e.target.value })
              }
              className="rounded-3"
            />
          </Col>
        </Row>
        <div className="text-end">
          <button
            className="btn btn-success rounded-pill px-4 py-2"
            onClick={handleCreateTicket}
            type="button"
          >
            Submit Ticket
          </button>
        </div>
      </Form>
    </Card>
  );

  const renderTickets = (status) => {
    const filtered = tickets.filter((t) => t.status === status);
    if (filtered.length === 0) {
      return (
        <Card className="p-5 border-0 rounded-4 text-center bg-white shadow">
          <p className="text-muted mb-0">No {status} tickets found.</p>
        </Card>
      );
    }

    return (
      <Row className="g-4">
        {filtered.map((ticket) => (
          <Col md={6} key={ticket.id}>
            <Card className="p-4 border-0 shadow-sm rounded-4 bg-light h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="fw-semibold text-dark mb-0">{ticket.subject}</h6>
                <Badge
                  bg={ticket.status === "active" ? "warning" : "success"}
                  className="text-uppercase px-3 py-2"
                >
                  {ticket.status}
                </Badge>
              </div>
              <p className="mb-3 text-muted small">
                {ticket.message || "No description provided."}
              </p>
              <small className="text-secondary">
                📅 Submitted on: {ticket.date}
              </small>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div
      className="container py-5"
      style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}
    >
      <div className="mb-4">
        <h3 className="text-dark fw-bold">💬 Support Center</h3>
        <p className="text-muted">
          Reach out to us with your concerns or issues
        </p>
      </div>

      {/* Custom Tab Buttons */}
      <div
        className="d-flex mb-4 rounded-4 overflow-hidden shadow-sm"
        style={{ backgroundColor: "#f8fafc" }}
      >
        {["create", "active", "resolved"].map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-fill py-3 fw-semibold border-0 ${
              activeTab === key
                ? "bg-white text-dark border-bottom border-4 border-primary"
                : "bg-light text-muted"
            }`}
            style={{
              transition: "all 0.3s ease",
              fontSize: "1rem",
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "create" && renderCreateTicket()}
      {activeTab === "active" && renderTickets("active")}
      {activeTab === "resolved" && renderTickets("resolved")}
    </div>
  );
};

export default Support;
