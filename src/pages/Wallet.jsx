import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Form, ListGroup, Badge } from 'react-bootstrap';
import { ArrowUpRight, ArrowDownLeft, ArrowRepeat, Wallet as WalletIcon } from 'react-bootstrap-icons';
import TabsButton from '../components/TabsButton';
import { Dropdown } from 'antd';
import { ChevronDown, Funnel, Plus, Gift, RefreshCcw, ArrowUp, ArrowDown } from 'lucide-react';

function Wallet() {
  const [amount, setAmount] = useState('');
  const [activeKey, setActiveKey] = useState('summary');
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
      case 'payment': return <ArrowDown  className="text-danger" />;
      // case 'refund': return <RefreshCcw size={18} className="text-warning" />;
      // case 'bonus': return <Gift size={20} className="text-info" />;
      default: return <ArrowUp className="text-green-500" />;
    }
  };

  const currentBalance = transactions.filter(tx => tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0);
  const totalSpent = transactions.filter(tx => tx.type === 'payment' && tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0);
  const totalWithdrawn = Math.abs(transactions.filter(tx => tx.type === 'refund' && tx.status === 'completed').reduce((sum, tx) => sum + tx.amount, 0));
  const data = [
    {
    label: "All",
      key: "all"
  },
  {
    label: "Deposit",
    key: "deposit"
    },
    {
      label: "Payment",
      key: "payment"
    },
    {
      label: "Refund",
      key: "refund"
    },
    {
      label: "Bonus",
      key: "bonus"
    },
  ];
  
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];
  
  return (
    <Container fluid
      // style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}
      className="p-1 md:p-4   !bg-[var(--bgPage2)] min-h-[100vh] text-[var(--text)]">
      {/* Header */}
      <div className=''
        // style={{
        //   background: 'linear-gradient(to right, #605cff, #4a00e0)',
        //   color: '#fff',
        //   padding: '20px 0',
        //   borderBottomLeftRadius: 20,
        //   borderBottomRightRadius: 20,
        // }}
      >
        <Container >
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0 !font-bold">My Wallet </h5>
              {/* <small>Manage your balance and payments</small> */}
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-4 xl:p-0">
        <div>
          {/* Left Side - Add Funds */}
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-3 xl:gap-4 mb-5 gap-2 ">
            {/* 1st Card - full width on mobile */}
            <Card className="border !border-[var(--border)] !bg-[var(--card)] p-3 !text-[var(--text)] col-span-1 md:col-span-2 xl:col-span-1">
              <div>
                <p className='mb-0'>Current Balance</p>
                <div className='text-[28px] !font-bold'>₹{currentBalance.toLocaleString('en-IN')}</div>

                <Form>
                  <Form.Group controlId="formAmount">
                    <div className='flex justify-center items-center gap-2 mt-3'>
                      <Form.Control
                        type="number"
                        min="1"
                        value={amount}
                        className='!py-[10px]'
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Enter amount"
                      />
                      <button
                        className="w-30 p-2 rounded text-12 flex justify-center items-center bg-[var(--primary)] text-white"
                        disabled={!amount}
                        onClick={handleAddFunds}
                      >
                        Add Funds
                      </button>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </Card>

            {/* 2nd and 3rd cards share row on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 col-span-1 md:col-span-2">
              <Card className="border !border-[var(--border)] !bg-[var(--card)] p-3 !text-[var(--text)]">
                <p className='mb-0'>Total Spent</p>
                <div className='text-[25px] md:text-[28px] !font-bold'>
                  ₹{Math.abs(totalSpent).toLocaleString('en-IN')}
                </div>
                <div className='text-[10px] md:!text-[12px] mt-4'>From order payments and services</div>
              </Card>

              <Card className="border !border-[var(--border)] !bg-[var(--card)] p-3 !text-[var(--text">
                <p className='mb-0'>Total Withdrawn</p>
                <div className='text-[25px] md:text-[28px] !font-bold'>
                  ₹{Math.abs(totalSpent).toLocaleString('en-IN')}
                </div>
                <div className='text-[10px]  md:!text-[12px] mt-4'>Including refunds and adjustments</div>
              </Card>
            </div>
          </div>


          {/* Right Side - Tabs */}
          <div>
            <Card className=" border-0 rounded"
              style={{ backgroundColor: 'var(--card)' }}>
              {/* <TabsButton activeKey={activeKey} data={data} setActiveKey={setActiveKey} /> */}
              {/* <Tabs defaultActiveKey="summary" justify variant="underline" */}
              {/* > */}
                {/* <Tab eventKey="summary" title="Summary"> */}
              {/* {activeKey == 'summary' &&
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
                  </Row>} */}
                {/* </Tab> */}

                {/* <Tab eventKey="transactions" title="Transactions"> */}
                  {/* <Tab eventKey="transactions" title="Transactions"> */}
                
                <ListGroup variant="flush" className="p-1 md:px-3 md:py-3 !border-0"
                  // style={{ maxHeight: '500px', overflowY: 'auto' }}
                >
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 mb-3">
                  {/* Tabs Section */}
                  <div className="w-full sm:w-auto">
                    <TabsButton
                      activeKey={activeFilter}
                      data={data}
                      setActiveKey={setActiveFilter}
                      wfit="true"
                    />
                  </div>

                  {/* Filter Section */}
                  <div className="w-full sm:w-auto flex justify-end">
                    <Dropdown
                      className="!text-[var(--text)] !bg-[var(--bgPage2)]"
                      menu={{ items }}
                      placement="bottom"
                      arrow={{ pointAtCenter: true }}
                    >
                      <button className="flex justify-between items-center gap-2 border !border-[var(--border)] h-fit rounded p-1 px-3 !text-[var(--text)] hover:text-[var(--primary)]">
                        <Funnel className="!text-[var(--text)]" size={16} /> Filter
                        <ChevronDown className="!text-[var(--text)]" size={16} />
                      </button>
                    </Dropdown>
                  </div>
                </div>

                    {filteredTransactions.length ? (
                      filteredTransactions.map(tx => (
                        <ListGroup.Item key={tx.id} className="d-flex justify-content-between align-items-center !text-[var(--text)] border !border-[var(--border)] !bg-[var(--card)]">
                          <div className="d-flex align-items-center gap-3">
                            <span className='!bg-[var(--hover2)] p-2 rounded-full'>
                            {getIcon(tx.type)}
                            </span>
                            <div>
                              <h6 className="mb-0 font-medium">{tx.description}</h6>
                              <small className="text-[var(--mutedText)] text-12">{tx.date} • {tx.time}</small>
                            </div>
                          </div>
                          <div className="text-end d-flex align-items-center gap-2">
                            <span className={`fw-bold text-14 ${tx.amount > 0 ? 'text-success' : 'text-danger'}`}>
                              {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                            </span>
                            {tx.status === 'pending' && (
                              <Badge className='!font-normal' bg="warning" text="dark" pill>Pending</Badge>
                            )}
                          </div>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <div className="text-center text-secondary py-5 fw-semibold">No transactions found</div>
                    )}
                  </ListGroup>
                {/* </Tab> */}
              {/* </Tabs> */}
            </Card>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default Wallet;
