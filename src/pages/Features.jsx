import React from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import Explore from "../components/Explore";
import Ready from "../components/Ready";
const featuresData = [
  {
    title: "Influencer Discovery",
    points: [
      "Find the perfect influencers for your brand.",
      "Real-time data updates.",
      "Global reach.",
    ],
    bg: "#F0F9FF",
  },
  {
    title: "Audience Analytics",
    points: [
      "Deep insights into influencer audiences.",
      "Engagement tracking.",
      "Growth trends.",
    ],
    bg: "#FEF9C3",
  },
  {
    title: "Fake Follower Detection",
    points: [
      "AI-powered fake follower detection.",
      "Authenticity scores.",
      "Quality assurance.",
    ],
    bg: "#ECFDF5",
  },
  {
    title: "Campaign Tracking",
    points: [
      "Monitor campaigns in real-time.",
      "Cross-platform tracking.",
      "Custom reports.",
    ],
    bg: "#FFF7ED",
  },
  {
    title: "ROI Measurement",
    points: [
      "Calculate influencer ROI.",
      "Conversion tracking.",
      "Performance benchmarks.",
    ],
    bg: "#F3F4F6",
  },
  {
    title: "Campaign Management",
    points: [
      "Streamline your marketing workflow.",
      "Content approval flows.",
      "Automated payments.",
    ],
    bg: "#FDF4FF",
  },
  {
    title: "Content Performance",
    points: [
      "Track content performance.",
      "Engagement metrics.",
      "Optimization insights.",
    ],
    bg: "#EFF6FF",
  },
  {
    title: "Global Network",
    points: [
      "Worldwide network of verified influencers.",
      "Verified profiles.",
      "Diverse niches.",
    ],
    bg: "#FAFAF9",
  },
];

const Features = () => {
  return (
    <section
      style={{
        background: "linear-gradient(to right, #f7f7f7, #f0f0f0)",
        padding: "4rem 0",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Container className="mb-4">
        <div className="text-center mb-5">
          <h2
            className="fw-bold mb-3"
            style={{ fontSize: "2.5rem", color: "#111" }}
          >
            Powerful Features for Influencer Marketing
          </h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
            Discover all the tools you need to elevate your influencer campaigns
            and measure success with elegance.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <Button
              variant="dark"
              className="px-4 py-2 rounded-pill"
              style={{ boxShadow: "0 6px 15px rgba(0,0,0,0.15)" }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="primary"
              className="px-4 py-2 rounded-pill"
              style={{
                backgroundColor: "#4a90e2",
                boxShadow: "0 6px 15px rgba(74,144,226,0.3)",
              }}
            >
              Schedule Demo
            </Button>
          </div>
        </div>

        <Row className="g-4">
          {featuresData.map((feature, idx) => (
            <Col key={idx} xs={12} sm={6} lg={4}>
              <Card
                className="h-100 shadow-sm border-0"
                style={{
                  borderRadius: "20px",
                  backgroundColor: feature.bg,
                }}
              >
                <Card.Body>
                  <Card.Title
                    className="fw-semibold mb-3"
                    style={{ color: "#222" }}
                  >
                    {feature.title}
                  </Card.Title>
                  <ListGroup variant="flush">
                    {feature.points.map((point, index) => (
                      <ListGroup.Item
                        key={index}
                        className="ps-0 border-0"
                        style={{
                          color: "#555",
                          fontSize: "0.95rem",
                          background: "transparent",
                        }}
                      >
                        <span
                          style={{
                            color: "#4a90e2",
                            fontWeight: "bold",
                            marginRight: "8px",
                          }}
                        >
                          •
                        </span>
                        {point}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Explore />
      <Ready />
    </section>
  );
};

export default Features;
