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
import NewTable from '../components/NewTable'
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
import { ordersData } from "../data/ordersData";
import useOrdersColumns from "../hooks/useOrdersColumns";
import { Funnel, ShoppingCart, SquarePen, X, ArrowUp, ArrowDown } from "lucide-react";
import { detectCurrency, formatCurrency } from "../utils/currency";


const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

// Scheduled Information Component
const ScheduledInfo = ({ date, time }) => (
  <div className="!bg-[var(--bg)] !border !border-[var(--border)] rounded-xl p-3 mb-3">
    <h6 className="fw-bold mb-3 text-[var(--text)]">
      Scheduled Information
    </h6>
    <div className="d-flex align-items-center mb-2">
      <Calendar className="me-3 text-[var(--textSec)]" style={{ minWidth: "20px" }} />
      <span className="me-2 fw-medium text-[var(--text)]">Date:</span>
      <span className="text-[var(--textSec)]">{date || "Not scheduled"}</span>
    </div>
    <div className="d-flex align-items-center">
      <Clock className="me-3 text-[var(--textSec)]" style={{ minWidth: "20px" }} />
      <span className="me-2 fw-medium text-[var(--text)]">Time:</span>
      <span className="text-[var(--textSec)]">{time || "Not scheduled"}</span>
    </div>
  </div>
);

