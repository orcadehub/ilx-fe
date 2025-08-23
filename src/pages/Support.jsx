import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Tabs, Tab, Form, Badge } from "react-bootstrap";

const Support = () => {
  const [activeTab, setActiveTab] = useState("active");
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
      setActiveTab("active"); // Switch to active tickets tab on submit
    }
  };

  const renderCreateTicket = () => (
    <Card className="shadow-sm rounded-4 border-0 bg-white p-4">
      <h4 className="text-primary fw-bold mb-4">🎫 Create a Support Ticket</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Briefly describe the issue"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            className="rounded-3 py-2"
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Provide detailed information about your issue..."
            value={newTicket.message}
            onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
            className="rounded-3"
          />
        </Form.Group>
        <div className="text-end">
          <Button variant="success" className="rounded-pill px-4 py-2" onClick={handleCreateTicket}>
            Submit Ticket
          </Button>
        </div>
      </Form>
    </Card>
  );

  const renderTickets = (status) => {
    const filtered = tickets.filter((t) => t.status === status);

    if (filtered.length === 0) {
      return (
        <Card className="shadow-sm rounded-4 border-0 text-center bg-white p-5">
          <p className="text-muted mb-0">No {status} tickets found.</p>
        </Card>
      );
    }

    return (
      <Row className="g-4">
        {filtered.map((ticket) => (
          <Col md={6} key={ticket.id}>
            <Card className="p-4 shadow-sm rounded-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="fw-semibold text-dark mb-0">{ticket.subject}</h6>
                <Badge
                  bg={ticket.status === "active" ? "warning" : "success"}
                  className="text-uppercase px-3 py-2"
                  pill
                >
                  {ticket.status}
                </Badge>
              </div>
              <p className="mb-3 text-muted small">{ticket.message || "No description provided."}</p>
              <small className="text-secondary">📅 Submitted on: {ticket.date}</small>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container fluid style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }} className="py-5">
      <Row className="justify-content-center">
        {/* Left column always shows Create Ticket */}
        <Col lg={3} md={12} className="mb-4">
          {renderCreateTicket()}
        </Col>

        {/* Right column shows tabs for Active / Resolved tickets */}
        <Col lg={9} md={12}>
          <Card className="shadow-sm rounded-4 border-0 bg-white">
            <Tabs
              id="support-ticket-tabs"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="m-3"
              justify
              fill
            >
              <Tab eventKey="active" title="Active Tickets">
                <div className="p-3">{renderTickets("active")}</div>
              </Tab>
              <Tab eventKey="resolved" title="Resolved Tickets">
                <div className="p-3">{renderTickets("resolved")}</div>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;
