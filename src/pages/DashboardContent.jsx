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
  FaShoppingCart,
  FaChartPie,
  FaUserFriends,
  FaImage,
  FaVideo,
  FaFilm,
} from "react-icons/fa";

const metrics = [
  {
    title: "Campaign Impact Score",
    value: "10/100",
    icon: <FaBullseye className="text-danger fs-3" />,
    path: "/impact-score",
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
    title: "Shorts",
    value: "0",
    icon: <FaVideo className="text-danger fs-3" />,
    path: "/shorts",
  },
];

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
    <div className="bg-light py-5" style={{ minHeight: "100vh" }}>
      <Container fluid>
        {/* Dashboard Title */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="mb-5 text-center">
            <h2 className="fw-bold">📊 Business Dashboard</h2>
            <p className="text-muted">
              Monitor performance, orders, influencers, and more.
            </p>
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
                  className="shadow-sm border-0 h-100 cursor-pointer"
                  onClick={() => navigate(card.path)}
                >
                  <Card.Body className="d-flex flex-column align-items-start justify-content-between">
                    <div className="mb-3">{card.icon}</div>
                    <h6 className="fw-semibold text-muted">{card.title}</h6>
                    <h3 className="fw-bold">
                      <CountUp
                        start={0}
                        end={parseInt(card.value.replace(/[^0-9]/g, ""))}
                        duration={2}
                        separator=","
                        prefix={card.value.includes("$") ? "$" : ""}
                        suffix={card.value.includes("%") ? "%" : ""}
                      />
                    </h3>
                    {/* <div className="mt-3 w-100 d-flex align-items-center text-primary">
                      View Details <FaArrowRight className="ms-2" size={12} />
                    </div> */}
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Top Content Section */}
        <Row className="g-4 px-3 mb-5">
          <Col md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              <Card className="shadow-sm border-0 h-100 scrollable-equal-height">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">Top Performed Orders</h5>
                    <Badge
                      bg="light"
                      text="dark"
                      className="rounded-pill px-3 py-2"
                    >
                      View All <FaArrowRight className="ms-2" size={12} />
                    </Badge>
                  </div>

                  <div className="scroll-content">
                    <Table hover className="mb-0">
                      <thead>
                        <tr>
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
                          >
                            <td className="fw-medium">{order.title}</td>
                            <td>{order.platform}</td>
                            <td>{order.type}</td>
                            <td className="text-end fw-bold">{order.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={6}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              <Card className="shadow-sm border-0 h-100 scrollable-equal-height">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                    <h5 className="fw-bold mb-0">Top Business Users</h5>
                    <Badge
                      bg="light"
                      text="dark"
                      className="rounded-pill px-3 py-2"
                    >
                      View All <FaArrowRight className="ms-2" size={12} />
                    </Badge>
                  </div>

                  <div
                    className="scroll-content"
                    style={{ overflowX: "hidden" }}
                  >
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
                              <h6 className="fw-bold mb-1">{user.name}</h6>
                              <p className="text-muted mb-0">{user.handle}</p>
                            </div>
                          </div>
                          <div>
                            <h6 className="fw-bold mb-0 text-end">
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

        <Row className="g-4 px-3">
          <Col md={8}>
            <PendingOrders />
          </Col>
          <Col md={4}>
            <TopBusinessUsers />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashboardContent;
