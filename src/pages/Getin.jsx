import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Getin() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff", // White background
        padding: "60px 20px",
      }}
    >
      <Container>
        <Row className="align-items-start">
          {/* Contact Info */}
          <Col md={6} className="mb-5">
            <h2 className="fw-bold mb-3" style={{ color: "#1B263B" }}>
              Get in Touch
            </h2>
            <p className="mb-4" style={{ color: "#415A77" }}>
              Have questions about InfluexKonnect? Our team is here to help you
              find the right solution for your business.
            </p>

            <div className="d-flex mb-4">
              <div className="me-3">
                <div
                  className="p-3 rounded-circle shadow-sm"
                  style={{ backgroundColor: "#1B263B" }}
                >
                  <FaEnvelope color="#F5F5F7" size={20} />
                </div>
              </div>
              <div>
                <h6 className="fw-bold mb-1" style={{ color: "#1B263B" }}>
                  Email Us
                </h6>
                <a
                  href="mailto:contact@influenceconnect.com"
                  className="text-decoration-none"
                  style={{ color: "#2575fc" }}
                >
                  contact@influenceconnect.com
                </a>
              </div>
            </div>

            <div className="d-flex mb-4">
              <div className="me-3">
                <div
                  className="p-3 rounded-circle shadow-sm"
                  style={{ backgroundColor: "#1B263B" }}
                >
                  <FaPhone color="#F5F5F7" size={20} />
                </div>
              </div>
              <div>
                <h6 className="fw-bold mb-1" style={{ color: "#1B263B" }}>
                  Call Us
                </h6>
                <p className="mb-0" style={{ color: "#415A77" }}>
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="d-flex">
              <div className="me-3">
                <div
                  className="p-3 rounded-circle shadow-sm"
                  style={{ backgroundColor: "#1B263B" }}
                >
                  <FaMapMarkerAlt color="#F5F5F7" size={20} />
                </div>
              </div>
              <div>
                <h6 className="fw-bold mb-1" style={{ color: "#1B263B" }}>
                  Visit Us
                </h6>
                <p className="mb-0" style={{ color: "#415A77" }}>
                  123 Influence Street, Marketing City, 94105
                </p>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col md={6}>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label style={{ color: "#1B263B" }}>Name</Form.Label>
                  <Form.Control type="text" placeholder="Your name" />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label style={{ color: "#1B263B" }}>Email</Form.Label>
                  <Form.Control type="email" placeholder="Your email" />
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#1B263B" }}>
                  Company (Optional)
                </Form.Label>
                <Form.Control type="text" placeholder="Your company" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ color: "#1B263B" }}>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="How can we help you?"
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 fw-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                  border: "none",
                  padding: "12px",
                  borderRadius: "50px",
                  fontSize: "16px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  color: "white",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Getin;
