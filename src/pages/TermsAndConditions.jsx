import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const TermsAndConditions = () => {
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
              <h1 style={h1Style}>Terms & Conditions – InfluexKonnect</h1>
              <p style={updatedStyle}>Last Updated: August 28, 2025</p>
              <p style={leadStyle}>
                Welcome to InfluexKonnect (“Company”, “we”, “our”, “us”). By accessing or using our platform, you agree to be bound by these
                Terms & Conditions. If you do not agree, please discontinue use immediately.
              </p>

              <hr style={divider} />

              <div className="mb-3">
                <h2 style={h2Style}>1. Definitions</h2>
                <p style={pStyle}><strong>“Platform”</strong> refers to the InfluexKonnect website, application, and services.</p>
                <p style={pStyle}><strong>“Influencer”</strong> means users who connect social media accounts to showcase and promote products/services.</p>
                <p style={pStyle}><strong>“Brand/Business”</strong> means companies that collaborate with influencers for campaigns.</p>
                <p style={pStyle}><strong>“User”</strong> means any person accessing or using the Platform.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>2. Eligibility</h2>
                <p style={smallStyle}>You must be at least 18 years old and legally capable of entering into binding agreements to use the Platform.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>3. Services</h2>
                <p style={smallStyle}>InfluexKonnect enables influencers and brands to:</p>
                <ul style={listStyle}>
                  <li>Connect and manage collaborations.</li>
                  <li>Link social media accounts (Instagram, Facebook, YouTube, Twitter/X).</li>
                  <li>Collect and analyze performance data such as followers, subscribers, post reach, likes, comments, shares, and views.</li>
                  <li>Use analytics for campaign planning, performance tracking, and marketplace visibility.</li>
                </ul>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>4. Account Registration</h2>
                <p style={smallStyle}>Provide accurate information and keep login credentials secure.</p>
                <p style={smallStyle}>You authorize InfluexKonnect to access connected social media accounts only to retrieve analytics data as permitted by the respective platforms’ APIs.</p>
                <p style={smallStyle}>We will never post, comment, or act on your behalf without explicit consent.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>5. Payments & Commissions</h2>
                <p style={smallStyle}>Influencer earnings, commissions, and payments are processed as per campaign agreements between influencers and brands.</p>
                <p style={smallStyle}>InfluexKonnect may charge platform service fees.</p>
                <p style={smallStyle}>Users are responsible for applicable taxes and compliance.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>6. User Responsibilities</h2>
                <ul style={listStyle}>
                  <li>Do not share unlawful, harmful, or misleading content.</li>
                  <li>Do not misuse connected social accounts or provide false metrics.</li>
                  <li>Respect third‑party platform rules (Instagram, Facebook, YouTube, Twitter/X).</li>
                </ul>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>7. Data Access & Ownership</h2>
                <p style={smallStyle}>Influencers retain full ownership of their social media content.</p>
                <p style={smallStyle}>InfluexKonnect accesses public metrics and account analytics for insights, not private messages or personal content.</p>
                <p style={smallStyle}>Users grant InfluexKonnect a limited license to use extracted metrics for analytics, campaign reporting, and marketplace display.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>8. Limitation of Liability</h2>
                <p style={smallStyle}>InfluexKonnect is not liable for:</p>
                <ul style={listStyle}>
                  <li>Accuracy of third‑party social media data.</li>
                  <li>Direct/indirect losses from campaigns or collaborations.</li>
                  <li>Service interruptions caused by external APIs.</li>
                </ul>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>9. Termination</h2>
                <p style={smallStyle}>Accounts may be suspended or terminated for violations of these Terms or misuse of integrations.</p>
              </div>

              <div className="mb-1">
                <h2 style={h2Style}>10. Governing Law</h2>
                <p style={smallStyle}>These Terms are governed by Indian law; courts in Tirupati, Andhra Pradesh have exclusive jurisdiction.</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TermsAndConditions;
