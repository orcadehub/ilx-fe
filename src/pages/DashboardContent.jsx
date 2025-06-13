/*Dashboard*/
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import {
  FaUsers,
  FaChartLine,
  FaDollarSign,
  FaTools,
  FaArrowRight,
  FaBriefcase,
  FaStore,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import "./Dashboard.css";

function DashboardPage() {
  const navigate = useNavigate();

  const metricCards = [
    {
      title: "Total Users",
      value: "12430",
      icon: <FaUsers className="text-primary fs-3" />,
      path: "/users",
    },
    {
      title: "Monthly Revenue",
      value: "$48000",
      icon: <FaDollarSign className="text-success fs-3" />,
      path: "/revenue",
    },
    {
      title: "Performance",
      value: "87%",
      icon: <FaChartLine className="text-warning fs-3" />,
      path: "/performance",
    },
    {
      title: "Manage Services",
      value: "100",
      icon: <FaTools className="text-danger fs-3" />,
      path: "/services",
    },
    {
      title: "Top Influencer Orders",
      value: "152",
      icon: <FaStar className="text-info fs-3" />,
      path: "/influencers",
    },
    {
      title: "Pending Orders",
      value: "26",
      icon: <FaShoppingCart className="text-secondary fs-3" />,
      path: "/orders",
    },
    {
      title: "Business Clients",
      value: "98",
      icon: <FaBriefcase className="text-dark fs-3" />,
      path: "/clients",
    },
    {
      title: "Active Shops",
      value: "24",
      icon: <FaStore className="text-primary fs-3" />,
      path: "/shops",
    },
  ];

  const topOrders = [
    {
      name: "Alice Johnson",
      order: "#O-1021",
      platform: "Instagram",
      type: "Sponsored",
      performance: "High",
    },
    {
      name: "Michael Chen",
      order: "#O-1044",
      platform: "YouTube",
      type: "Shoutout",
      performance: "Medium",
    },
    {
      name: "Sara Patel",
      order: "#O-1099",
      platform: "TikTok",
      type: "Product",
      performance: "Very High",
    },
  ];

  const topInfluencers = [
    { name: "Daisy Moore", orders: 23 },
    { name: "Liam Scott", orders: 19 },
    { name: "Chloe Lee", orders: 17 },
  ];

  const pendingOrders = [
    {
      order: "#O-2031",
      influencer: "Daniel Ray",
      platform: "Instagram",
      type: "Review",
      status: "Pending",
    },
    {
      order: "#O-2032",
      influencer: "Ava Kim",
      platform: "YouTube",
      type: "Live",
      status: "Waiting",
    },
    {
      order: "#O-2033",
      influencer: "John Walker",
      platform: "Facebook",
      type: "Post",
      status: "Scheduled",
    },
  ];

  const topBusinessUsers = [
    { name: "TechNova Inc.", orders: 34 },
    { name: "Smartify Ltd.", orders: 27 },
    { name: "GlowMedia", orders: 22 },
  ];

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
    <div className="bg-light py-5">
      <Container>
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
        <Row className="g-4 px-3">
          {metricCards.map((card, index) => (
            <Col key={index} md={6} lg={3}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={index}
              >
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body className="d-flex flex-column align-items-start justify-content-between">
                    <div className="mb-3">{card.icon}</div>
                    <h6 className="fw-semibold">{card.title}</h6>
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
                    <Button
                      variant="outline-primary"
                      className="mt-3 w-100 rounded-pill"
                      onClick={() => navigate(card.path)}
                    >
                      View More <FaArrowRight className="ms-2" />
                    </Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div
          className="my-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h4 className="fw-bold mb-3">🏅 Top Performed Orders</h4>
          <Table responsive bordered hover className="responsive-table-sm">
            <thead className="table-primary">
              <tr>
                <th>Influencer</th>
                <th>Order</th>
                <th>Platform</th>
                <th>Type</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {topOrders.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.order}</td>
                  <td>{item.platform}</td>
                  <td>{item.type}</td>
                  <td>
                    <Badge
                      bg={
                        item.performance === "Very High"
                          ? "success"
                          : item.performance === "High"
                          ? "info"
                          : "warning"
                      }
                    >
                      {item.performance}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </motion.div>

        {/* Top Influencers and Business Users */}
        <Row className="g-4">
          <Col md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-info text-white fw-bold">
                  🌟 Top Influencers
                </Card.Header>
                <Card.Body>
                  {topInfluencers.map((influencer, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between mb-3"
                    >
                      <span>{influencer.name}</span>
                      <Badge bg="secondary">{influencer.orders} Orders</Badge>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
            >
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-dark text-white fw-bold">
                  🏢 Top Business Users
                </Card.Header>
                <Card.Body>
                  {topBusinessUsers.map((business, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between mb-3"
                    >
                      <span>{business.name}</span>
                      <Badge bg="primary">{business.orders} Orders</Badge>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Pending Orders */}
        <motion.div
          className="my-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h4 className="fw-bold mb-3">⏳ Pending Orders</h4>
          <Table responsive bordered className="responsive-table-sm">
            <thead className="table-warning">
              <tr>
                <th>Order</th>
                <th>Influencer</th>
                <th>Platform</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order, idx) => (
                <tr key={idx}>
                  <td>{order.order}</td>
                  <td>{order.influencer}</td>
                  <td>{order.platform}</td>
                  <td>{order.type}</td>
                  <td>
                    <Badge bg="warning" text="dark">
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => navigate("/orders")}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </motion.div>
      </Container>
    </div>
  );
}

export default DashboardPage;
