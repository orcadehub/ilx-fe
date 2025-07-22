import React, { useState, useMemo } from "react";
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

  const initialOrders = [
    {
      id: 1001,
      username: "fashionista_ella",
      orderDate: "2024-06-05T09:15:00",
      scheduledDate: "18/06/2024",
      scheduledTime: "11:30",
      type: "Reel",
      product: "Luxury Handbag Unboxing",
      amount: 8500,
      status: "Pending",
    },
    {
      id: 1002,
      username: "techguru_max",
      orderDate: "2024-06-07T14:20:00",
      scheduledDate: "20/06/2024",
      scheduledTime: "16:45",
      type: "Long Video",
      product: "Smartphone Review",
      amount: 12000,
      status: "Completed",
    },
    {
      id: 1003,
      username: "beautyqueen_lydia",
      orderDate: "2024-06-08T16:30:00",
      scheduledDate: "22/06/2024",
      scheduledTime: "10:00",
      type: "Post",
      product: "Skincare Routine",
      amount: 6500,
      status: "Pending",
    },
    {
      id: 1004,
      username: "travelwithdiego",
      orderDate: "2024-06-09T11:45:00",
      scheduledDate: "25/06/2024",
      scheduledTime: "09:15",
      type: "Short Video",
      product: "Hotel Tour",
      amount: 9500,
      status: "Pending",
    },
    {
      id: 1005,
      username: "fitnesstrainer_sam",
      orderDate: "2024-06-10T08:00:00",
      scheduledDate: "28/06/2024",
      scheduledTime: "07:30",
      type: "Combo Package",
      product: "Workout Plan Promo",
      amount: 15000,
      status: "Completed",
    },
    {
      id: 1006,
      username: "foodexplorer_anna",
      orderDate: "2024-06-11T13:10:00",
      scheduledDate: "30/06/2024",
      scheduledTime: "12:45",
      type: "Reel",
      product: "Restaurant Review",
      amount: 7200,
      status: "Pending",
    },
    {
      id: 1007,
      username: "gaming_wizard",
      orderDate: "2024-06-12T17:25:00",
      scheduledDate: "02/07/2024",
      scheduledTime: "20:00",
      type: "Long Video",
      product: "Gameplay Walkthrough",
      amount: 11000,
      status: "Pending",
    },
    {
      id: 1008,
      username: "luxuryhomes_tv",
      orderDate: "2024-06-13T10:50:00",
      scheduledDate: "05/07/2024",
      scheduledTime: "14:15",
      type: "Short Video",
      product: "Mansion Tour",
      amount: 18000,
      status: "Completed",
    },
    {
      id: 1009,
      username: "petlover_jess",
      orderDate: "2024-06-14T15:35:00",
      scheduledDate: "08/07/2024",
      scheduledTime: "13:30",
      type: "Post",
      product: "Pet Product Demo",
      amount: 4800,
      status: "Pending",
    },
    {
      id: 1010,
      username: "business_mogul",
      orderDate: "2024-06-15T12:05:00",
      scheduledDate: "10/07/2024",
      scheduledTime: "08:45",
      type: "Combo Package",
      product: "Entrepreneur Story",
      amount: 22000,
      status: "Completed",
    },
    {
      id: 1011,
      username: "artistry_by_mei",
      orderDate: "2024-06-16T14:55:00",
      scheduledDate: "12/07/2024",
      scheduledTime: "17:30",
      type: "Reel",
      product: "Painting Tutorial",
      amount: 6800,
      status: "Pending",
    },
    {
      id: 1012,
      username: "automotive_expert",
      orderDate: "2024-06-17T09:40:00",
      scheduledDate: "15/07/2024",
      scheduledTime: "10:00",
      type: "Long Video",
      product: "Car Review",
      amount: 16500,
      status: "Pending",
    },
  ];

  const types = [
    "Post",
    "Reel",
    "Short Video",
    "Long Video",
    "Polls",
    "Combo Package",
  ];

  const [orders, setOrders] = useState(initialOrders);
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

  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          (!filters.from || new Date(o.orderDate) >= new Date(filters.from)) &&
          (!filters.to || new Date(o.orderDate) <= new Date(filters.to)) &&
          (!filters.status || o.status === filters.status) &&
          (!filters.type || o.type === filters.type)
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
    navigate("/checkout", {
      state: {
        order: {
          orderId: order.id,
          scheduledDate: order.scheduledDate,
          scheduledTime: order.scheduledTime,
          type: order.type,
          product: order.product,
          businessStatus: "Verified",
          subtotal: order.amount,
          total: order.amount,
        },
      },
    });
  };

  return (
    <div className="custom-orders-wrapper">
      <style>{customStyles}</style>

      <Container
        fluid
        className="px-md-5 py-5"
        style={{ backgroundColor: "hsl(214.3, 31.8%, 98%)" }}
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
          <Table responsive className="mb-0">
            <thead style={{ backgroundColor: "hsl(214.3, 31.8%, 95%)" }}>
              <tr>
                {[
                  "Username",
                  "Order Date",
                  "Scheduled Date",
                  "Scheduled Time",
                  "Order Type",
                  "Product/Service",
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
                getFilteredByStatus().map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelectedOrder(o)}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                      backgroundColor: isHovered ? "#eef2ff" : "transparent",
                    }}
                    className="order-row"
                  >
                    <td>{o.username}</td>
                    <td>{parseDate(o.orderDate)}</td>
                    <td>{o.scheduledDate || "—"}</td>
                    <td>{o.scheduledTime || "—"}</td>
                    <td>{o.type}</td>
                    <td>{o.product}</td>
                    <td>₹{o.amount.toLocaleString()}</td>
                    <td>
                      <Badge
                        bg={o.status === "Completed" ? "success" : "warning"}
                      >
                        {o.status}
                      </Badge>
                    </td>
                    <td className="d-flex gap-2">
                      <Button
                        size="sm"
                        style={{ backgroundColor: "#8e7cc3", border: "none" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(o);
                        }}
                      >
                        <Eye />
                      </Button>
                      <Button
                        size="sm"
                        style={{ backgroundColor: "#c94c4c", border: "none" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(o.id);
                        }}
                      >
                        <XCircle />
                      </Button>
                      {o.status !== "Completed" && (
                        <Button
                          size="sm"
                          style={{ backgroundColor: "#4bb543", border: "none" }}
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
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-4">
                    No {tabKey.toLowerCase()} orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>

      <Modal
        show={!!selectedOrder}
        onHide={() => setSelectedOrder(null)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#f3eefc", borderBottom: "none" }}
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
        <Modal.Body style={{ backgroundColor: "#fefefe", fontSize: "1rem" }}>
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
                <Col>: {selectedOrder.username}</Col>
              </Row>
              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Amount</strong>
                </Col>
                <Col>: ₹{selectedOrder.amount.toLocaleString()}</Col>
              </Row>
              <Row className="mb-3">
                <Col xs={5}>
                  <strong>Order Date</strong>
                </Col>
                <Col>: {parseDate(selectedOrder.orderDate)}</Col>
              </Row>

              {/* Scheduled Information Component */}
              <ScheduledInfo
                date={selectedOrder.scheduledDate}
                time={selectedOrder.scheduledTime}
              />

              {/* Product Information Component */}
              <ProductInfo
                type={selectedOrder.type}
                product={selectedOrder.product}
                category={selectedOrder.category || "General"}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
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
