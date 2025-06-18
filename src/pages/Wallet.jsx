/Wallet.jsx/
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
import './Wallet.css';

// Animation variants
const fadeIn = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } 
};

const cardHover = { 
  hover: { 
    y: -5, 
    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15)", 
    transition: { duration: 0.3 } 
  } 
};

const listItem = { 
  hidden: { opacity: 0, x: -30 }, 
  visible: (i) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { 
      delay: i * 0.05, 
      duration: 0.5 
    } 
  }) 
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

  const filteredTransactions = activeFilter === 'all'
    ? transactions
    : transactions.filter(tx => tx.type === activeFilter);

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

  const formatDate = d => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const getIcon = type => {
    switch (type) {
      case 'deposit': return <Plus className="text-success" />;
      case 'payment': return <ArrowUpRight className="text-danger" />;
      case 'refund': return <ArrowRepeat className="text-warning" />;
      case 'bonus': return <Gift className="text-info" />;
      default: return <WalletIcon className="text-primary" />;
    }
  };

  const currentBalance = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalSpent = transactions
    .filter(tx => tx.type === 'payment' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalWithdrawn = Math.abs(transactions
    .filter(tx => tx.type === 'refund' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0));

  return (
    <Container fluid className="wallet-container">
      <Row className="justify-content-center">
        <Col>
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Card className="wallet-card">
              <Card.Body className="p-4 p-md-5">

                {/* Header */}
                <div className="text-center mb-5">
                  <h2 className="fw-bold text-dark mb-3">My Wallet</h2>
                  <p className="text-muted">Manage your funds and transactions</p>
                </div>

                {/* Summary Cards - Optimized Width and Spacing */}
                <Row className="mb-5 justify-content-around g-3">
                  {[ 
                    { 
                      title: 'Current Balance', 
                      value: `₹${currentBalance.toLocaleString('en-IN')}`, 
                      icon: <CreditCard size={20} className="text-primary" />,
                      className: 'bg-primary-light',
                      colSize: { xxl: 3, xl: 4, lg: 4, md: 5, sm: 8 }
                    },
                    { 
                      title: 'Total Spent', 
                      value: `₹${Math.abs(totalSpent).toLocaleString('en-IN')}`, 
                      subtitle: 'From payments',
                      icon: <ArrowUpRight size={20} className="text-danger" />,
                      className: 'bg-danger-light',
                      colSize: { xxl: 3, xl: 4, lg: 4, md: 5, sm: 8 }
                    },
                    { 
                      title: 'Total Withdrawn', 
                      value: `₹${totalWithdrawn.toLocaleString('en-IN')}`, 
                      subtitle: 'Including refunds',
                      icon: <ArrowDownLeft size={20} className="text-success" />,
                      className: 'bg-success-light',
                      colSize: { xxl: 3, xl: 4, lg: 4, md: 5, sm: 8 }
                    }
                  ].map((item, idx) => (
                    <Col 
                      key={idx}
                      xxl={item.colSize.xxl}
                      xl={item.colSize.xl}
                      lg={item.colSize.lg}
                      md={item.colSize.md}
                      sm={item.colSize.sm}
                      className="px-2"
                    >
                      <motion.div
                        variants={fadeIn}
                        custom={idx}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: idx * 0.1 }}
                        whileHover="hover"
                      >
                        <motion.div variants={cardHover}>
                          <Card className={`summary-card ${item.className} h-100`}>
                            <Card.Body className="p-3 d-flex flex-column">
                              <div className="d-flex align-items-center mb-2">
                                <div className="icon-container-sm me-2">
                                  {item.icon}
                                </div>
                                <h6 className="mb-0" style={{ fontSize: '0.9rem' }}>{item.title}</h6>
                              </div>
                              <div className="mt-auto">
                                <h3 className="fw-bold mb-1" style={{ fontSize: '1.4rem' }}>{item.value}</h3>
                                {item.subtitle && (
                                  <p className="small text-muted mb-0" style={{ fontSize: '0.75rem' }}>{item.subtitle}</p>
                                )}
                              </div>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      </motion.div>
                    </Col>
                  ))}
                </Row>

                {/* Add Funds Section */}
                <motion.div variants={fadeIn} className="mb-5">
                  <Card className="border-0 shadow-sm bg-light h-100">
                    <Card.Body className="p-4 d-flex flex-column">
                      <h5 className="fw-bold mb-4">Add Funds</h5>
                      <div className="mt-auto">
                        <Form className="d-flex gap-3 align-items-end">
                          <div className="flex-grow-1">
                            <Form.Label className="text-muted small">Amount</Form.Label>
                            <Form.Control
                              type="number"
                              value={amount}
                              onChange={e => setAmount(e.target.value)}
                              placeholder="Enter amount"
                              className="shadow-none border-2 py-3"
                              min="1"
                            />
                          </div>
                          <motion.div whileTap={{ scale: 0.95 }}>
                            <Button variant="dark" className=" d-flex align-items-center gap-2" onClick={handleAddFunds} disabled={!amount}>
                              <Plus  /> Add Funds
                            </Button>
                          </motion.div>
                        </Form>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>

                {/* Transaction History */}
                <motion.div variants={fadeIn}>
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body className="p-0 d-flex flex-column">
                      {/* Header & Filters */}
                      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold mb-0">Transaction Details</h5>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline-dark" size="sm" className="d-flex align-items-center">
                            <Funnel size={14} className="me-1" /> Filter
                          </Button>
                        </motion.div>
                      </div>
                      <div className="p-3 bg-light border-bottom d-flex flex-wrap gap-2">
                        {['all','deposit','payment','refund','bonus'].map(f => (
                          <motion.div key={f} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant={activeFilter === f ? 'dark' : 'outline-dark'}
                              className="text-capitalize px-3"
                              onClick={() => setActiveFilter(f)}
                            >
                              {f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)}
                            </Button>
                          </motion.div>
                        ))}
                      </div>

                      {/* List or Empty State */}
                      {filteredTransactions.length > 0 ? (
                        <div className="transaction-list flex-grow-1">
                          <AnimatePresence>
                            {filteredTransactions.map((tx, i) => (
                              <motion.div
                                key={tx.id}
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0 }}
                                variants={listItem}
                                className="transaction-item"
                              >
                                <div className="d-flex align-items-center p-3 border-bottom">
                                  <div className="transaction-icon me-3">{getIcon(tx.type)}</div>
                                  <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                      <h6 className="mb-0 fw-bold">{tx.description}</h6>
                                      <span className={`fw-bold ${tx.amount > 0 ? 'text-success' : 'text-danger'}`}>
                                        {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                      </span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-1">
                                      <small className="text-muted">{formatDate(tx.date)} • {tx.time}</small>
                                      {tx.status === 'pending' && <Badge bg="warning" text="dark" className="ms-2">Pending</Badge>}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-5 border-2 rounded bg-light m-3 d-flex flex-column justify-content-center align-items-center flex-grow-1">
                          <p className="text-muted mb-1">No transactions found</p>
                          <h4 className="fw-bold text-muted">₹0.00</h4>
                        </motion.div>
                      )}
                    </Card.Body>
                  </Card>
                </motion.div>

              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default Wallet;