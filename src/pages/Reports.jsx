/*BusinessREport*/
import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, Button, Form, 
  Modal, InputGroup, Badge
} from 'react-bootstrap';
import { 
  FaSearch, FaDownload, FaFileExcel, FaCalendarAlt, 
  FaFilter, FaTimes, FaCheckCircle, FaClock 
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Reports.css'; // Create this CSS file

function Reports() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const reports = [
    { id: 'REP0001', orderPlaced: '2023-10-02', orderName: 'Campaign X', dateRange: '2023-01-01 to 2023-01-31', paymentStatus: 'Completed', reportName: 'REP0001_Campaign_X.xlsx' },
    { id: 'REP0002', orderPlaced: '2023-04-27', orderName: 'Campaign Y', dateRange: '2023-02-01 to 2023-02-28', paymentStatus: 'Pending', reportName: 'REP0002_Campaign_Y.xlsx' },
    { id: 'REP0003', orderPlaced: '2023-09-14', orderName: 'Campaign Z', dateRange: '2023-03-01 to 2023-03-31', paymentStatus: 'Completed', reportName: 'REP0003_Campaign_Z.xlsx' },
    { id: 'REP0004', orderPlaced: '2023-11-05', orderName: 'Q3 Sales Analysis', dateRange: '2023-07-01 to 2023-09-30', paymentStatus: 'Completed', reportName: 'REP0004_Q3_Sales.xlsx' },
    { id: 'REP0005', orderPlaced: '2023-08-22', orderName: 'Social Media Engagement', dateRange: '2023-06-01 to 2023-06-30', paymentStatus: 'Pending', reportName: 'REP0005_Social_Media.xlsx' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.orderName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = (!fromDate || report.orderPlaced >= fromDate) && 
                       (!toDate || report.orderPlaced <= toDate);
    const matchesStatus = activeTab === 'all' || 
                         (activeTab === 'completed' && report.paymentStatus === 'Completed') ||
                         (activeTab === 'pending' && report.paymentStatus === 'Pending');
    return matchesSearch && matchesDate && matchesStatus;
  });

  const [requestForm, setRequestForm] = useState({ orderName: '', fromDate: '', toDate: '' });
  const handleRequestChange = e => setRequestForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleRequestSubmit = () => {
    toast.success('Report request submitted!', {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
    setRequestForm({ orderName: '', fromDate: '', toDate: '' });
    setShowRequestModal(false);
  };

  const handleDownload = (report, pay = false) => {
    if (pay) {
      toast.info(`Processing payment for ${report.reportName}...`, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      
      setTimeout(() => {
        toast.success(`Payment successful! Downloading ${report.reportName}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }, 2000);
    } else {
      toast.success(`Downloading ${report.reportName}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const CustomTab = ({ eventKey, title, active }) => (
    <Button
      variant={active ? "primary" : "outline-primary"}
      className={`rounded-pill px-4 py-2 mx-1 mb-2 mb-md-0 ${active ? "shadow" : ""}`}
      onClick={() => setActiveTab(eventKey)}
      style={{ borderRadius: "50px", fontWeight: "600", minWidth: "140px", transition: "all 0.3s ease" }}
    >
      {title}
    </Button>
  );

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm py-3 elegant-entrance">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <h1 className="h3 fw-bold mb-0">Business Reports</h1>
              <p className="text-muted mb-0">Access and manage your reports</p>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 py-4">
        <Container fluid>
          {/* Filters Section */}
          <Card className="mb-4 shadow-sm border-0 elegant-float">
            <Card.Body className="p-3">
              <Row className="g-3 align-items-end">
                <Col xs={12} md={6} lg={3}>
                  <Form.Group>
                    <Form.Label className="small fw-medium mb-1">Search reports</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white"><FaSearch className="text-muted" /></InputGroup.Text>
                      <Form.Control 
                        type="text" 
                        placeholder="Search by order name or ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                
                <Col xs={6} md={3} lg={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium mb-1">From Date</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white"><FaCalendarAlt className="text-muted" /></InputGroup.Text>
                      <Form.Control 
                        type="date" 
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                
                <Col xs={6} md={3} lg={2}>
                  <Form.Group>
                    <Form.Label className="small fw-medium mb-1">To Date</Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white"><FaCalendarAlt className="text-muted" /></InputGroup.Text>
                      <Form.Control 
                        type="date" 
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        min={fromDate}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                
                <Col xs={12} md={6} lg={3} className="mt-2 mt-md-0">
                  <Button variant="outline-primary" className="w-100 py-2 rounded-pill" onClick={() => setShowRequestModal(true)}>
                    <FaFilter className="me-2" />Request Report
                  </Button>
                </Col>
              </Row>
              
              {/* Custom Status Tabs */}
              <div className="mt-3 d-flex flex-wrap justify-content-center">
                <CustomTab eventKey="all" title="All Reports" active={activeTab === 'all'} />
                <CustomTab eventKey="completed" title="Completed" active={activeTab === 'completed'} />
                <CustomTab eventKey="pending" title="Pending" active={activeTab === 'pending'} />
              </div>
            </Card.Body>
          </Card>

          {/* Reports Grid */}
          <Row className="g-4">
            {filteredReports.length > 0 ? filteredReports.map((report, index) => (
              <Col key={index} xs={12} md={6} lg={4} xl={3}>
                <Card 
                  className="shadow-sm h-100 border-0 luxury-card" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card.Body className="p-3 d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 text-primary p-2 rounded me-3 luxury-shine">
                        <FaFileExcel className="fs-4" />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0">{report.id}</h5>
                        <small className="text-muted">{report.orderPlaced}</small>
                      </div>
                    </div>
                    
                    <div className="mb-3 flex-grow-1">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Order:</span>
                        <span className="fw-medium">{report.orderName}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Date Range:</span>
                        <span>{report.dateRange}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Status:</span>
                        <Badge bg={report.paymentStatus === 'Completed' ? 'success' : 'warning'} className="fs-6 d-flex align-items-center">
                          {report.paymentStatus === 'Completed' ? <FaCheckCircle className="me-1" /> : <FaClock className="me-1" />}
                          {report.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between border-top pt-2">
                      <span className="text-muted">Report:</span>
                      <span className="fw-bold text-truncate ms-2" style={{ maxWidth: '60%' }}>{report.reportName}</span>
                    </div>
                    
                    <div className="mt-3">
                      {report.paymentStatus === 'Completed' ? (
                        <Button variant="outline-success" className="w-100 d-flex align-items-center justify-content-center rounded-pill py-2 luxury-hover"
                          onClick={() => handleDownload(report)}>
                          <FaDownload className="me-2" />Download
                        </Button>
                      ) : (
                        <Button variant="warning" className="w-100 d-flex align-items-center justify-content-center rounded-pill py-2 luxury-hover"
                          onClick={() => handleDownload(report, true)}>
                          <FaDownload className="me-2" />Pay & Download
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )) : (
              <Col className="text-center py-5">
                <div className="bg-light rounded-circle p-4 d-inline-block mb-3 luxury-shine">
                  <FaFileExcel className="text-muted fs-1" />
                </div>
                <h4 className="fw-bold">No reports found</h4>
                <p className="text-muted mb-4">Try adjusting your search or filter criteria</p>
                <Button variant="primary" className="rounded-pill px-4 py-2 luxury-pulse" onClick={() => {
                  setSearchTerm(''); setFromDate(''); setToDate(''); setActiveTab('all');
                }}>Clear Filters</Button>
              </Col>
            )}
          </Row>
        </Container>
      </main>

      {/* Footer */}
      <footer className="bg-white border-top py-3 elegant-entrance">
        <Container fluid>
          <div className="text-center text-muted small">
            &copy; {new Date().getFullYear()} Business Reports. All rights reserved.
          </div>
        </Container>
      </footer>

      {/* Request Report Modal */}
      <Modal show={showRequestModal} onHide={() => setShowRequestModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Request Custom Report</Modal.Title>
          <Button variant="link" onClick={() => setShowRequestModal(false)} className="p-0"><FaTimes /></Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Order Name / Number</Form.Label>
              <Form.Control
                type="text"
                name="orderName"
                value={requestForm.orderName}
                onChange={handleRequestChange}
                placeholder="Enter order name or number"
                required
              />
            </Form.Group>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium">From Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="fromDate"
                    value={requestForm.fromDate}
                    onChange={handleRequestChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-medium">To Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="toDate"
                    value={requestForm.toDate}
                    onChange={handleRequestChange}
                    min={requestForm.fromDate}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-end gap-2 mt-4 pt-2">
              <Button variant="outline-secondary" className="rounded-pill px-4" onClick={() => setShowRequestModal(false)}>Cancel</Button>
              <Button 
                variant="primary" 
                className="rounded-pill px-4"
                onClick={handleRequestSubmit}
                disabled={!requestForm.orderName || !requestForm.fromDate || !requestForm.toDate}
              >Submit Request</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Reports;