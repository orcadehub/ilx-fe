import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Table, Badge as RBBadge } from 'react-bootstrap';
import { FileText } from 'react-bootstrap-icons';
import NewTable from '../components/NewTable'
import { Calendar, Check, CreditCard, Download, Eye, Smartphone } from 'lucide-react';
import { Badge as AntBadge, Modal } from 'antd';

function Billing() {
  // Conversion rate (1 USD = 83 INR)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const usdToInr = 83;
  const invoiceData = [
    {
      key: "1",
      date: "May 15, 2023",
      amount: 0.0,
      status: "Paid",
    },
    {
      key: "2",
      date: "Apr 15, 2023",
      amount: 0.0,
      status: "Paid",
    },
    {
      key: "3",
      date: "Mar 16, 2023",
      amount: 0.0,
      status: "Paid",
    },
  ];

  const invoiceColumns = [
    {
      title: (
        <div className="flex items-center gap-2 text-14 text-[var(--text)]">
          <Calendar className='text-purple-600 mr-2' size={16} /> Date
        </div>
      ),
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (text) => (
        <span className="text-12 !font-semibold text-[var(--text)]">{text}</span>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2 text-14 text-[var(--text)]">
          Plan
        </div>
      ),
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (text) => (
        <span className="text-12 !font-semibold text-[var(--text)]"> Pro Plan </span>
      ),
    },
    {
      title: <div className="text-14 text-[var(--text)]">Amount</div>,
      dataIndex: "amount",
      key: "amount",
      width: 100,
      align: "center",
      render: (amount) => (
        <span className="text-12 !font-semibold text-[var(--text)]">
          ₹{amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: <div className="text-14 text-[var(--text)] flex items-center"> <CreditCard className='text-purple-600 mr-2' size={16} />Payment Method</div>,
      dataIndex: "amount",
      key: "amount",
      width: 100,
      align: "center",
      render: (amount) => (
        <span className="text-12 !font-semibold text-[var(--text)] flex items-center justify-center">
          <Smartphone className='text-purple-600 mr-2' size={16} />{amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: <div className="text-14 text-[var(--text)]">Status</div>,
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (status) => (
        <RBBadge
          className={`px-2 py-1 ${status === "Paid" ? "!bg-green-100 !text-green-600" : "!bg-yellow-100 !text-yellow-600"}`}
        >
          {status}
        </RBBadge>
      ),
    },
    {
      title: <div className="text-14 text-[var(--text)]">Invoice</div>,
      key: "invoice",
      width: 120,
      align: "center",
      render: () => (
        <div className='flex justify-center items-center gap-4'>
          <Button
            // variant="link"
            className="text-12 !font-semibold !text-purple-600 !flex bg-transparent border-0 p-0 m-0"
            onClick={showModal}
          >
            <Eye className='text-purple-600 mr-2' size={16} />
            View
          </Button>

          <Button
            // variant="link"
            className="text-12 !font-semibold !text-purple-600 !flex bg-transparent border-0 p-0 m-0"
            onClick={() => alert("Downloading...")}
          >
            <Download className='text-purple-600 mr-2' size={16} />  Download
          </Button>

        </div>
      ),
    },
  ];
  const dataSource = (invoiceData || []).map((c) => ({ ...c, key: c._id }));

  return (
    <Container
      fluid
      className=" min-h-[100vh] !bg-[var(--bgPage2)] py-4 !px-5 xl:!px-15 !w-[100vw] md:!w-full"
    // style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}
    >
      {/* Header */}
      <div
      // style={{
      //   background: "linear-gradient(to right, #605cff, #4a00e0)",
      //   color: "#ffffff",
      //   padding: "20px 0",
      //   borderBottomLeftRadius: "20px",
      //   borderBottomRightRadius: "20px",
      // }}
      >
        <Container className='!p-0'>
          <Row className="align-items-center text-[var(--text)]">
            <Col>
              <h3 className="mb-0 !text-[25px] !font-semibold">Billing & Subscription</h3>
              {/* <small className="mb-0 text-[var(--mutedText)]" >Manage your plan and payments</small> */}
            </Col>
            {/* <Col className=" text-end">
              <Button variant="light" size="sm" className="rounded-pill">
                <CreditCard className="me-1" /> Add Payment
              </Button>
            </Col> */}
          </Row>
        </Container>
      </div>

      <div>
        <div className="!bg-[var(--bgPage2)] rounded border-0 w-full">
          <Row className="g-4 py-3 ">
            {/* Free Plan */}
            <Col md={6} xl={3}>
              <Card className="p-4 h-100 border !border-[var(--border)] hover:!border-blue-500  !bg-[var(--bg)] !text-[var(--text)]">
                <div className="">
                  <h4 className="mb-0 !font-semibold">Free</h4>
                  <h6 className='!text-[var(--mutedText)] text-14'>Basic features for individuals</h6>
                </div>
                <Card.Body>
                  <h3>₹0<span className='text-14 text-[var(--mutedText)]'>/month</span></h3>
                  <ul className="list-unstyled !flex flex-col !gap-2 text-[16px] font-medium">
                    <li className='flex gap-1 items-center '> <Check className='text-green-500' size={14} />  5 campaigns/month</li>
                    <li className='flex gap-1 items-center '> <Check className='text-green-500' size={14} />  Basic analytics</li>
                    <li className='flex gap-1 items-center '> <Check className='text-green-500' size={14} />  Email support</li>
                  </ul>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <Button className="w-100 !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)] hover:!bg-[var(--hover)] hover:!text-[var(--primary)]">
                    Current Plan
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
            {/* Standard Plan */}
            <Col md={6} xl={3}>
                <AntBadge.Ribbon text="Popular">
              <Card className="p-4 !h-100 border !border-blue-500  !bg-[var(--bg)] !text-[var(--text)] relative">
                {/* <div className='absolute top-1 right-1 !z-[11111]'>
                  <RBBadge className="px-2 py-1 !rounded-2xl !font-semibold !bg-blue-600">
                  Popular
                  </RBBadge>
                  </div> */}
                <div className="">
                    <h4 className="mb-0 !font-semibold">Basic Plan</h4>
                  <h6 className='!text-[var(--mutedText)] text-14'>Advanced features for growing businesses</h6>
                </div>
                <Card.Body>
                  <h3>₹{29 * usdToInr}<span className='text-14 text-[var(--mutedText)]'>/month</span></h3>
                  <ul className="list-unstyled !flex flex-col !gap-2 text-[16px] font-medium">
                    <li className='flex gap-1 items-center '><Check className='text-green-500' size={14} /> 25 campaigns/month</li>
                    <li className='flex gap-1 items-center '><Check className='text-green-500' size={14} /> Advanced analytics</li>
                    <li className='flex gap-1 items-center '><Check className='text-green-500' size={14} /> Priority support</li>
                    <li className='flex gap-1 items-center '><Check className='text-green-500' size={14} /> Custom reporting</li>
                  </ul>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <Button variant="primary" className="w-100">
                    Upgrade
                  </Button>
                </Card.Footer>
              </Card>
                </AntBadge.Ribbon>
            </Col>
            {/* Premium Plan */}
            <Col md={6} xl={3}>
              <Card className="p-4 h-100 border !border-[var(--border)] hover:!border-blue-500 !bg-[var(--bg)] !text-[var(--text)]">
                <div className="">
                  <h4 className="mb-0 !font-semibold">Pro Plan</h4>
                  <h6 className='!text-[var(--mutedText)] text-14'>Enterprise features for large teams</h6>
                </div>
                <Card.Body>
                  <h3>₹{99 * usdToInr}<span className='text-14 text-[var(--mutedText)]'>/month</span></h3>
                  <ul className="list-unstyled !flex flex-col !gap-2">
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> Unlimited campaigns</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> Real-time analytics</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> 24/7 support</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> Custom integrations</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> White-labeling</li>
                  </ul>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <Button className="w-100 !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)] hover:!bg-[var(--hover)] hover:!text-[var(--primary)]">
                    Upgrade
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            {/* Premium Plan */}
            <Col md={6} xl={3}>
              <Card className="p-4 h-100 border !border-[var(--border)] hover:!border-blue-500 !bg-[var(--bg)] !text-[var(--text)]">
                <div className="">
                  <h4 className="mb-0 !font-semibold">Advanced Plan</h4>
                  <h6 className='!text-[var(--mutedText)] text-14'>Enterprise features for large teams</h6>
                </div>
                <Card.Body>
                  <h3>₹{99 * usdToInr}<span className='text-14 text-[var(--mutedText)]'>/month</span></h3>
                  <ul className="list-unstyled !flex flex-col !gap-2">
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> Unlimited campaigns</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> Real-time analytics</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> 24/7 support</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> Custom integrations</li>
                    <li className='flex gap-1 items-center text-[16px] font-medium'><Check className='text-green-500' size={14} /> White-labeling</li>
                  </ul>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0">
                  <Button className="w-100 !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)] hover:!bg-[var(--hover)] hover:!text-[var(--primary)]">
                    Upgrade
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>

          {/* payment method */}
          <div className='mt-3 ' >
            <div className='p-3 !bg-[var(--card)] text-[var(--text)] border !border-[var(--border)] rounded'>
              <div>
                <h4>Payment Methods
                </h4>
                <h6 className="text-14 !text-[var(--mutedText)]">
                  View your recent invoices
                </h6>
              </div>
              <Col className="!mt-5">
                <Card className="p-1 h-100 border-0 !bg-[var(--card)] !text-[var(--text)]">
                  <div className="d-flex justify-content-between align-items-center ">
                    {/* <h6 className="mb-0">Payment Methods</h6>
                    <Button variant="link" size="sm">
                      Add
                    </Button> */}
                  </div>
                  <Card.Body>
                    <div className='border !border-[var(--border)] p-3 rounded-xl'>
                      <div className='flex items-center !justify-between' >
                        <div className='flex items-center gap-3 '>
                          <CreditCard />
                          <div>
                            <div>
                              **** **** **** 4242
                            </div>
                            <div>
                              Expires 12/25
                            </div>
                          </div>
                        </div>
                        <button className='hover:!bg-[var(--hover)] p-2 rounded text-12'>Edit</button>
                      </div>
                    </div>
                    <div className='mt-4'>
                      <button className='!bg-[var(--bgPage2)] hover:!bg-[var(--hover)] p-2 rounded text-12 border !border-[var(--border)]'>Add Payment Method</button>
                    </div>
                    {/* <div className="mb-3">
                        <small className="var[var(--mutedText)]">Visa ending in 4242</small>
                        <p>Expires 12/25</p>
                      </div>
                      <Button variant="outline-danger" size="sm" className="w-100">
                        Remove
                      </Button> */}
                  </Card.Body>
                </Card>
              </Col>


            </div>

          </div>

          {/* billing history */}
          <div className='mt-4' >
            <div className='p-3 !bg-[var(--card)] text-[var(--text)] border !border-[var(--border)] rounded'>
              <div><h4>Billing History
              </h4>
                <h6 className="text-14 !text-[var(--mutedText)]">
                  View your recent billing history
                </h6></div>
              <div className='border !border-[var(--border)] rounded overflow-hidden '>
                <NewTable
                  columns={invoiceColumns}
                  dataSource={dataSource}
                  onRow={(record) => ({
                    onClick: () => console.log(record)
                  })}
                />
              </div>

            </div>

          </div>
          {/* <Table striped bordered hover className="mt-3 !bg-[var(--bg)]">
            <thead>
              <tr>
                <th><FileText /> Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>May 15, 2023</td>
                <td>₹0.00</td>
                <td><Badge bg="success">Paid</Badge></td>
                <td><Button variant="link">Download</Button></td>
              </tr>
              <tr>
                <td>Apr 15, 2023</td>
                <td>₹0.00</td>
                <td><Badge bg="success">Paid</Badge></td>
                <td><Button variant="link">Download</Button></td>
              </tr>
              <tr>
                <td>Mar 16, 2023</td>
                <td>₹0.00</td>
                <td><Badge bg="success">Paid</Badge></td>
                <td><Button variant="link">Download</Button></td>
              </tr>
            </tbody>
          </Table> */}
        </div>
      </div>

      {/* Main Content */}

    </Container>
  );
}

export default Billing;