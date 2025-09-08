import React from "react";
import { Card, Badge, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight,FaInstagram ,FaYoutube,FaTiktok,FaFacebook} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

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

const TopPerformedOrders = () => {
  const navigate = useNavigate();

  return (
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
                  <div style={{ flex: "1", padding: "8px" }}>Platform</div>
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
                      (e.currentTarget.style.backgroundColor = "#e2e8f0")
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
                    <div style={{ flex: "1", padding: "8px" }}>{order.type}</div>
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
  );
};

export default TopPerformedOrders;