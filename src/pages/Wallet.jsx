import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Form, ListGroup, Badge } from 'react-bootstrap';
import { Plus, ArrowUpRight, ArrowDownLeft, Gift, ArrowRepeat, Wallet as WalletIcon } from 'react-bootstrap-icons';

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
    <Container fluid style={{ backgroundColor: '#f1f5f9', minHeight: '100vh' }} className="p-0">
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(to right, #605cff, #4a00e0)',
          color: '#fff',
          padding: '20px 0',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">Wallet & Transactions</h5>
              <small>Manage your balance and payments</small>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-4">
        <Row>
          {/* Left Side - Add Funds */}
          <Col lg={3} md={12} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center border-bottom">
                <h6 className="mb-0">Add Funds</h6>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </Form.Group>
                  <Button variant="primary" className="w-100" disabled={!amount} onClick={handleAddFunds}>
                    <Plus className="me-1" /> Add Funds
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Tabs */}
          <Col lg={9} md={12}>
            <Card className="shadow-sm border-0 rounded" style={{ backgroundColor: '#f8f9fa' }}>
              <Tabs defaultActiveKey="summary" justify variant="underline" className="pt-3 px-3">
                <Tab eventKey="summary" title="Summary">
                  <Row className="g-4 px-4 py-3">
                    <Col md={4}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                          <h6 className="text-secondary">Current Balance</h6>
                          <h3 className="fw-bold">₹{currentBalance.toLocaleString('en-IN')}</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                          <h6 className="text-secondary">Total Spent</h6>
                          <h3 className="fw-bold text-danger">₹{Math.abs(totalSpent).toLocaleString('en-IN')}</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body className="text-center">
                          <h6 className="text-secondary">Total Withdrawn</h6>
                          <h3 className="fw-bold text-success">₹{totalWithdrawn.toLocaleString('en-IN')}</h3>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>

                <Tab eventKey="transactions" title="Transactions">
                  <ListGroup variant="flush" className="px-3 py-3" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <div className="d-flex justify-content-end mb-3 gap-2 flex-wrap">
                      {['all', 'deposit', 'payment', 'refund', 'bonus'].map(filter => (
                        <Button
                          key={filter}
                          variant={activeFilter === filter ? 'dark' : 'outline-dark'}
                          size="sm"
                          onClick={() => setActiveFilter(filter)}
                          aria-pressed={activeFilter === filter}
                          className="text-capitalize"
                        >
                          {filter}
                        </Button>
                      ))}
                    </div>
                    {filteredTransactions.length ? (
                      filteredTransactions.map(tx => (
                        <ListGroup.Item key={tx.id} className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-3">
                            {getIcon(tx.type)}
                            <div>
                              <h6 className="mb-1 fw-semibold">{tx.description}</h6>
                              <small className="text-muted">{tx.date} • {tx.time}</small>
                            </div>
                          </div>
                          <div className="text-end d-flex align-items-center gap-2">
                            <span className={`fw-bold ${tx.amount > 0 ? 'text-success' : 'text-danger'}`}>
                              {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </span>
                            {tx.status === 'pending' && (
                              <Badge bg="warning" text="dark" pill>Pending</Badge>
                            )}
                          </div>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <div className="text-center text-secondary py-5 fw-semibold">No transactions found</div>
                    )}
                  </ListGroup>
                </Tab>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Wallet;
