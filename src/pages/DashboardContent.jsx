/*BussinessDashboard*/
import React from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
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
        icon: <FaUserFriends className="text-info fs-3" />,
        path: "/influencers",
      },
      {
        title: "Business Users",
        value: "873",
        icon: <FaUserTie className="text-primary fs-3" />,
        path: "/business-users",
      },
      {
        title: "Team Members",
        value: "14",
        icon: <FaUsers className="text-warning fs-3" />,
        path: "/team",
      },
      {
        title: "Active Support Tickets",
        value: "32",
        icon: <FaHeadset className="text-danger fs-3" />,
        path: "/support",
      },
      {
        title: "Total Campaigns",
        value: "326",
        icon: <FaHandshake className="text-success fs-3" />,
        path: "/campaigns",
      },
      {
        title: "Total Transactions",
        value: "2,143",
        icon: <FaMoneyCheckAlt className="text-secondary fs-3" />,
        path: "/transactions",
      },
      {
        title: "Pending Withdrawals",
        value: "12",
        icon: <FaHourglassHalf className="text-danger fs-3" />,
        path: "/withdrawals",
      },
      {
        title: "Service Orders",
        value: "487",
        icon: <FaTasks className="text-primary fs-3" />,
        path: "/service-orders",
      },
    ];
  }

  const isInfluencer = role === "influencer";

  return [
    !isInfluencer && {
      title: "Campaign Impact Score",
      value: "10/100",
      icon: <FaBullseye className="text-danger fs-3" />,
      path: "/impact-score",
    },
    isInfluencer && {
      title: "Earnings",
      value: "₹0",
      icon: <FaRupeeSign className="text-success fs-3" />,
      path: "/earnings",
    },
    {
      title: "Total Orders",
      value: "0",
      icon: <FaShoppingCart className="text-primary fs-3" />,
      path: "/orders",
    },
    {
      title: "Active/Total Campaigns",
      value: "0/0",
      icon: <FaChartPie className="text-success fs-3" />,
      path: "/campaigns",
    },
    {
      title: "Connected Influencers",
      value: "0",
      icon: <FaUserFriends className="text-info fs-3" />,
      path: "/influencers",
    },
    {
      title: "Total Posts",
      value: "0",
      icon: <FaImage className="text-warning fs-3" />,
      path: "/posts",
    },
    {
      title: "Reels",
      value: "0",
      icon: <FaVideo className="text-secondary fs-3" />,
      path: "/reels",
    },
    {
      title: "Videos",
      value: "0",
      icon: <FaFilm className="text-primary fs-3" />,
      path: "/videos",
    },
    {
      title: "Stories",
      value: "0",
      icon: <FaVideo className="text-danger fs-3" />,
      path: "/shorts",
    },
  ].filter(Boolean); // filter out any `false` entries
})();

