import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Funnel,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Plus,
  Gift,
  ArrowRepeat,
  Wallet as WalletIcon
} from 'react-bootstrap-icons';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function Wallet() {
  const [amount, setAmount] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'deposit', amount: 5000, description: 'Wallet top-up', date: '2023-06-15', time: '10:30 AM', status: 'completed' },
    { id: 2, type: 'payment', amount: -1200, description: 'Grocery delivery', date: '2023-06-14', time: '05:45 PM', status: 'completed' },
    { id: 3, type: 'refund', amount: 750, description: 'Order cancellation', date: '2023-06-12', time: '11:20 AM', status: 'completed' },
    { id: 4, type: 'deposit', amount: 3000, description: 'Bank transfer', date: '2023-06-10', time: '09:15 AM', status: 'completed' },
    { id: 5, type: 'payment', amount: -2500, description: 'Electronics purchase', date: '2023-06-08', time: '02:30 PM', status: 'completed' },
    { id: 6, type: 'bonus', amount: 500, description: 'Referral bonus', date: '2023-06-05', time: '04:10 PM', status: 'completed' },
    { id: 7, type: 'payment', amount: -1800, description: 'Dining out', date: '2023-06-03', time: '08:45 PM', status: 'pending' }
  ]);

  const filteredTransactions = activeFilter === 'all' ? transactions : transactions.filter(tx => tx.type === activeFilter);

  const handleAddFunds = () => {
    if (amount) {
      const now = new Date();
      const newTx = {
        id: transactions.length + 1,
        type: 'deposit',
        amount: parseFloat(amount),
        description: 'Manual wallet top-up',
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'completed'
      };
      setTransactions([newTx, ...transactions]);
      setAmount('');
    }
  };

  const getIcon = type => {
    switch (type) {
      case 'deposit': return <Plus className="text-success" />;
      case 'payment': return <ArrowUpRight className="text-danger" />;
      case 'refund': return <ArrowRepeat className="text-warning" />;
      case 'bonus': return <Gift className="text-info" />;
      default: return <WalletIcon className="text-primary" />;
    }
  };

  const currentBalance = transactions.filter(tx => tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0);
  const totalSpent = transactions.filter(tx => tx.type === 'payment' && tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0);
  const totalWithdrawn = Math.abs(transactions.filter(tx => tx.type === 'refund' && tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0));

  return (
    <Container fluid style={{ backgroundColor: '#f1f5f9', minHeight: '100vh' }} className="py-5">
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="text-center py-4">
              <h2 className="fw-bold text-dark">Wallet Dashboard</h2>
              <p className="text-muted">Overview of your funds and transactions</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 bg-white">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <CreditCard className="text-primary me-2" />
                <h6 className="mb-0">Current Balance</h6>
              </div>
              <h4 className="fw-bold">₹{currentBalance.toLocaleString('en-IN')}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 bg-white">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <ArrowUpRight className="text-danger me-2" />
                <h6 className="mb-0">Total Spent</h6>
              </div>
              <h4 className="fw-bold">₹{Math.abs(totalSpent).toLocaleString('en-IN')}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 bg-white">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <ArrowDownLeft className="text-success me-2" />
                <h6 className="mb-0">Total Withdrawn</h6>
              </div>
              <h4 className="fw-bold">₹{totalWithdrawn.toLocaleString('en-IN')}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-4 bg-white">
            <Card.Body>
              <h5 className="fw-bold mb-4">Add Funds</h5>
              <Form className="d-flex gap-3 align-items-end">
                <Form.Group className="flex-grow-1">
                  <Form.Label className="text-muted">Amount</Form.Label>
                  <Form.Control type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" />
                </Form.Group>
                <Button variant="primary" onClick={handleAddFunds} disabled={!amount}><Plus className="me-1" /> Add</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-4 bg-white">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Transactions</h5>
                <div className="d-flex gap-2">
                  {['all','deposit','payment','refund','bonus'].map(f => (
                    <Button key={f} variant={activeFilter === f ? 'dark' : 'outline-dark'} size="sm" onClick={() => setActiveFilter(f)}>
                      {f[0].toUpperCase() + f.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map(tx => (
                    <div key={tx.id} className="d-flex justify-content-between align-items-center py-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div className="me-3">{getIcon(tx.type)}</div>
                        <div>
                          <h6 className="mb-0 fw-bold">{tx.description}</h6>
                          <small className="text-muted">{tx.date} • {tx.time}</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className={`fw-bold ${tx.amount > 0 ? 'text-success' : 'text-danger'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </span>
                        {tx.status === 'pending' && <Badge bg="warning" text="dark" className="ms-2">Pending</Badge>}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted mb-1">No transactions found</p>
                    <h4 className="fw-bold text-muted">₹0.00</h4>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Wallet;
