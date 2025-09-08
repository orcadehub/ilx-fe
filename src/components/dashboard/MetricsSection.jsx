import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const MetricsSection = ({ metrics }) => {
  const navigate = useNavigate();

  return (
    <Row className="g-4 px-3 mb-5">
      {metrics && metrics.length > 0 ? (
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
                    {card.value.includes("/") ? (
                      card.value
                    ) : (
                      <CountUp
                        start={0}
                        end={parseInt(card.value.replace(/[^0-9]/g, ""), 10) || 0}
                        duration={2}
                        separator=","
                        prefix={card.value.includes("₹") ? "₹" : ""}
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
  );
};

export default MetricsSection;