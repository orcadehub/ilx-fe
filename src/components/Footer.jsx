import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

function Footer() {
  const fontFamily = "'Playfair Display', serif";
  const primaryColor = "#848c9cff";
  const accentColor = "#000000ff";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const linkStyle = {
    color: primaryColor,
    textDecoration: "none",
    transition: "color 0.3s ease",
    cursor: "pointer",
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = accentColor;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = primaryColor;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Please enter a valid email");

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(`${baseURL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Successfully subscribed!");
        setEmail("");
      } else {
        setMessage(data?.error || "❌ Subscription failed");
      }
    } catch (err) {
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="text-dark pt-5 pb-3 mt-5">
      <Container>
        <Row className="gy-5">
          {/* Brand Section */}
          <Col xs={12} md={6} lg={3}>
            <h4 className="fw-bold mb-3">InfluexKonnect</h4>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: primaryColor }}>
              InfluexKonnect is a smart platform that helps brands discover,
              connect, and collaborate with vetted influencers effortlessly.
            </p>
            <div className="d-flex gap-3 mt-3">
              {[InstagramIcon, FacebookIcon, TwitterIcon, YouTubeIcon].map(
                (IconComp, idx) => (
                  <a
                    href="#"
                    key={idx}
                    style={{
                      color: "#064685ff",
                      fontSize: "1.6rem",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    aria-label="Social media link"
                  >
                    <IconComp />
                  </a>
                )
              )}
            </div>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={3} lg={3}>
            <h5 className="fw-semibold mb-3">Quick Links</h5>
            <ul className="list-unstyled" style={{ fontSize: "0.95rem" }}>
              {[
                { label: "Features", path: "/features" },
                { label: "Pricing", path: "/pricing" },
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Support */}
          <Col xs={6} md={3} lg={3}>
            <h5 className="fw-semibold mb-3">Support</h5>
            <ul className="list-unstyled" style={{ fontSize: "0.95rem" }}>
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Cancellation & Refund", href: "/cancellation-refund-policy" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Newsletter */}
          <Col xs={12} md={6} lg={3}>
            <h5 className="fw-semibold mb-3">Newsletter</h5>
            <p style={{ fontSize: "0.95rem", color: primaryColor }}>
              Subscribe to our newsletter for updates
            </p>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  aria-label="Your email"
                  className="rounded-start"
                  style={{ borderColor: primaryColor }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  variant="dark"
                  type="submit"
                  className="rounded-end px-4"
                  style={{
                    backgroundColor: primaryColor,
                    borderColor: primaryColor,
                    fontWeight: 600,
                    fontFamily,
                    transition: "background-color 0.3s ease",
                  }}
                  disabled={loading}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#00194d";
                    e.currentTarget.style.borderColor = "#00194d";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor;
                    e.currentTarget.style.borderColor = primaryColor;
                  }}
                >
                  {loading ? "..." : "Subscribe"}
                </Button>
              </InputGroup>
            </Form>
            {message && (
              <small style={{ color: message.includes("✅") ? "green" : "red" }}>
                {message}
              </small>
            )}
          </Col>
        </Row>

        <hr className="mt-4" style={{ borderColor: primaryColor }} />

        <Row>
          <Col className="text-center">
            <small style={{ fontSize: "0.85rem", color: "#000000ff" }}>
              ©️ 2025 <b style={{ color: "rgba(74, 75, 157, 1)" }}>InfluexKonnect</b>. All
              rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;