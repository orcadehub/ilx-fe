import React from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

function Footer() {
  const fontFamily = "'Playfair Display', serif";

  return (
    <footer
      className="bg-white text-dark pt-5 pb-3 mt-5"
      style={{ fontFamily }}
    >
      <Container>
        <Row className="gy-5">
          {/* Brand Section */}
          <Col xs={12} md={6} lg={3}>
            <h4 className="fw-bold mb-3" style={{ color: "#002366" }}>
              InfluexKonnect
            </h4>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
              InfluexKonnect is a smart platform that helps brands discover,
              connect, and collaborate with vetted influencers effortlessly.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                className="text-dark fs-4"
                style={{ transition: "color 0.3s" }}
              >
                <InstagramIcon
                  sx={{ color: "#002366", "&:hover": { color: "#bfa046" } }}
                />
              </a>
              <a href="#" className="text-dark fs-4">
                <FacebookIcon
                  sx={{ color: "#002366", "&:hover": { color: "#bfa046" } }}
                />
              </a>
              <a href="#" className="text-dark fs-4">
                <TwitterIcon
                  sx={{ color: "#002366", "&:hover": { color: "#bfa046" } }}
                />
              </a>
              <a href="#" className="text-dark fs-4">
                <YouTubeIcon
                  sx={{ color: "#002366", "&:hover": { color: "#bfa046" } }}
                />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={3} lg={2}>
            <h5 className="fw-semibold mb-3" style={{ color: "#002366" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled" style={{ fontSize: "0.95rem" }}>
              {[
                { label: "Features", path: "/features" },
                { label: "Pricing", path: "/pricing" },
                { label: "Testimonials", path: "/testimonials" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    className="text-decoration-none text-dark quick-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Support */}
          <Col xs={6} md={3} lg={2}>
            <h5 className="fw-semibold mb-3" style={{ color: "#002366" }}>
              Support
            </h5>
            <ul className="list-unstyled" style={{ fontSize: "0.95rem" }}>
              {[
                { label: "Help Center", href: "/help-center" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Cancellation & Refund", href: "/cancellation-refund-policy" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-decoration-none text-dark support-link"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Newsletter */}
          <Col xs={12} md={6} lg={5}>
            <h5 className="fw-semibold mb-3" style={{ color: "#002366" }}>
              Newsletter
            </h5>
            <p style={{ fontSize: "0.95rem" }}>
              Subscribe to our newsletter for updates
            </p>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  aria-label="Your email"
                  className="rounded-start"
                  style={{ borderColor: "#002366" }}
                />
                <Button
                  variant="dark"
                  type="submit"
                  className="rounded-end px-4"
                  style={{
                    backgroundColor: "#002366",
                    borderColor: "#002366",
                    fontWeight: 600,
                    fontFamily,
                    "&:hover": {
                      backgroundColor: "#00194d",
                      borderColor: "#00194d",
                    },
                  }}
                >
                  Subscribe
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <hr className="mt-4" style={{ borderColor: "#002366" }} />

        {/* Bottom Text */}
        <Row>
          <Col className="text-center">
            <small style={{ fontSize: "0.85rem", color: "#333" }}>
              ©️ 2025 <b style={{ color: "#002366" }}>InfluexKonnect</b>. All
              rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
