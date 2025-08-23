import React from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab, Table, Badge } from 'react-bootstrap';
import { CreditCard, FileText } from 'react-bootstrap-icons';

function Billing() {
  // Conversion rate (1 USD = 83 INR)
  const usdToInr = 83;

  return (
    <Container
      fluid
      className="p-0"
      style={{ backgroundColor: "#f1f5f9", minHeight: "100vh" }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(to right, #605cff, #4a00e0)",
          color: "#ffffff",
          padding: "20px 0",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col>
              <h5 className="mb-0">Billing & Subscription</h5>
              <small>Manage your plan and payments</small>
            </Col>
            <Col className="text-end">
              <Button variant="light" size="sm" className="rounded-pill">
                <CreditCard className="me-1" /> Add Payment
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="mt-4">
        <Row>
          {/* Left Side - Payment Methods */}
          <Col lg={3} md={12} className="mb-4">
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center border-bottom">
                <h6 className="mb-0">Payment Methods</h6>
                <Button variant="link" size="sm">
                  Add
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <small className="text-muted">Visa ending in 4242</small>
                  <p>Expires 12/25</p>
                </div>
                <Button variant="outline-danger" size="sm" className="w-100">
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Tabs */}
          <Col lg={9} md={12}>
            <Card className="shadow-sm border-0 rounded" style={{ backgroundColor: "#f8f9fa" }}>
              <Tabs defaultActiveKey="plans" justify variant="underline">
                <Tab eventKey="plans" title="Plans">
                  <Row className="g-4 p-3">
                    {/* Free Plan */}
                    <Col md={4}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Header className="bg-light">
                          <h5 className="mb-0">Free</h5>
                        </Card.Header>
                        <Card.Body>
                          <h3>₹0 / mo</h3>
                          <ul className="list-unstyled">
                            <li>✓ 5 campaigns/month</li>
                            <li>✓ Basic analytics</li>
                            <li>✓ Email support</li>
                          </ul>
                        </Card.Body>
                        <Card.Footer className="bg-transparent">
                          <Badge bg="secondary">Current Plan</Badge>
                        </Card.Footer>
                      </Card>
                    </Col>
                    {/* Standard Plan */}
                    <Col md={4}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Header className="bg-primary text-white">
                          <h5 className="mb-0">Standard</h5>
                        </Card.Header>
                        <Card.Body>
                          <h3>₹{29 * usdToInr} / mo</h3>
                          <ul className="list-unstyled">
                            <li>✓ 25 campaigns/month</li>
                            <li>✓ Advanced analytics</li>
                            <li>✓ Priority support</li>
                            <li>✓ Custom reporting</li>
                          </ul>
                        </Card.Body>
                        <Card.Footer className="bg-transparent">
                          <Button variant="primary" className="w-100">
                            Upgrade
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                    {/* Premium Plan */}
                    <Col md={4}>
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Header className="bg-warning text-dark">
                          <h5 className="mb-0">Premium</h5>
                        </Card.Header>
                        <Card.Body>
                          <h3>₹{99 * usdToInr} / mo</h3>
                          <ul className="list-unstyled">
                            <li>✓ Unlimited campaigns</li>
                            <li>✓ Real-time analytics</li>
                            <li>✓ 24/7 support</li>
                            <li>✓ Custom integrations</li>
                            <li>✓ White-labeling</li>
                          </ul>
                        </Card.Body>
                        <Card.Footer className="bg-transparent">
                          <Button variant="warning" className="w-100">
                            Upgrade
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="history" title="Billing History">
                  <Table striped bordered hover className="mt-3">
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
                  </Table>
                </Tab>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Billing;