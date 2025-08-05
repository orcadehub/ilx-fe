import React, { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  InputGroup,
  Badge,
  Collapse,
} from "react-bootstrap";
import {
  FaSearch,
  FaDownload,
  FaFileExcel,
  FaFilter,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";

const reportData = [
  {
    id: "REP0001",
    orderPlaced: "2023-10-02",
    orderName: "Campaign X",
    dateRange: "2023-01-01 to 2023-01-31",
    paymentStatus: "Completed",
    reportName: "REP0001_Campaign_X.xlsx",
  },
  {
    id: "REP0002",
    orderPlaced: "2023-04-27",
    orderName: "Campaign Y",
    dateRange: "2023-02-01 to 2023-02-28",
    paymentStatus: "Pending",
    reportName: "REP0002_Campaign_Y.xlsx",
  },
  {
    id: "REP0003",
    orderPlaced: "2023-09-14",
    orderName: "Campaign Z",
    dateRange: "2023-03-01 to 2023-03-31",
    paymentStatus: "Completed",
    reportName: "REP0003_Campaign_Z.xlsx",
  },
];

function Reports() {
  const [filters, setFilters] = useState({ search: "", from: "", to: "" });
  const [activeTab, setTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reportRequest, setReportRequest] = useState({
    name: "",
    type: "",
    from: "",
    to: "",
  });

  const filtered = reportData.filter(
    ({ orderName, id, orderPlaced, paymentStatus }) => {
      const matchSearch = [orderName, id].some((f) =>
        f.toLowerCase().includes(filters.search.toLowerCase())
      );
      const matchDate =
        (!filters.from || orderPlaced >= filters.from) &&
        (!filters.to || orderPlaced <= filters.to);
      const matchStatus =
        activeTab === "all" || paymentStatus.toLowerCase() === activeTab;
      return matchSearch && matchDate && matchStatus;
    }
  );

  return (
    <div
      className="px-3"
      style={{ backgroundColor: "var(--primary-color)", minHeight: "100vh" }}
    >
      <Container fluid className="py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold" style={{ color: "#1a237e" }}>
            Business Reports
          </h4>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            style={{
              background: "linear-gradient(135deg, #1976d2, rgb(87, 52, 226))",
              border: "none",
              color: "#fff",
              borderRadius: "50px",
              padding: "0.6rem 1.5rem",
              fontWeight: 600,
              fontSize: "0.95rem",
              boxShadow: "0 4px 14px rgba(125, 104, 195, 0.25)",
            }}
          >
            <FaFilter className="me-2" /> Filters
          </Button>
        </div>

        {/* Filters Collapse */}
        <Collapse in={showFilters}>
          <div className="mb-4">
            <Card
              className="p-4 shadow-sm border-0 rounded-3"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <Row className="g-3 align-items-end">
                <Col md={4}>
                  <Form.Label className="fw-semibold">
                    Search Order / ID
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Search by order or ID"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                    />
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Label className="fw-semibold">From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.from}
                    onChange={(e) =>
                      setFilters({ ...filters, from: e.target.value })
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Label className="fw-semibold">To Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.to}
                    min={filters.from}
                    onChange={(e) =>
                      setFilters({ ...filters, to: e.target.value })
                    }
                  />
                </Col>
                <Col md={2} className="text-end d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    className="w-50"
                    onClick={() => setFilters({ search: "", from: "", to: "" })}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    className="w-50"
                    onClick={() => setShowModal(true)}
                  >
                    Request
                  </Button>
                </Col>
              </Row>
            </Card>
          </div>
        </Collapse>

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <FaClipboardList className="me-2" />
              Request Report
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Report Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter report name"
                  value={reportRequest.name}
                  onChange={(e) =>
                    setReportRequest({ ...reportRequest, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                  value={reportRequest.type}
                  onChange={(e) =>
                    setReportRequest({ ...reportRequest, type: e.target.value })
                  }
                >
                  <option value="">Select type</option>
                  <option value="campaign">Campaign Report</option>
                  <option value="sales">Sales Analysis</option>
                  <option value="engagement">Engagement Report</option>
                </Form.Select>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                      type="date"
                      value={reportRequest.from}
                      onChange={(e) =>
                        setReportRequest({
                          ...reportRequest,
                          from: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                      type="date"
                      min={reportRequest.from}
                      value={reportRequest.to}
                      onChange={(e) =>
                        setReportRequest({
                          ...reportRequest,
                          to: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-end">
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    console.log("Submitted:", reportRequest);
                    setShowModal(false);
                    setReportRequest({ name: "", type: "", from: "", to: "" });
                  }}
                >
                  Submit Request
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Tab Filter */}
        <div className="w-100 d-flex justify-content-between mb-3">
          {["all", "completed", "pending"].map((key) => (
            <Button
              key={key}
              variant="link"
              className={`text-capitalize px-3 py-2 border-0 rounded-0 ${
                activeTab === key
                  ? "border-bottom border-primary fw-semibold"
                  : "text-muted"
              }`}
              style={{
                textDecoration: "none",
                borderBottom:
                  activeTab === key
                    ? "3px solid #0d6efd"
                    : "3px solid transparent",
                transition: "border-color 0.3s",
                borderRadius: "10px",
                width: "33.3%",
                textAlign: "center",
              }}
              onClick={() => setTab(key)}
            >
              {key}
            </Button>
          ))}
        </div>

        {/* Report Cards */}
        <Row className="g-4 mt-3">
          {filtered.length ? (
            filtered.map((r, i) => (
              <Col key={i} md={6} lg={4} xl={3}>
                <Card
                  className="border-0 shadow-lg h-100 rounded-4"
                  style={{ backgroundColor: "#fff" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-light p-2 rounded me-3">
                          <FaFileExcel className="text-success fs-4" />
                        </div>
                        <div>
                          <h6 className="fw-semibold mb-0">{r.id}</h6>
                          <small className="text-muted">{r.orderPlaced}</small>
                        </div>
                      </div>
                      <div>
                        <strong>Order:</strong> {r.orderName}
                      </div>
                      <div>
                        <strong>Range:</strong> {r.dateRange}
                      </div>
                      <Badge
                        bg={
                          r.paymentStatus === "Completed"
                            ? "success"
                            : "secondary"
                        }
                        className="mt-2"
                      >
                        {r.paymentStatus === "Completed" ? (
                          <FaCheckCircle className="me-1" />
                        ) : (
                          <FaClock className="me-1" />
                        )}
                        {r.paymentStatus}
                      </Badge>
                    </div>
                    <Button
                      variant="outline-primary"
                      className="mt-3 rounded-pill"
                      onClick={() => toast.info(`Downloading ${r.reportName}`)}
                    >
                      <FaDownload className="me-2" /> Download
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card
                className="text-center py-5 border-0 shadow-sm rounded-4"
                style={{ backgroundColor: "#f1f5f9" }}
              >
                <Card.Body>
                  <FaFileExcel className="fs-1 text-muted mb-3" />
                  <h5>No Reports Found</h5>
                  <p className="text-muted">
                    Try adjusting your filters or search.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Reports;
