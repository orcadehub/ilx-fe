import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaChartLine,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import PendingOrders from "../components/PendingOrders";
import TopBusinessUsers from "../components/TopBusinessUsers";
import {
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
import AdminBusinUsers from "../components/AdminBusinUsers";

const user = JSON.parse(localStorage.getItem("user"));
const role = user?.role || "business"; // default to business

const metrics = (() => {
  if (role === "admin") {
    return [
      {
        title: "Total Influencers",
        value: "1,245",
        icon: (
          <FaUserFriends
            className="text-info fs-3"
            style={{ color: "#06b6d4" }}
          />
        ),
        path: "/influencers",
      },
      {
        title: "Business Users",
        value: "873",
        icon: (
          <FaUserTie
            className="text-primary fs-3"
            style={{ color: "#1e40af" }}
          />
        ),
        path: "/business-users",
      },
      {
        title: "Team Members",
        value: "14",
        icon: (
          <FaUsers className="text-warning fs-3" style={{ color: "#d97706" }} />
        ),
        path: "/team",
      },
      {
        title: "Active Support Tickets",
        value: "32",
        icon: (
          <FaHeadset
            className="text-danger fs-3"
            style={{ color: "#dc2626" }}
          />
        ),
        path: "/support",
      },
      {
        title: "Total Campaigns",
        value: "326",
        icon: (
          <FaHandshake
            className="text-success fs-3"
            style={{ color: "#059669" }}
          />
        ),
        path: "/campaigns",
      },
      {
        title: "Total Transactions",
        value: "2,143",
        icon: (
          <FaMoneyCheckAlt
            className="text-secondary fs-3"
            style={{ color: "#475569" }}
          />
        ),
        path: "/transactions",
      },
      {
        title: "Pending Withdrawals",
        value: "12",
        icon: (
          <FaHourglassHalf
            className="text-danger fs-3"
            style={{ color: "#dc2626" }}
          />
        ),
        path: "/withdrawals",
      },
      {
        title: "Service Orders",
        value: "487",
        icon: (
          <FaTasks className="text-primary fs-3" style={{ color: "#1e40af" }} />
        ),
        path: "/service-orders",
      },
    ];
  }

  const isInfluencer = role === "influencer";

  return [
    !isInfluencer && {
      title: "Campaign Impact Score",
      value: "10/100",
      icon: (
        <FaBullseye className="text-danger fs-3" style={{ color: "#dc2626" }} />
      ),
      path: "/impact-score",
    },
    isInfluencer && {
      title: "Earnings",
      value: "₹0",
      icon: (
        <FaRupeeSign
          className="text-success fs-3"
          style={{ color: "#059669" }}
        />
      ),
      path: "/earnings",
    },
    {
      title: "Total Orders",
      value: "0",
      icon: (
        <FaShoppingCart
          className="text-primary fs-3"
          style={{ color: "#1e40af" }}
        />
      ),
      path: "/orders",
    },
    {
      title: "Active/Total Campaigns",
      value: "0/0",
      icon: (
        <FaChartPie
          className="text-success fs-3"
          style={{ color: "#059669" }}
        />
      ),
      path: "/campaigns",
    },
    {
      title: "Connected Influencers",
      value: "0",
      icon: (
        <FaUserFriends
          className="text-info fs-3"
          style={{ color: "#06b6d4" }}
        />
      ),
      path: "/influencers",
    },
    {
      title: "Total Posts",
      value: "0",
      icon: (
        <FaImage className="text-warning fs-3" style={{ color: "#d97706" }} />
      ),
      path: "/posts",
    },
    {
      title: "Reels",
      value: "0",
      icon: (
        <FaVideo className="text-secondary fs-3" style={{ color: "#475569" }} />
      ),
      path: "/reels",
    },
    {
      title: "Videos",
      value: "0",
      icon: (
        <FaFilm className="text-primary fs-3" style={{ color: "#1e40af" }} />
      ),
      path: "/videos",
    },
    {
      title: "Stories",
      value: "0",
      icon: (
        <FaVideo className="text-danger fs-3" style={{ color: "#dc2626" }} />
      ),
      path: "/shorts",
    },
  ].filter(Boolean); // filter out any `false` entries
})();

const top = [
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

 const users = [
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
  
function DashboardContent() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Animation variant for fade-up
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

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
            {/* Left Side: Heading and Subheading */}
            <div>
              <h4
                className="fw-semibold mb-2"
                style={{ color: "#1e3a8a", fontSize: "1.75rem" }}
              >
                {user?.role === "admin"
                  ? "Admin Dashboard"
                  : user?.role === "influencer"
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

            {/* Right Side: Button */}
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

        {/* Metric Cards */}
        <Row className="g-4 px-3 mb-5">
          {metrics.map((card, index) => (
            <Col key={index} md={6} lg={3}>
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
                    {/* Icon + Title in One Row */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div style={{ fontSize: "1.3rem" }}>{card.icon}</div>
                      <h6
                        className="fw-semibold text-muted mb-0"
                        style={{ color: "#475569" }}
                      >
                        {card.title}
                      </h6>
                    </div>

                    {/* Value */}
                    <h5 className="fw-bold text-dark mb-0">
                      <CountUp
                        start={0}
                        end={parseInt(card.value.replace(/[^0-9]/g, ""))}
                        duration={2}
                        separator=","
                        prefix={card.value.includes("$") ? "$" : ""}
                        suffix={card.value.includes("%") ? "%" : ""}
                      />
                    </h5>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Top Content Section */}
        {role !== "admin" && (
          <Row className="g-4 px-3 mb-5">
            {/* Top Performed Orders */}
            <Col md={8}>
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
                        {/* Header Row */}
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
                          <div style={{ flex: "2", padding: "8px" }}>Order</div>
                          <div style={{ flex: "1", padding: "8px" }}>
                            Platform
                          </div>
                          <div style={{ flex: "1", padding: "8px" }}>Type</div>
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
                        {/* Order Rows */}
                        {top.slice(0, 5).map((order, idx) => (
                          <div
                            key={idx}
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
                              (e.currentTarget.style.backgroundColor =
                                "#fff")
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
            </Col>

            {/* Top Influencers */}
            <Col md={4}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={2}
              >
                <Card
                  className="shadow-sm border-0 pending-orders-card"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "1rem",
                  }}
                >
                  <Card.Body>
                    <h5 className="fw-bold mb-3">
                      <i className="bi bi-people me-2" />
                      Top Business Users
                    </h5>

                    {/* Scroll removed - normal rendering */}
                    {users.map((user, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between mb-1 px-3 py-2 rounded cursor-pointer"
                        onClick={() =>
                          navigate(`/business/${user.handle.replace("@", "")}`)
                        }
                        style={{
                          backgroundColor: "#fff",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={user.img}
                            alt={user.name}
                            className="rounded-circle me-3"
                            width="40"
                            height="40"
                          />
                          <div>
                            <div className="fw-semibold">{user.name}</div>
                            <div className="text-muted small">
                              {user.handle}
                            </div>
                          </div>
                        </div>
                        <div className="fw-bold">{user.orders} orders</div>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </motion.div>
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
