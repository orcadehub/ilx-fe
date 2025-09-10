import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";

function LuxContact({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  formStatus,
}) {
  // Palette
  const brand = {
    ink: "#0b1220",
    text: "#55607a",
    primary: "#5357eb",
    primaryDark: "#3a3ed4",
    glassBg: "rgba(255,255,255,0.55)",
    ice: "#EAECFF",
    border: "#e6e9f4",
    bgBand: "#f7f9fc",
    bgPanel: "#0A1A4C",
  };

  // Shared
  const sectionWrap = { backgroundColor: brand.bgBand, padding: "56px 12px" };
  const title = {
    textAlign: "center",
    fontWeight: 800,
    color: brand.ink,
    fontSize: "2rem",
    marginBottom: 28,
  };

  // Glass card
  const glass = {
    background: brand.glassBg,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: `1px solid ${brand.border}`,
    borderRadius: 18,
    boxShadow: "0 12px 32px rgba(17,24,39,.08)",
  };

  const iconCircle = {
    width: 62,
    height: 62,
    borderRadius: "50%",
    background: brand.ice,
    color: brand.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    margin: "0 auto 12px auto",
    boxShadow: "0 4px 14px rgba(83,87,235,.15)",
  };

  const ctaPrimary = {
    backgroundColor: brand.primary,
    border: "none",
    color: "#fff",
    borderRadius: 999,
    padding: "10px 20px",
    fontWeight: 700,
    boxShadow: "0 10px 20px rgba(83,87,235,.25)",
  };

  const ctaPrimaryHover = (e, on) => {
    e.currentTarget.style.backgroundColor = on
      ? brand.primaryDark
      : brand.primary;
    e.currentTarget.style.boxShadow = on
      ? "0 12px 26px rgba(58,62,212,.32)"
      : "0 10px 20px rgba(83,87,235,.25)";
  };

  // Right blue panel
  const infoPanel = {
    background:
      "linear-gradient(135deg, rgba(10,26,76,1) 0%, rgba(83,87,235,0.95) 100%)",
    borderRadius: 18,
    color: "#fff",
    boxShadow: "0 16px 38px rgba(10,26,76,.35)",
  };

  const socialBtn = {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: brand.primary,
    border: "none",
    boxShadow: "0 8px 20px rgba(255,255,255,.25)",
  };

  return (
    <section style={sectionWrap}>
      <Container>
        <h2 style={title}>Get in touch</h2>

        {/* Contact Cards */}
        <Row className="g-4 mb-5">
          {[
            {
              icon: <FaEnvelope />,
              title: "Email Us",
              text: "Have questions? Send us an email and we'll get back to you as soon as possible.",
              action: "mailto:contact@influexkonnect.com",
            },
            {
              icon: <FaPhone />,
              title: "Call Us",
              text: "Need to talk to someone? Call our support team during business hours.",
              action: "+91 90526 49591 ",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Visit Us",
              text: "Come see us at our headquarters. We'd love to show you around our facilities.",
              action: "1-24 Balaji Street, Tirupati",
            },
          ].map((c, i) => (
            <Col md={4} key={i}>
              <Card className="h-100 border-0" style={glass}>
                <Card.Body className="text-center p-4">
                  <div style={iconCircle}>{c.icon}</div>
                  <Card.Title
                    className="fs-4 fw-bold mb-2"
                    style={{ color: brand.ink }}
                  >
                    {c.title}
                  </Card.Title>
                  <Card.Text className="mb-4" style={{ color: brand.text }}>
                    {c.text}
                  </Card.Text>
                  <Button
                    style={ctaPrimary}
                    onMouseEnter={(e) => ctaPrimaryHover(e, true)}
                    onMouseLeave={(e) => ctaPrimaryHover(e, false)}
                    className="px-4"
                  >
                    {c.action}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Contact Form and Info */}
        <Row className="g-5 align-items-stretch">
          <Col lg={6}>
            <Card className="border-0 h-100" style={glass}>
              <Card.Body className="p-4 p-md-5">
                <h2 className="fw-bold mb-4" style={{ color: brand.ink }}>
                  Send Us a Message
                </h2>

                {formStatus === "success" && (
                  <Alert variant="success" className="mb-4">
                    <span className="fw-bold">Message Sent Successfully!</span>{" "}
                    We'll get back to you within 24 hours.
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6} className="mb-3 mb-md-0">
                      <Form.Group controlId="formName">
                        <Form.Label
                          className="fw-medium"
                          style={{ color: brand.ink }}
                        >
                          Your Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          size="lg"
                          style={{
                            borderRadius: 12,
                            borderColor: brand.border,
                            background: "#F7F8FC",
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label
                          className="fw-medium"
                          style={{ color: brand.ink }}
                        >
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          size="lg"
                          style={{
                            borderRadius: 12,
                            borderColor: brand.border,
                            background: "#F7F8FC",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label
                      className="fw-medium"
                      style={{ color: brand.ink }}
                    >
                      Subject
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                      size="lg"
                      style={{
                        borderRadius: 12,
                        borderColor: brand.border,
                        background: "#F7F8FC",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label
                      className="fw-medium"
                      style={{ color: brand.ink }}
                    >
                      Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      required
                      style={{
                        borderRadius: 12,
                        borderColor: brand.border,
                        background: "#F7F8FC",
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 py-3 fw-bold"
                    disabled={isSubmitting}
                    style={{
                      ...ctaPrimary,
                      borderRadius: 14,
                      fontSize: "1.06rem",
                    }}
                    onMouseEnter={(e) => ctaPrimaryHover(e, true)}
                    onMouseLeave={(e) => ctaPrimaryHover(e, false)}
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <div className="h-100 p-4 p-md-5" style={infoPanel}>
              <h2 className="fw-bold mb-4">Contact Information</h2>

              <div className="mb-5">
                <h3 className="mb-3 fs-4">Our Office</h3>
                <p className="mb-0" style={{ opacity: 0.95 }}>
                  <FaMapMarkerAlt className="me-2 fs-5" />
                  1-24 Balaji Street, Tirupati
                </p>
              </div>

              <div className="mb-5">
                <h3 className="mb-3 fs-4">Business Hours</h3>
                <p className="mb-1" style={{ opacity: 0.95 }}>
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="mb-0" style={{ opacity: 0.95 }}>
                  Saturday - Sunday: Closed
                </p>
              </div>

              <div className="mb-4">
                <h3 className="mb-3 fs-4">Connect With Us</h3>
                <div className="d-flex gap-3">
                  {[FaLinkedin, FaTwitter, FaFacebook, FaInstagram].map(
                    (Icon, i) => (
                      <button
                        key={i}
                        style={socialBtn}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <Icon className="fs-5" />
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-3 fs-4">Need Immediate Help?</h3>
                <Button
                  variant="outline-light"
                  className="w-100 py-3 fw-bold"
                  style={{
                    borderWidth: 2,
                    borderRadius: 14,
                    boxShadow: "0 10px 26px rgba(255,255,255,.15)",
                  }}
                >
                  <FaPhone className="me-2" /> Call Support: +91 90526 49591
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LuxContact;