// Product Information Component
const ProductInfo = ({ type, product, category }) => (
  <div className="!bg-[var(--bg)] !border !border-[var(--border)] rounded-xl p-3 mb-3">
    <h6 className="fw-bold mb-3 text-[var(--text)]">
      Product Details
    </h6>
    <div className="d-flex align-items-center mb-2">
      <Tag className="me-3 text-[var(--textSec)]" style={{ minWidth: "20px" }} />
      <span className="me-2 fw-medium text-[var(--text)]">Type:</span>
      <span className="text-[var(--textSec)]">{type}</span>
    </div>
    <div className="d-flex align-items-center mb-2">
      <BoxSeam className="me-3 text-[var(--textSec)]" style={{ minWidth: "20px" }} />
      <span className="me-2 fw-medium text-[var(--text)]">Product:</span>
      <span className="text-[var(--textSec)]">{product}</span>
    </div>
    <div className="d-flex align-items-center">
      <Tag className="me-3 text-[var(--textSec)]" style={{ minWidth: "20px" }} />
      <span className="me-2 fw-medium text-[var(--text)]">Category:</span>
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
  const [currency, setCurrency] = useState('₹');

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
      })
      : "—";

  const parseTime = (dt) =>
    dt
      ? new Date(dt).toLocaleString("default", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      : "—";

  // Auto-detect currency on component mount
  useEffect(() => {
    const initCurrency = async () => {
      const detectedCurrency = await detectCurrency();
      setCurrency(detectedCurrency);
    };
    initCurrency();
  }, []);

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

  const orderColumn = useOrdersColumns({
    setSelectedOrder,
    handleReject,
    handleCheckout,
    formatCurrency,
    currency
  })
  const getFilteredOrders = () => {
    let filtered = orders;
    if (tabKey === "Completed") {
      filtered = orders.filter(order => order.status === "completed");
    } else if (tabKey === "Pending") {
      filtered = orders.filter(order => order.status === "pending");
    }
    return filtered;
  };
  
  const dataSource = getFilteredOrders().map((order) => ({
    key: order.id,
    id: order.id,
    name: order.order_direction === 'sent' ? order.influencer_name : order.user_fullname,
    influencer: order.influencer_name,
    orderType: order.order_type,
    service: order.content_type,
    platform: order.platform,
    amount: order.total_price,
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
    orderDate: order.created_at,
    scheduledDate: order.post_datetime,
    scheduledTime: order.post_datetime ? parseTime(order.post_datetime) : '',
    category: order.influencer_category || 'General',
    direction: order.order_direction
  }));
  return (
  <div className={`custom-orders-wrapper !bg-[var(--bgPage2)] ${selectedOrder ? ' modal-blur-bg' : ''}`}> 

      <div
        className="p-3 md:px-5 md:py-5 h-10"
        style={{ backgroundColor: "var(--bgPage2)" }}
      >
        <div className="align-items-center justify-content-center mb-2">
          <div className="row">
            <div className="col-12 col-md-8">
              <h2
                className="fw-bold mb-2 !text-[var(--text)]"
                style={{
                  fontSize: "1.5rem",
                  letterSpacing: "-0.5px",
                }}
              >
                Orders
                {/* Dashboard */}
              </h2>
              <p
                className="!text-[var(--mutedText)] text-14"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                View, filter and manage all your influencer orders
              </p>
            </div>

            <div className="col-12 col-md-4 !flex !justify-end mt-3 mt-md-0 ">
              <button
                onClick={() => setShowFilters((s) => !s)}
                className="!bg-[var(--primary)] h-fit !border-none !flex !justify-center !items-center text-white rounded-pill px-4 py-2 text-12"

              >
                <Funnel size={12} className="me-2" /> Filters
              </button>
            </div>
          </div>
        </div>

        <Collapse in={showFilters}>
          <div
            className="mb-4 shadow-sm p-3 !border !border-[var(--border)] rounded-xl !bg-[var(--card)]"
          >
            <Form>
              <div className="row gx-4 gy-3">
                <div className="col-md-3">
                  <Form.Label className="text-[var(--text)] text-14">From</Form.Label>
                  <Form.Control
                    type="date"
                    id="from"
                    value={filters.from}
                    onChange={onChange}
                    className="!bg-[var(--bgPage2)] !border !border-[var(--border)] !text-[var(--text)] text-12"
                  />
                </div>
                <div className="col-md-3">
                  <Form.Label className="text-[var(--text)]  text-14">To</Form.Label>
                  <Form.Control
                    type="date"
                    id="to"
                    value={filters.to}
                    onChange={onChange}
                    className="!bg-[var(--bgPage2)] !border !border-[var(--border)] !text-[var(--text)] text-12"
                  />
                </div>
                <div className="col-md-3">
                  <Form.Label className="text-[var(--text)] text-14">Status</Form.Label>
                  <Form.Select
                    id="status"
                    value={filters.status}
                    onChange={onChange}
                    className="!bg-[var(--bgPage2)] !border !border-[var(--border)] !text-[var(--text)] text-12"
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </div>
                <div className="col-md-3">
                  <Form.Label className="text-[var(--text)] text-14">Order Type</Form.Label>
                  <Form.Select
                    id="type"
                    value={filters.type}
                    onChange={onChange}
                    className="!bg-[var(--bgPage2)] !border !border-[var(--border)] !text-[var(--text)] text-12"
                  >
                    <option value="">All</option>
                    {types.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </Form.Select>
                </div>
              </div>
              <div className="row pt-3">
                <div className="flex justify-center md:justify-end items-center ">
                  <Button
                    className="!bg-[var(--primary)] h-fit !border-none !flex !justify-center !items-center text-white rounded-pill px-5 py-2 text-14"
                    onClick={resetFilters}
                  >
                    <ArrowCounterclockwise className="me-2" /> Reset
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </Collapse>

        <div className="d-flex justify-content-between gap-3 mb-4 !bg-[var(--hover2)] p-1 rounded-xl">
          {["All", "Pending", "Completed"].map((key) => (
            <button
              key={key}
              onClick={() => setTabKey(key)}
              className={`btn w-100 text-center !font-medium text-14 py-1 border-0 !text-[var(--text)] ${tabKey === key
                ? "border-bottom border-2 border-primary !bg-[var(--bg)]"
                : ""
                }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div
          className="shadow-sm !border !border-[var(--border)] p-1 rounded-xl !bg-[var(--bgPage2)]"
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
            <div className=''>
              <NewTable
                columns={orderColumn}
                dataSource={dataSource}
                onRow={(record) => ({
                  onClick: () => setSelectedOrder(record)
                })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Order-Details Modal */}
      <Modal
        show={!!selectedOrder}
        onHide={() => setSelectedOrder(null)}
        centered
        style={{
          backdropFilter: "blur(1px)", 
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 9999,
        }}
        dialogClassName="custom-orders-modal "
      >
        {selectedOrder && (
          <div className=" border  !border-[var(--border)] p-2 px-0 w-fit rounded !bg-[var(--bgPage2)] ">
            <div className="custom-orders-modal-content custom-orders-modal ">
              {/* Header */}
              <div className=" !p-4 custom-orders-modal-header " style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="!text-[var(--text)] !font-bold" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>Order Details</h4>
                  <button  className="text-20 !text-[var(--text)]" onClick={() => setSelectedOrder(null)}><span aria-label="Close"><X /></span></button>
                </div>
              </div>
              {/* Body */}
              <div className="text-[var(--text)] px-3" style={{ fontSize: '1rem', maxHeight: '70vh', overflowY: 'auto' }}>
                <div className="py-2 ">
                  <div className="md:flex gap-3 mb-4">
                    <div className="md:flex-1">
                      <div className="rounded-3 p-4 h-100 !bg-[var(--card)] !border !border-[var(--border)]">
                        <div className="fw-bold mb-3 text-16 text-[var(--text)]">Order Information</div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Order ID:</div><div className="fw-normal text-14 text-[var(--text)]">{selectedOrder.id || ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Status:</div><div>{selectedOrder.status ? (<Badge bg={selectedOrder.status === 'Completed' ? 'success' : selectedOrder.status === 'Pending' ? 'warning' : 'secondary'} className="px-2 py-1 text-13 !font-normal">{selectedOrder.status}</Badge>) : ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Username:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.name || ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Order Type:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.orderType || ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Order Date:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.orderDate ? parseDate(selectedOrder.orderDate) : ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Amount:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.amount ? formatCurrency(selectedOrder.amount, currency) : ''}</div></div>
                      </div>
                    </div>
                    <div className="md:flex-1 mt-3 md:!mt-0">
                      <div className="rounded-3 p-4 h-100 !bg-[var(--card)] !border !border-[var(--border)]">
                        <div className="fw-bold mb-3 text-16 !text-[var(--text)]">Schedule & Product</div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Scheduled Date:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.scheduledDate ? parseDate(selectedOrder.scheduledDate) : ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Scheduled Time:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.scheduledDate ? parseTime(selectedOrder.scheduledDate) : ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Category:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.category || ''}</div></div>
                        <div className="d-flex mb-2 align-items-center justify-between"><div className="w-50 text-14 ">Product/Service:</div><div className=" text-14 text-[var(--text)]">{selectedOrder.service || ''}</div></div>
                      </div>
                    </div>
                  </div>
                  {/* Provided Content Section */}
                  <div className="rounded-3 p-4 mb-4 !bg-[var(--card)] !border !border-[var(--border)]">
                    <div className="fw-bold mb-2 text-15 text-[var(--text)] d-flex align-items-center">
                      <span className="me-2"><i className="bi bi-file-earmark-text"></i></span> Provided Content
                      <span className="badge bg-[var(--hover2)] ms-2 text-11 !text-[var(--text)]">PROVIDED CONTENT</span>
                    </div>
                    <div className="text-13 text-[var(--textSec)] mb-2">Content Brief:</div>
                    <div className="rounded-2 p-3 !bg-[var(--hover2)] text-12 text-[var(--text)]" style={{ minHeight: '60px' }}>{selectedOrder.contentBrief || 'Create engaging content showcasing our new summer collection. Focus on lifestyle shots with natural lighting. Include call-to-action for our seasonal sale (20% off). Target audience: young professionals aged 25-35. Brand tone: trendy, approachable, and sustainable.'}</div>
                  </div>

                {/* Footer */}
              <div className=" gap-3 !bg-[var(--card)] border !border-[var(--border)] flex justify-end p-4 rounded" >
                    <Button className="!bg-red-500 !border-none !flex items-center gap-2" onClick={() => handleReject(selectedOrder?.id)}><X size={16} /> Reject</Button>
                    <Button className="!bg-[var(--hover2)] border !border-[var(--border)] !text-[var(--text)] !flex items-center gap-2" onClick={() => handleReject(selectedOrder?.id)}> <SquarePen size={16} /> Modify</Button>
                    <Button className="!bg-green-500 !border-none !flex items-center gap-2" onClick={() => handleCheckout(selectedOrder)}><ShoppingCart size={16} />  Checkout</Button>
              </div>
                </div>
             
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Orders;
