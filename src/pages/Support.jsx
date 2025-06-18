import React, { useState } from 'react';
import { Button, Card, Form, Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [tickets, setTickets] = useState([
    { id: 1, subject: 'Payment not reflected', status: 'active', date: '2025-06-17' },
    { id: 2, subject: 'Bug in dashboard', status: 'resolved', date: '2025-06-12' },
  ]);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });

  const handleCreateTicket = () => {
    if (newTicket.subject && newTicket.message) {
      setTickets([...tickets, {
        id: tickets.length + 1,
        subject: newTicket.subject,
        message: newTicket.message,
        status: 'active',
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewTicket({ subject: '', message: '' });
      setActiveTab('active');
    }
  };

  const renderCreateTicket = () => (
    <Card className="p-4 shadow-lg border-0 rounded-4">
      <h4 className="mb-4 text-primary">🎫 Create New Ticket</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            className="rounded-3"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe your issue..."
            value={newTicket.message}
            onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
            className="rounded-3"
          />
        </Form.Group>
        <Button variant="success" className="rounded-pill px-4" onClick={handleCreateTicket}>
          Submit Ticket
        </Button>
      </Form>
    </Card>
  );

  const renderTickets = (type) => (
    tickets.filter(t => t.status === type).length === 0
      ? <Card className="p-4 border-0 rounded-4 shadow-sm text-center"><p>No {type} tickets found.</p></Card>
      : tickets.filter(t => t.status === type).map(ticket => (
        <Card key={ticket.id} className="mb-3 shadow-sm p-3 border-0 rounded-4 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">{ticket.subject}</h6>
            <Badge bg={ticket.status === 'active' ? 'warning' : 'success'}>
              {ticket.status === 'active' ? 'Active' : 'Resolved'}
            </Badge>
          </div>
          <p className="mb-1 text-muted">{ticket.message || 'No description available.'}</p>
          <small className="text-muted">Submitted on: {ticket.date}</small>
        </Card>
      ))
  );

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <h3 className="me-2 text-primary">💬 Support Center</h3>
      </div>

      <div className="mb-4 d-flex gap-3 flex-wrap">
        <Button
          variant={activeTab === 'create' ? 'primary' : 'outline-primary'}
          className="rounded-pill px-4"
          onClick={() => setActiveTab('create')}
        >
          Create Ticket
        </Button>
        <Button
          variant={activeTab === 'active' ? 'primary' : 'outline-primary'}
          className="rounded-pill px-4"
          onClick={() => setActiveTab('active')}
        >
          Active Tickets
        </Button>
        <Button
          variant={activeTab === 'resolved' ? 'primary' : 'outline-primary'}
          className="rounded-pill px-4"
          onClick={() => setActiveTab('resolved')}
        >
          Resolved Tickets
        </Button>
      </div>

      {activeTab === 'create' && renderCreateTicket()}
      {activeTab === 'active' && renderTickets('active')}
      {activeTab === 'resolved' && renderTickets('resolved')}
    </div>
  );
};

export default Support;
