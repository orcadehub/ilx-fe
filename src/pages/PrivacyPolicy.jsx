import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const PrivacyPolicy = () => {
  const palette = {
    pageBg: "#f7f9fc",
    cardBorder: "#e6e9f4",
    ink: "#0b1220",
    muted: "#64748b",
    gradFrom: "#605cff",
    gradTo: "#4a00e0",
  };

  const wrapStyle = { backgroundColor: palette.pageBg, padding: "48px 12px" };
  const containerStyle = { maxWidth: 1100, margin: "0 auto" };
  const cardStyle = {
    borderRadius: 18,
    border: `1px solid ${palette.cardBorder}`,
    boxShadow: "0 10px 28px rgba(17,24,39,.06)",
    padding: 28,
    backgroundColor: "#fff",
  };
  const h1Style = {
    fontWeight: 800,
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: 8,
    backgroundImage: `linear-gradient(90deg, ${palette.gradFrom}, ${palette.gradTo})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
    lineHeight: 1.25,
  };
  const updatedStyle = { textAlign: "center", color: palette.muted, marginBottom: 22 };
  const leadStyle = { color: palette.ink, fontSize: "1.06rem", lineHeight: 1.75, marginBottom: 22 };
  const h2Style = { color: palette.ink, fontWeight: 700, fontSize: "1.15rem", marginBottom: 12, marginTop: 8 };
  const pStyle = { color: palette.ink, lineHeight: 1.7, marginBottom: 10 };
  const smallStyle = { color: palette.muted, lineHeight: 1.7, marginBottom: 10 };
  const listStyle = { color: palette.muted, marginBottom: 10 };
  const divider = { height: 1, backgroundColor: palette.cardBorder, border: 0, margin: "16px 0 24px" };

  return (
    <div style={wrapStyle}>
      <div style={containerStyle}>
        <Row className="justify-content-center">
          <Col md={12} lg={10}>
            <Card style={cardStyle} className="border-0">
              <h1 style={h1Style}>Privacy Policy – InfluexKonnect</h1>
              <p style={updatedStyle}>Last Updated: August 28, 2025</p>
              <p style={leadStyle}>
                InfluexKonnect values privacy. This Policy explains how data is collected, used, and protected when using the platform.
              </p>

              <hr style={divider} />

              <div className="mb-3">
                <h2 style={h2Style}>1. Information We Collect</h2>
                <p style={pStyle}><strong>Personal Data:</strong> Name, email, phone, payment details.</p>
                <p style={pStyle}><strong>Social Media Data (with user consent):</strong></p>
                <ul style={listStyle}>
                  <li>Profile info (username, profile ID).</li>
                  <li>Followers/subscribers count.</li>
                  <li>Post data (likes, comments, shares, views, engagement rates).</li>
                  <li>Post schedules and publishing history.</li>
                </ul>
                <p style={pStyle}><strong>Technical Data:</strong> Device type, browser, IP, usage logs.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>2. How We Use Collected Data</h2>
                <ul style={listStyle}>
                  <li>Display influencer profiles and audience reach.</li>
                  <li>Provide analytics dashboards for influencers and brands.</li>
                  <li>Connect influencers with brands using performance metrics.</li>
                  <li>Generate campaign reports and track effectiveness.</li>
                  <li>Improve features and services.</li>
                </ul>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>3. Data Sharing</h2>
                <p style={pStyle}>We never sell personal or social media data to third parties.</p>
                <p style={pStyle}>Data may be shared only with:</p>
                <ul style={listStyle}>
                  <li>Brands/Businesses for collaboration proposals.</li>
                  <li>Trusted service providers (payments, analytics).</li>
                </ul>
                <p style={smallStyle}>Disclosures may be made if required by law.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>4. API Compliance</h2>
                <p style={smallStyle}>
                  We use official APIs (Instagram Graph API, YouTube Data API, Facebook API, Twitter/X API) under their terms of use.
                </p>
                <p style={smallStyle}>Read‑only permissions for metrics; never posting or altering accounts.</p>
                <p style={smallStyle}>Access can be revoked anytime in the social platform’s settings.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>5. Data Security</h2>
                <p style={smallStyle}>
                  Industry‑standard safeguards including encryption, secure servers, and access controls are implemented.
                </p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>6. User Rights</h2>
                <ul style={listStyle}>
                  <li>Request a copy of stored data.</li>
                  <li>Update or delete account information.</li>
                  <li>Revoke social media access at any time.</li>
                  <li>Opt‑out of promotional emails.</li>
                </ul>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>7. Children’s Privacy</h2>
                <p style={smallStyle}>Our services are not intended for individuals under 18 years old.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>8. Changes to Policy</h2>
                <p style={smallStyle}>This Policy may be updated periodically, with notice for significant changes.</p>
              </div>

              <div className="mb-1">
                <h2 style={h2Style}>9. Contact Us</h2>
                <p style={smallStyle}>For privacy or terms‑related questions, contact:</p>
                <p style={pStyle} className="fw-bold">InfluexKonnect Support</p>
                <p style={smallStyle}>📧 support@influexkonnect.com</p>
                <p style={smallStyle}>🌐 www.influexkonnect.com</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
