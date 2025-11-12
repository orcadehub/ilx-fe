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
import { Download, FileText, Funnel } from "lucide-react";

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
      style={{ backgroundColor: "var(--bgPage2)", minHeight: "100vh" ,color: "var(--text)"}}
    >
      <Container fluid className="py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold" style={{ color: "var(--text)" }}>
            Reports
          </h4>
          <button
            // variant="outline-secondary"
            // size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className=" !bg-[var(--primary)] text-white flex justify-center items-center px-3 py-2 text-14 !rounded-xl "
            // style={{
            //   background: "linear-gradient(135deg, #1976d2, rgb(87, 52, 226))",
            //   border: "none",
            //   color: "#fff",
            //   borderRadius: "50px",
            //   padding: "0.6rem 1.5rem",
            //   fontWeight: 600,
            //   fontSize: "0.95rem",
            //   boxShadow: "0 4px 14px rgba(125, 104, 195, 0.25)",
            // }}
          >
            <Funnel size={14} className="me-2" /> Filters
          </button>
        </div>

        {/* Filters Collapse */}
        <Collapse in={showFilters}>
          <div className="mb-4">
            <Card
              className="p-4 !font-medium border !border-[var(--border)] rounded-xl !text-[var(--text)]"
              style={{ backgroundColor: "var(--card)" }}
            >
              <Row className="g-3 align-items-end">
                <Col md={4} xl={4}>
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
                      className='placeholder:!text-[var(--mutedText)]'
                    />
                  </InputGroup>
                </Col>
                <Col md={4} xl={3}>
                  <Form.Label className="fw-semibold">From Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.from}
                    onChange={(e) =>
                      setFilters({ ...filters, from: e.target.value })
                    }
                  />
                </Col>
                <Col md={4} xl={3}>
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
                <Col md={12} xl={2} className="text-end d-flex gap-2">
                  <Button
                   
                    className="w-50 bg-transparent border !border-[var(--border)] !text-[var(--text)] hover:!text-[var(--primary)] hover:!bg-[var(--hover)]"
                    onClick={() => setFilters({ search: "", from: "", to: "" })}
                  >
                    Clear
                  </Button>
                  <Button
                    // variant="primary"
                    className="w-50 !bg-[var(--primary)]"
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
        <Modal  show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header className='bg-[var(--card)] border !border-[var(--border)] text-[var(--text)]' closeButton>
            <Modal.Title className='flex items-center !text-[18px]'>
              <FaClipboardList className="me-2" />
              Request Report
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-[var(--card)] border !border-[var(--border)] text-[var(--text)]'>
            <Form>
              <Form.Group className="mb-3 text-14">
                <Form.Label>Report Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter report name"
                  // className="!bg-[var(--bg)] placeholder:red-300"
                  value={reportRequest.name}
                  onChange={(e) =>
                    setReportRequest({ ...reportRequest, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 text-14 !bg-[var(--card)] text-[var(--text)]">
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                  value={reportRequest.type}
                  className='!bg-[var(--card)] !text-[var(--text)] border !border-[var(--border)] text-14'
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
        <div className="w-100 d-flex justify-content-between mb-3 bg-[var(--hover2)] p-1 rounded-xl">
          {["all", "completed", "pending","requested"].map((key) => (
            <button
              key={key}
              className={`btn w-100 text-center !font-medium text-14 py-1 border-0 !text-[var(--text)] 
                ${activeTab === key
                  ? " border-bottom border-2 border-primary !bg-[var(--bg)]"
                  : ""
                }`}
              onClick={() => setTab(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
            // <Button
            //   key={key}
            //   variant="link"
            //   className={`text-capitalize px-3 py-2 border-0 rounded-0 ${
            //     activeTab === key
            //       ? "border-bottom border-primary fw-semibold"
            //       : "text-muted"
            //   }`}
            //   style={{
            //     textDecoration: "none",
            //     borderBottom:
            //       activeTab === key
            //         ? "3px solid #0d6efd"
            //         : "3px solid transparent",
            //     transition: "border-color 0.3s",
            //     borderRadius: "10px",
            //     width: "33.3%",
            //     textAlign: "center",
            //   }}
            //   onClick={() => setTab(key)}
            // >
            //   {key}
            // </Button>
          ))}
        </div>

        {/* Report Cards */}
        <Row className="g-4 mt-3">
          {filtered.length ? (
            filtered.map((r, i) => (
              <Col key={i} md={6} lg={4} xl={4}>
                <Card
                  className=" hover:shadow-lg h-100 rounded-4 !bg-[var(--card)] border !border-[var(--border)]"
                  // style={{ backgroundColor: "var(--bg)" }}
                >
                  <Card.Body className="d-flex flex-column justify-content-between !text-[var(--mutedText)]">
                    <div>
                      <div className="d-flex align-items-center justify-between mb-3">
                        <div>
                          <h6 className="fw-semibold !text-[var(--text)] mb-0">{r.id}</h6>
                        </div>
                        <div className=" p-2 rounded me-3">
                          <FileText className="text-success fs-4" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-14">
                        <span>Order Placed Date:</span> {r.orderPlaced}
                      </div>
                      <div className="flex items-center justify-between text-14">
                        <span>Order:</span> {r.orderName}
                      </div>
                      <div className="flex items-center justify-between text-14">
                        <spam>Range:</spam> {r.dateRange}
                      </div>
                      <div className={`flex items-center justify-between text-14`}>
                        Payment Status: <span className={` ${r.paymentStatus === "Completed" ? "text-success" : ""}`}>{r.paymentStatus}</span> 
                      </div>
                      {/* <Badge
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
                      </Badge> */}
                    </div>
                    {r.paymentStatus === "Pending" ? <button
                      // variant="outline-primary"
                      className="mt-3 !rounded-lg py-2 !bg-[var(--primary)] !text-white flex justify-center items-center"
                      // onClick={() => toast.info(`Downloading ${r.reportName}`)}
                    >
                      <Download className="mr-1" size={16} />  Pay & Download
                    </button>
                    :
                    <button
                      // variant="outline-primary"
                      className="mt-3 !rounded-lg py-2 !bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)] flex justify-center items-center hover:!bg-[var(--hover)]"
                      onClick={() => toast.info(`Downloading ${r.reportName}`)}
                    >
                      <Download className="mr-1" size={16} /> Download
                    </button>}
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
                  <Card.Body className="flex justify-center items-center flex-column">
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
