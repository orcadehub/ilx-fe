import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
} from "react-bootstrap";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaArrowRight,
  FaBullseye,
  FaRupeeSign,
  FaShoppingCart,
  FaChartPie,
  FaUserFriends,
  FaImage,
  FaVideo,
  FaFilm,
  FaUserTie,
  FaUsers,
  FaHeadset,
  FaHandshake,
  FaMoneyCheckAlt,
  FaHourglassHalf,
  FaTasks,
} from "react-icons/fa";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import PendingOrders from "../components/PendingOrders";
import TopBusinessUsers from "../components/TopBusinessUsers";
import AdminBusinUsers from "../components/AdminBusinUsers";
import fetchMetrics from "../components/dashboard/metrics"; // artifact_id: 257e42c5-69b0-4b09-951b-0c74c0e7edd6
import TopInfluencerUsers from "../components/TopInfluencerUsers";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const role = user?.role || "business";

const staticTop = [
  {
    title: "Summer Collection",
    platform: [
      <FaInstagram className="text-danger me-1" style={{ color: "#c13584" }} />,
      <FaInstagram className="text-danger" style={{ color: "#c13584" }} />,
    ],
    type: [
      <Badge bg="info" className="me-1" style={{ backgroundColor: "#06b6d4" }}>
        reel
      </Badge>,
      <Badge bg="primary" style={{ backgroundColor: "#1e40af" }}>
        story
      </Badge>,
    ],
    value: "92%",
    link: "/orders/summer-collection",
  },
  {
    title: "Product Launch",
    platform: [
      <FaYoutube className="text-danger" style={{ color: "#b2071d" }} />,
    ],
    type: [
      <Badge bg="warning" style={{ backgroundColor: "#d97706" }}>
        video
      </Badge>,
    ],
    value: "89%",
    link: "/orders/product-launch",
  },
  {
    title: "Brand Promotion",
    platform: [
      <FaInstagram className="text-danger me-1" style={{ color: "#c13584" }} />,
      <FaTiktok className="text-dark" style={{ color: "#1e293b" }} />,
    ],
    type: [
      <Badge
        bg="success"
        className="me-1"
        style={{ backgroundColor: "#059669" }}
      >
        post
      </Badge>,
      <Badge bg="info" style={{ backgroundColor: "#06b6d4" }}>
        reel
      </Badge>,
    ],
    value: "85%",
    link: "/orders/brand-promotion",
  },
  {
    title: "Tutorial Series",
    platform: [
      <FaYoutube className="text-danger me-1" style={{ color: "#b2071d" }} />,
      <FaTiktok className="text-dark" style={{ color: "#1e293b" }} />,
    ],
    type: [
      <Badge
        bg="warning"
        className="me-1"
        style={{ backgroundColor: "#d97706" }}
      >
        video
      </Badge>,
      <Badge bg="info" style={{ backgroundColor: "#06b6d4" }}>
        short
      </Badge>,
    ],
    value: "82%",
    link: "/orders/tutorial-series",
  },
  {
    title: "Brand Partnership",
    platform: [
      <FaFacebook className="text-primary" style={{ color: "#4267b2" }} />,
    ],
    type: [
      <Badge bg="success" style={{ backgroundColor: "#059669" }}>
        post
      </Badge>,
    ],
    value: "75%",
    link: "/orders/brand-partnership",
  },
];

const staticUsers = [
  {
    name: "Fashion Forward",
    handle: "@fashionforward",
    orders: 28,
    img: "https://picsum.photos/seed/fashion/100",
  },
  {
    name: "Tech Haven",
    handle: "@techhaven",
    orders: 24,
    img: "https://picsum.photos/seed/tech/100",
  },
  {
    name: "Beauty Essentials",
    handle: "@beautyessentials",
    orders: 20,
    img: "https://picsum.photos/seed/beauty/100",
  },
  {
    name: "Health First",
    handle: "@healthfirst",
    orders: 16,
    img: "https://picsum.photos/seed/health/100",
  },
  {
    name: "Fitness Hub",
    handle: "@fitnesshub",
    orders: 14,
    img: "https://picsum.photos/seed/fitness/100",
  },
];

