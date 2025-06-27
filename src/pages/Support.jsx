import React, { useState } from 'react';
import { Button, Card, Form, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [tickets, setTickets] = useState([
    { id: 1, subject: 'Payment not reflected', message: 'I paid yesterday but the dashboard still shows pending.', status: 'active', date: '2025-06-17' },
    { id: 2, subject: 'Bug in dashboard', message: 'Unable to generate report after selecting date.', status: 'resolved', date: '2025-06-12' },
  ]);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });

  const handleCreateTicket = () => {
    if (newTicket.subject && newTicket.message) {
      setTickets([
        ...tickets,
        {
          id: tickets.length + 1,
          subject: newTicket.subject,
          message: newTicket.message,
          status: 'active',
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewTicket({ subject: '', message: '' });
      setActiveTab('active');
    }
  };

  const renderCreateTicket = () => (
    <Card className="p-4 border-0 rounded-4 bg-body">
      <h5 className="mb-4 fw-semibold text-primary">🎫 Create New Ticket</h5>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fw-medium">Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            className="rounded-3"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-medium">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe your issue..."
            value={newTicket.message}
            onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
            className="rounded-3"
          />
        </Form.Group>
        <div className="text-end">
          <Button variant="success" className="rounded-pill px-4" onClick={handleCreateTicket}>
            Submit Ticket
          </Button>
        </div>
      </Form>
    </Card>
  );

  const renderTickets = (status) => {
    const filtered = tickets.filter(t => t.status === status);
    if (filtered.length === 0) {
      return (
        <Card className="p-4 border-0 rounded-4 text-center bg-light">
          <p className="text-muted mb-0">No {status} tickets found.</p>
        </Card>
      );
    }

    return filtered.map(ticket => (
      <Card key={ticket.id} className="mb-3 border-0 rounded-4 bg-light px-3 py-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-semibold mb-0">{ticket.subject}</h6>
          <Badge bg={ticket.status === 'active' ? 'warning' : 'success'} className="text-uppercase">
            {ticket.status}
          </Badge>
        </div>
        <p className="mb-2 text-secondary">{ticket.message || 'No description provided.'}</p>
        <small className="text-muted">Submitted on: {ticket.date}</small>
      </Card>
    ));
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <h4 className="text-primary fw-bold me-2">💬 Support Center</h4>
      </div>

      <div className="mb-4 d-flex flex-wrap gap-2">
        {[
          { key: 'create', label: 'Create Ticket' },
          { key: 'active', label: 'Active Tickets' },
          { key: 'resolved', label: 'Resolved Tickets' },
        ].map(tab => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'primary' : 'outline-primary'}
            className="rounded-pill px-4"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'create' && renderCreateTicket()}
      {activeTab === 'active' && renderTickets('active')}
      {activeTab === 'resolved' && renderTickets('resolved')}
    </div>
  );
};

export default Support;
