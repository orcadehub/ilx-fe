import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function Getin() {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "64px 0",
      }}
    >
      <Container>
        <Row className="align-items-start">
          {/* Contact Info */}
          <Col md={6} className="mb-5">
            <h1 className="fw-bold mb-3" style={{ color: "#111827", fontSize: "2.7rem" }}>
              Get in Touch
            </h1>
            <p className="mb-4" style={{ color: "#50577b", fontSize: "1.27rem", lineHeight: 1.5 }}>
              Have questions about InfluexKonnect? Our team is here to help you
              find the right solution for your business.
            </p>

            {/* Email */}
            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                <div
                  style={{
                    background: "#EAECFF",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaEnvelope color="#5357eb" size={22} />
                </div>
              </div>
              <div>
                <div className="fw-bold mb-1" style={{ color: "#2b2d31", fontSize: "1.09rem" }}>
                  Email Us
                </div>
                <a
                  href="mailto:contact@influenceconnect.com"
                  style={{
                    color: "#5357eb",
                    fontSize: "1.06rem",
                    textDecoration: "none",
                    wordBreak: "break-all"
                  }}
                >
                  contact@influexconnect.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="d-flex align-items-center mb-4">
              <div className="me-3">
                <div
                  style={{
                    background: "#EAECFF",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaPhone color="#5357eb" size={22} />
                </div>
              </div>
              <div>
                <div className="fw-bold mb-1" style={{ color: "#2b2d31", fontSize: "1.09rem" }}>
                  Call Us
                </div>
                <div style={{ color: "#50577b", fontSize: "1.06rem" }}>
                  +91 22222 33333
                </div>
              </div>
            </div>

            {/* Visit */}
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div
                  style={{
                    background: "#EAECFF",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaMapMarkerAlt color="#5357eb" size={22} />
                </div>
              </div>
              <div>
                <div className="fw-bold mb-1" style={{ color: "#2b2d31", fontSize: "1.09rem" }}>
                  Visit Us
                </div>
                <div style={{ color: "#50577b", fontSize: "1.06rem" }}>
                  123 Balaji Street, Tirupati City, 11111
                </div>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col md={6}>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label style={{ color: "#2b2d31", fontWeight: 600 }}>
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    style={{
                      background: "#F7F8FC",
                      borderRadius: 10,
                      border: "1.6px solid #e5e7eb",
                      fontSize: "1rem"
                    }}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label style={{ color: "#2b2d31", fontWeight: 600 }}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Your email"
                    style={{
                      background: "#F7F8FC",
                      borderRadius: 10,
                      border: "1.6px solid #e5e7eb",
                      fontSize: "1rem"
                    }}
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2b2d31", fontWeight: 600 }}>
                  Company (Optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your company"
                  style={{
                    background: "#F7F8FC",
                    borderRadius: 10,
                    border: "1.6px solid #e5e7eb",
                    fontSize: "1rem"
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label style={{ color: "#2b2d31", fontWeight: 600 }}>
                  Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="How can we help you?"
                  style={{
                    background: "#F7F8FC",
                    borderRadius: 10,
                    border: "1.6px solid #e5e7eb",
                    fontSize: "1rem"
                  }}
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 fw-bold"
                style={{
                  background: "#5357eb",
                  border: "none",
                  padding: "10px",
                  borderRadius: "14px",
                  fontSize: "1.08rem",
                  marginTop: "8px",
                  boxShadow: "0 6px 12px rgba(83,87,235,0.08)",
                  transition: "all 0.32s cubic-bezier(.4,0,.2,1)",
                  color: "#fff"
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#3a3ed4")}
                onMouseLeave={e => (e.currentTarget.style.background = "#5357eb")}
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