// Placeholder for future API calls
const fetchTopOrders = async (token) => {
  // Simulate API call (replace with actual API later)
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticTop), 1000);
  });
};

const fetchTopUsers = async (token) => {
  // Simulate API call (replace with actual API later)
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticUsers), 1000);
  });
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

function DashboardContent() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [top, setTop] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const token = localStorage.getItem("token") || "your_jwt_token";

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingMetrics(true);
        const fetchedMetrics = await fetchMetrics(token);
        setMetrics(fetchedMetrics);
      } catch (err) {
        console.error("Error fetching metrics:", err.message);
      } finally {
        setLoadingMetrics(false);
      }

      try {
        setLoadingTop(true);
        const fetchedTop = await fetchTopOrders(token);
        setTop(fetchedTop);
      } catch (err) {
        console.error("Error fetching top orders:", err.message);
      } finally {
        setLoadingTop(false);
      }

      try {
        setLoadingUsers(true);
        const fetchedUsers = await fetchTopUsers(token);
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error fetching top users:", err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    getData();
  }, [token]);

  return (
    <div
      className="py-5"
      style={{ minHeight: "100vh", backgroundColor: "var(--primary-color)" }}
    >
      <Container fluid>
        {/* Dashboard Title */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div
            className="d-flex justify-content-between align-items-center mb-5 px-4 py-3 rounded shadow-sm"
            style={{
              backgroundColor: "#fff",
              borderLeft: "5px solid #1e3a8a",
            }}
          >
            <div>
              <h4
                className="fw-semibold mb-2"
                style={{ color: "#1e3a8a", fontSize: "1.75rem" }}
              >
                {role === "admin"
                  ? "Admin Dashboard"
                  : role === "influencer"
                  ? "Influencer Dashboard"
                  : "Business Dashboard"}
              </h4>
              <p
                className="text-muted"
                style={{
                  fontSize: "0.95rem",
                  marginBottom: 0,
                  color: "#475569",
                }}
              >
                Monitor performance, orders, influencers, and more.
              </p>
            </div>
            <div>
              <Button
                variant="outline-primary"
                className="rounded-pill px-4 py-2"
                onClick={() => navigate("/dashboard/influencers")}
              >
                Find Influencers
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Metrics Section */}
        {loadingMetrics && metrics.length === 0 ? (
          <Row className="g-4 px-3 mb-5">
            <Col>
              <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "120px" }}
              >
                <Spinner animation="border" variant="primary" />
                <span className="ms-3">Loading metrics...</span>
              </Container>
            </Col>
          </Row>
        ) : (
          <Row className="g-4 px-3 mb-5">
            {metrics.length > 0 ? (
              metrics.map((card, index) => (
                <Col key={card.title} md={6} lg={3}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    custom={index}
                  >
                    <Card
                      onClick={() => navigate(card.path)}
                      className="shadow-sm border-0"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "1rem",
                        transition: "transform 0.3s ease",
                        cursor: "pointer",
                        height: "120px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <Card.Body className="d-flex flex-column justify-content-between p-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div style={{ fontSize: "1.3rem" }}>{card.icon}</div>
                          <h6
                            className="fw-semibold text-muted mb-0"
                            style={{ color: "#475569" }}
                          >
                            {card.title}
                          </h6>
                        </div>
                        <h5 className="fw-bold text-dark mb-0">
                          {card.value.includes("/") || card.value.includes("₹") ? (
                            card.value
                          ) : (
                            <CountUp
                              start={0}
                              end={parseInt(card.value, 10) || 0}
                              duration={2}
                              separator=","
                            />
                          )}
                        </h5>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))
            ) : (
              <Col>
                <p>No metrics available</p>
              </Col>
            )}
          </Row>
        )}

        {/* Top Content Section */}
        {role !== "admin" && (
          <Row className="g-4 px-3 mb-5">
            {/* Top Performed Orders */}
            <Col md={8}>
              {loadingTop && top.length === 0 ? (
                <Container
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "400px" }}
                >
                  <Spinner animation="border" variant="primary" />
                  <span className="ms-3">Loading top orders...</span>
                </Container>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={1}
                >
                  <Card
                    className="border-0 shadow-sm h-100"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "1rem",
                      minHeight: "400px",
                    }}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-semibold mb-0 text-dark">
                          Top Performed Orders
                        </h5>
                        <Badge
                          bg="light"
                          text="dark"
                          className="rounded-pill px-3 py-2 shadow-sm"
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#fff",
                            color: "#1e293b",
                          }}
                          onClick={() => navigate("/dashboard/orders")}
                        >
                          View All <FaArrowRight className="ms-2" size={12} />
                        </Badge>
                      </div>
                      <div
                        className="scroll-content"
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "0.5rem",
                          maxHeight: "300px",
                        }}
                      >
                        <div
                          className="d-flex flex-column"
                          style={{ backgroundColor: "#fff" }}
                        >
                          <div
                            className="d-flex text-muted py-2 px-3"
                            style={{
                              backgroundColor: "var(--primary-color)",
                              borderBottom: "1px solid #e5e7eb",
                              fontWeight: "500",
                              height: "40px",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ flex: "2", padding: "8px" }}>
                              Order
                            </div>
                            <div style={{ flex: "1", padding: "8px" }}>
                              Platform
                            </div>
                            <div style={{ flex: "1", padding: "8px" }}>
                              Type
                            </div>
                            <div
                              style={{
                                flex: "1",
                                padding: "8px",
                                textAlign: "end",
                              }}
                            >
                              Performance
                            </div>
                          </div>
                          {top.slice(0, 5).map((order, idx) => (
                            <div
                              key={order.title}
                              className="d-flex cursor-pointer"
                              onClick={() => navigate(order.link)}
                              style={{
                                backgroundColor: "#fff",
                                padding: "8px",
                                borderBottom: "1px solid #e5e7eb",
                                transition: "background-color 0.3s ease",
                                height: "52px",
                                alignItems: "center",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#e2e8f0")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#fff")
                              }
                            >
                              <div
                                className="fw-medium"
                                style={{ flex: "2", padding: "8px" }}
                              >
                                {order.title}
                              </div>
                              <div style={{ flex: "1", padding: "8px" }}>
                                {order.platform}
                              </div>
                              <div style={{ flex: "1", padding: "8px" }}>
                                {order.type}
                              </div>
                              <div
                                className="fw-bold"
                                style={{
                                  flex: "1",
                                  padding: "8px",
                                  textAlign: "end",
                                }}
                              >
                                {order.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              )}
            </Col>

            {/* Top Business Users */}
            <Col md={4}>
              {loadingUsers && users.length === 0 ? (
                <Container
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "400px" }}
                >
                  <Spinner animation="border" variant="primary" />
                  <span className="ms-3">Loading top users...</span>
                </Container>
              ) : (
                <TopInfluencerUsers/>
              )}
            </Col>
          </Row>
        )}

        {role !== "admin" && (
          <div
            className="d-flex flex-column gap-4 mb-4 px-4 py-3 rounded shadow-sm"
            style={{
              backgroundColor: "var(--primary-color)",
            }}
          >
            <Row className="g-4">
              <Col md={8}>
                <PendingOrders />
              </Col>
              <Col md={4}>
                <TopBusinessUsers />
              </Col>
            </Row>
          </div>
        )}

        {role === "admin" && (
          <div
            className="mb-4 px-4 py-3 rounded shadow-sm"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <AdminBusinUsers />
          </div>
        )}
      </Container>
    </div>
  );
}

export default DashboardContent;