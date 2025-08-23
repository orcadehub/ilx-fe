import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Badge,
  Collapse,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  FunnelFill,
  ArrowCounterclockwise,
  Eye,
  XCircle,
  CreditCard,
  Calendar,
  Clock,
  BoxSeam,
  Tag,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import config from "../config";

const customStyles = `
  .custom-select {
    border: 1px solid hsl(214.3, 25%, 85%);
    border-radius: 30px;
    background-color: hsl(214.3, 31.8%, 98%);
    color: hsl(220, 15%, 30%);
    padding: 0.5rem 1rem;
    font-weight: 500;
    box-shadow: none;
    transition: border-color 0.2s ease-in-out;
  }

  .custom-select:focus {
    border-color: hsl(214.3, 40%, 75%);
    box-shadow: 0 0 0 0.15rem hsla(214.3, 40%, 75%, 0.3);
    outline: none;
    background-color: hsl(214.3, 31.8%, 95%);
  }

  .custom-select option {
    background-color: hsl(214.3, 31.8%, 98%) !important;
    color: hsl(220, 15%, 30%) !important;
  }

  .info-section {
    background-color: hsl(214.3, 31.8%, 98%);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid hsl(214.3, 25%, 90%);
  }

  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .info-icon {
    margin-right: 0.75rem;
    color: hsl(220, 10%, 50%);
    min-width: 20px;
  }
`;

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

// Scheduled Information Component
const ScheduledInfo = ({ date, time }) => (
  <div className="info-section">
    <h6 className="fw-bold mb-3" style={{ color: "#5c4d7d" }}>
      Scheduled Information
    </h6>
    <div className="info-item">
      <Calendar className="info-icon" />
      <span className="me-2 fw-medium">Date:</span>
      <span style={{ color: "#495057" }}>{date || "Not scheduled"}</span>
    </div>
    <div className="info-item">
      <Clock className="info-icon" />
      <span className="me-2 fw-medium">Time:</span>
      <span style={{ color: "#495057" }}>{time || "Not scheduled"}</span>
    </div>
  </div>
);