const top = [
  {
    title: "Summer Collection",
    platform: [
      <FaInstagram className="text-danger me-1" />,
      <FaInstagram className="text-danger" />,
    ],
    type: [
      <Badge bg="info" className="me-1">
        reel
      </Badge>,
      <Badge bg="primary">story</Badge>,
    ],
    value: "92%",
    link: "/orders/summer-collection",
  },
  {
    title: "Product Launch",
    platform: [<FaYoutube className="text-danger" />],
    type: [<Badge bg="warning">video</Badge>],
    value: "89%",
    link: "/orders/product-launch",
  },
  {
    title: "Brand Promotion",
    platform: [
      <FaInstagram className="text-danger me-1" />,
      <FaTiktok className="text-dark" />,
    ],
    type: [
      <Badge bg="success" className="me-1">
        post
      </Badge>,
      <Badge bg="info">reel</Badge>,
    ],
    value: "85%",
    link: "/orders/brand-promotion",
  },
  {
    title: "Tutorial Series",
    platform: [
      <FaYoutube className="text-danger me-1" />,
      <FaTiktok className="text-dark" />,
    ],
    type: [
      <Badge bg="warning" className="me-1">
        video
      </Badge>,
      <Badge bg="info">short</Badge>,
    ],
    value: "82%",
    link: "/orders/tutorial-series",
  },
  {
    title: "Brand Partnership",
    platform: [<FaFacebook className="text-primary" />],
    type: [<Badge bg="success">post</Badge>],
    value: "75%",
    link: "/orders/brand-partnership",
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
      style={{ minHeight: "100vh", backgroundColor: "hsl(214.3 31.8% 98%)" }}
    >
      <Container fluid>
        {/* Dashboard Title */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div
            className="d-flex justify-content-between align-items-center mb-5 px-4 py-3 rounded shadow-sm"
            style={{
              backgroundColor: "hsl(214.3, 31.8%, 98%)", // consistent light blue
              borderLeft: "5px solid #1A237E",
            }}
          >
            {/* Left Side: Heading and Subheading */}
            <div>
              <h4
                className="fw-bold mb-2"
                style={{ color: "#1A237E", fontSize: "1.75rem" }}
              >
                {user?.role === "admin"
                  ? "Admin Dashboard"
                  : user?.role === "influencer"
                  ? "Influencer Dashboard"
                  : "Business Dashboard"}
              </h4>
              <p
                className="text-muted"
                style={{ fontSize: "1rem", marginBottom: 0 }}
              >
                Monitor performance, orders, influencers, and more.
              </p>
            </div>

            {/* Right Side: Button */}
            <div className="text-center">
              <button
                className="btn btn-outline-primary rounded-pill px-4 py-2 shadow-sm"
                style={{ fontWeight: 500 }}
                onClick={() => navigate("/dashboard/influencers")}
              >
                Find Influencers
              </button>
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
                  className="shadow-sm border-0 premium-card"
                  style={{
                    background: "hsl(214.3 31.8% 98%)",
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
                      <h6 className="fw-semibold text-muted mb-0">
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
            <Col md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={1}
              >
                <Card
                  className="border-0 shadow-sm h-100 scrollable-equal-height"
                  style={{
                    backgroundColor: "hsl(214.3, 31.8%, 98%)",
                    borderRadius: "1rem",
                  }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="fw-bold mb-0 text-dark">
                        Top Performed Orders
                      </h5>
                      <Badge
                        bg="light"
                        text="dark"
                        className="rounded-pill px-3 py-2 shadow-sm"
                        style={{ cursor: "pointer" }}
                      >
                        View All <FaArrowRight className="ms-2" size={12} />
                      </Badge>
                    </div>

                    <div
                      className="scroll-content"
                      style={{
                        backgroundColor: "hsl(214.3, 31.8%, 98%)",
                        borderRadius: "1rem",
                      }}
                    >
                      <Table hover className="mb-0">
                        <thead>
                          <tr className="text-muted large">
                            <th>Order</th>
                            <th>Platform</th>
                            <th>Type</th>
                            <th className="text-end">Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {top.map((order, idx) => (
                            <tr
                              key={idx}
                              className="cursor-pointer"
                              onClick={() => navigate(order.link)}
                              style={{
                                backgroundColor: "hsl(214.3, 31.8%, 98%)",
                              }}
                            >
                              <td className="fw-medium">{order.title}</td>
                              <td>{order.platform}</td>
                              <td>{order.type}</td>
                              <td className="text-end fw-bold">
                                {order.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Top Influencers */}
            <Col md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={2}
              >
                <Card
                  className="border-0 shadow-sm h-100 scrollable-equal-height"
                  style={{
                    backgroundColor: "hsl(214.3, 31.8%, 98%)",
                    borderRadius: "1rem",
                  }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold mb-0 text-dark">
                        Top Influencers
                      </h5>
                      <Badge
                        bg="light"
                        text="dark"
                        className="rounded-pill px-3 py-2 shadow-sm"
                        style={{ cursor: "pointer" }}
                      >
                        View All <FaArrowRight className="ms-2" size={12} />
                      </Badge>
                    </div>

                    <div style={{ overflowX: "hidden" }}>
                      <div className="row gx-0">
                        {[
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
                        ].map((user, index) => (
                          <div
                            key={index}
                            className="w-100 d-flex justify-content-between align-items-center border-bottom py-2 cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/business/${user.handle.replace("@", "")}`
                              )
                            }
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
                                <h6 className="fw-bold mb-1 text-dark">
                                  {user.name}
                                </h6>
                                <p className="text-muted mb-0 small">
                                  {user.handle}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0 text-end text-dark">
                                {user.orders} orders
                              </h6>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
              backgroundColor: "hsl(214.3, 31.8%, 98%)", // Same as dashboard background
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
              backgroundColor: "hsl(214.3, 31.8%, 98%)", // Same as dashboard background
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