// Product Information Component
const ProductInfo = ({ type, product, category }) => (
  <div className="info-section">
    <h6 className="fw-bold mb-3" style={{ color: "#5c4d7d" }}>
      Product Details
    </h6>
    <div className="info-item">
      <Tag className="info-icon" />
      <span className="me-2 fw-medium">Type:</span>
      <span style={{ color: "#495057" }}>{type}</span>
    </div>
    <div className="info-item">
      <BoxSeam className="info-icon" />
      <span className="me-2 fw-medium">Product:</span>
      <span style={{ color: "#495057" }}>{product}</span>
    </div>
    <div className="info-item">
      <Tag className="info-icon" />
      <span className="me-2 fw-medium">Category:</span>
      <Badge bg="info" className="px-2 py-1">
        {category}
      </Badge>
    </div>
  </div>
);

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    type: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [tabKey, setTabKey] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const types = [
    "Post",
    "Reel",
    "Short Video",
    "Long Video",
    "Polls",
    "Combo Package",
  ];

  const parseDate = (dt) =>
    dt
      ? new Date(dt).toLocaleString("default", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const localUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User not authenticated: No token found");
        }

        const response = await fetch(`${baseURL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch orders");
        }

        const data = await response.json();
        console.log("Fetched orders:", data.orders); // Debug log
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Fetch orders error:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          (!filters.from || new Date(o.orderDate) >= new Date(filters.from)) &&
          (!filters.to || new Date(o.orderDate) <= new Date(filters.to)) &&
          (!filters.status || o.status === filters.status) &&
          (!filters.type || o.orderType === filters.type) // Updated to use orderType
      ),
    [filters, orders]
  );

  const getFilteredByStatus = () => {
    if (tabKey === "All") return filteredOrders;
    return filteredOrders.filter((o) => o.status === tabKey);
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    setFilters((f) => ({ ...f, [id]: value }));
    if (id === "status" && value) setTabKey(value);
  };

  const resetFilters = () => {
    setFilters({ from: "", to: "", status: "", type: "" });
    setTabKey("Pending");
  };

  const handleReject = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const handleCheckout = (order) => {
    // Derive type and product from orderType and services
    const primaryService =
      order.services && order.services.length > 0 ? order.services[0] : {};
    const type = order.orderType || "Unknown";
    const product = primaryService.name || "Unknown Service";

    navigate("/checkout", {
      state: {
        order: {
          orderId: order.id,
          scheduledDate: order.scheduledDate,
          scheduledTime: order.scheduledTime,
          type: type,
          product: product,
          businessStatus: "Verified",
          subtotal: order.amount,
          total: order.amount,
        },
      },
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="custom-orders-wrapper">
      <style>{customStyles}</style>

      <Container
        fluid
        className="px-md-5 py-5"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <Row className="align-items-center justify-content-center mb-5">
          <Col xs={12} md={8}>
            <h2
              className="fw-bold mb-2"
              style={{
                fontSize: "1.5rem",
                letterSpacing: "-0.5px",
                color: "hsl(230, 70%, 20%)",
              }}
            >
              Orders Dashboard
            </h2>
            <p
              className="text-muted"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1.05rem",
                color: "hsl(220, 10%, 40%)",
              }}
            >
              View, filter and manage all your influencer orders
            </p>
          </Col>

          <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
            <Button
              onClick={() => setShowFilters((s) => !s)}
              style={{
                background:
                  "linear-gradient(135deg, rgb(87, 52, 226), #7d68c3)",
                border: "none",
                color: "#fff",
                borderRadius: "50px",
                padding: "0.6rem 1.5rem",
                fontWeight: 600,
                fontSize: "0.95rem",
                boxShadow: "0 4px 14px rgba(125, 104, 195, 0.25)",
              }}
            >
              <FunnelFill className="me-2" /> Filters
            </Button>
          </Col>
        </Row>

        <Collapse in={showFilters}>
          <div
            className="card mb-4 shadow-sm p-3 border-0"
            style={{ backgroundColor: "hsl(214.3, 31.8%, 98%)" }}
          >
            <Form>
              <Row className="gx-4 gy-3">
                <Col md={3}>
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="date"
                    id="from"
                    value={filters.from}
                    onChange={onChange}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="date"
                    id="to"
                    value={filters.to}
                    onChange={onChange}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    id="status"
                    value={filters.status}
                    onChange={onChange}
                    className="custom-select"
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label>Order Type</Form.Label>
                  <Form.Select
                    id="type"
                    value={filters.type}
                    onChange={onChange}
                  >
                    <option value="">All</option>
                    {types.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col md={3}>
                  <Button
                    style={{
                      backgroundColor: "hsl(220, 10%, 65%)",
                      border: "none",
                      color: "#fff",
                      borderRadius: "50px",
                    }}
                    onClick={resetFilters}
                    className="w-100"
                  >
                    <ArrowCounterclockwise className="me-2" /> Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Collapse>

        <div className="d-flex justify-content-between gap-3 mb-4">
          {["All", "Pending", "Completed"].map((key) => (
            <Button
              key={key}
              onClick={() => setTabKey(key)}
              className="flex-fill"
              style={{
                backgroundColor: "hsl(214.3, 31.8%, 98%)",
                color:
                  tabKey === key ? "hsl(230, 50%, 10%)" : "hsl(220, 10%, 50%)",
                border: "none",
                borderBottom:
                  tabKey === key
                    ? "3px solid hsl(230, 70%, 25%)"
                    : "3px solid transparent",
                width: "100%",
                borderRadius: "10px",
                fontWeight: "600",
                paddingBottom: "10px",
              }}
            >
              {key}
            </Button>
          ))}
        </div>

        <div
          className="card shadow-sm border-0"
          style={{ backgroundColor: "hsl(214.3, 31.8%, 98%)" }}
        >
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger">{error}</div>
          ) : (
            <Table responsive className="mb-0">
              <thead style={{ backgroundColor: "hsl(214.3, 31.8%, 95%)" }}>
                <tr>
                  {[
                    "Direction",
                    "Name",
                    "Order Date",
                    "Scheduled Date",
                    "Scheduled Time",
                    "Order Type",
                    "Service",
                    "Amount",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} style={{ color: "hsl(230, 50%, 20%)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getFilteredByStatus().length > 0 ? (
                  getFilteredByStatus().map((o) => {
                    // Derive service name and type from services
                    const primaryService =
                      o.services && o.services.length > 0 ? o.services[0] : {};
                    const serviceName =
                      primaryService.name || "Unknown Service";
                    const serviceType =
                      primaryService.type || o.orderType || "Unknown";

                    return (
                      <tr
                        key={o.id}
                        onClick={() => setSelectedOrder(o)}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                          backgroundColor: isHovered
                            ? "#eef2ff"
                            : "transparent",
                        }}
                        className="order-row"
                      >
                        <td>
                          {user.id === o.influencer_id ? (
                            <span style={{ color: "green" }}>↙</span>
                          ) : (
                            <span style={{ color: "red" }}>↗</span>
                          )}
                        </td>
                        <td>
                          {user.id === o.influencer_id ? o.username : o.infname}
                        </td>
                        <td>{parseDate(o.orderdate)}</td>
                        <td>
                          {o.scheduleddate
                            ? new Date(o.scheduleddate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  timeZone: "Asia/Kolkata", // Adjust to IST
                                }
                              )
                            : "—"}
                        </td>
                        <td>
                          {o.scheduleddate
                            ? new Date(o.scheduleddate).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "Asia/Kolkata", // Adjust to IST
                                }
                              )
                            : "—"}
                        </td>
                        <td>{o.ordertype || "Unknown"}</td>
                        <td>
                          {o.services && o.services.length > 0
                            ? o.services[0].name
                            : "Unknown Service"}
                        </td>
                        <td>₹{o.amount.toLocaleString()}</td>
                        <td>
                          <Badge
                            bg={
                              o.status === "Completed" ? "success" : "warning"
                            }
                          >
                            {o.status}
                          </Badge>
                        </td>
                        <td className="d-flex gap-2">
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: "#8e7cc3",
                              border: "none",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOrder(o);
                            }}
                          >
                            <Eye />
                          </Button>
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: "#c94c4c",
                              border: "none",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(o.id);
                            }}
                          >
                            <XCircle />
                          </Button>
                          {o.status !== "Completed" &&
                            user.id !== o.influencer_id && (
                              <Button
                                size="sm"
                                style={{
                                  backgroundColor: "#4bb543",
                                  border: "none",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCheckout(o);
                                }}
                              >
                                <CreditCard />
                              </Button>
                            )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center text-muted py-4">
                      No {tabKey.toLowerCase()} orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
      </Container>

      {/* Order-Details Modal */}
      <Modal
        show={!!selectedOrder}
        onHide={() => setSelectedOrder(null)}
        centered
        style={{ zIndex: 1300 }}
        dialogClassName="modal-wider"
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "#f3eefc",
            borderBottom: "none",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Modal.Title
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#5c4d7d",
              fontWeight: "600",
            }}
          >
            Order Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#fefefe",
            fontSize: "1rem",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {selectedOrder && (
            <div className="px-1 py-2">
              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Order ID</strong>
                </Col>
                <Col>: {selectedOrder.id || "4292424244"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Status</strong>
                </Col>
                <Col>
                  <Badge
                    bg={
                      selectedOrder.status === "Completed"
                        ? "success"
                        : "warning"
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Username</strong>
                </Col>
                <Col>: {selectedOrder.username || "Unknown"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Influencer Name</strong>
                </Col>
                <Col>: {selectedOrder.infname || "Unknown"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>User ID</strong>
                </Col>
                <Col>: {selectedOrder.user_id}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Influencer ID</strong>
                </Col>
                <Col>: {selectedOrder.influencer_id}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Amount</strong>
                </Col>
                <Col>: ₹{Number(selectedOrder.amount).toLocaleString()}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Order Date</strong>
                </Col>
                <Col>: {parseDate(selectedOrder.orderdate)}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Scheduled Date</strong>
                </Col>
                <Col>
                  :{" "}
                  {selectedOrder.scheduleddate
                    ? parseDate(selectedOrder.scheduleddate)
                    : "Not scheduled"}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Scheduled Time</strong>
                </Col>
                <Col>: {selectedOrder.scheduledtime || "Not specified"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Order Type</strong>
                </Col>
                <Col>: {selectedOrder.ordertype || "Unknown"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Service</strong>
                </Col>
                <Col>
                  :{" "}
                  {selectedOrder.services && selectedOrder.services.length > 0
                    ? selectedOrder.services[0].name || "Unknown Service"
                    : "Unknown Service"}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Description</strong>
                </Col>
                <Col>
                  : {selectedOrder.description || "No description provided"}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Coupon Code</strong>
                </Col>
                <Col>: {selectedOrder.couponcode || "None"}</Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Affiliated Links</strong>
                </Col>
                <Col>
                  :{" "}
                  {selectedOrder.affiliatedlinks &&
                  selectedOrder.affiliatedlinks.length > 0
                    ? selectedOrder.affiliatedlinks.map((link, index) => (
                        <div key={index}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Link {index + 1}
                          </a>
                        </div>
                      ))
                    : "None"}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <strong>File</strong>
                </Col>
                <Col>
                  :{" "}
                  {selectedOrder.file ? (
                    <a
                      href={selectedOrder.file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download File
                    </a>
                  ) : (
                    "No file uploaded"
                  )}
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "#fefefe",
            zIndex: 1,
          }}
          className="d-flex justify-content-between"
        >
          <Button
            variant="danger"
            onClick={() => handleReject(selectedOrder?.id)}
          >
            Reject
          </Button>
          <Button
            style={{ backgroundColor: "#4bb543", border: "none" }}
            onClick={() => handleCheckout(selectedOrder)}
          >
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Orders;
