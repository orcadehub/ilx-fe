import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const CancellationRefundPolicy = () => {
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
              <h1 style={h1Style}>Cancellation & Refund Policy</h1>
              <p style={updatedStyle}>Last updated: August 28, 2025</p>
              <p style={leadStyle}>
                InfluexKonnect values transparency and fairness. This policy outlines the terms around cancellations and refunds for services
                and campaigns facilitated via the platform.
              </p>

              <hr style={divider} />

              <div className="mb-3">
                <h2 style={h2Style}>1. Cancellation/Refund Request Window</h2>
                <p style={pStyle}>Requests must be submitted within 3–5 days of placing the order/booking.</p>
                <p style={smallStyle}>
                  Requests submitted after this window generally cannot be accepted—especially if influencer engagement, content creation, or
                  service delivery has started.
                </p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>2. Refund Eligibility</h2>
                <p style={smallStyle}>Refunds may be considered under these circumstances:</p>
                <ul style={listStyle}>
                  <li>If the delivered content or service materially differs from what was represented on the platform.</li>
                  <li>If the campaign could not be initiated due to InfluexKonnect’s operational or technical error.</li>
                  <li>If the content delivered is defective, compromised, or not as described.</li>
                </ul>
                <p style={smallStyle}>All claims of quality issues must be filed within 3–5 days of receiving the deliverable.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>3. Non-Refundable or Excluded Cases</h2>
                <p style={smallStyle}>Cancellations are not allowed if services/campaigns have already commenced or been delivered.</p>
                <p style={smallStyle}>
                  Custom or one-off influencer packages and perishable or time-sensitive services are non-refundable except in cases of
                  quality failure.
                </p>
                <p style={smallStyle}>Subjective dissatisfaction (e.g., creative style) is not eligible for a refund.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>4. Refund Processing Time</h2>
                <p style={smallStyle}>Approved refunds are processed within 6–8 business days back to the original payment method.</p>
                <p style={smallStyle}>Please note: additional delays may occur depending on your bank or payment provider.</p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>5. Warranty or Third-Party Coverage</h2>
                <p style={smallStyle}>
                  If the service/product includes a manufacturer or influencer warranty, customers are advised to contact the third-party
                  provider directly.
                </p>
              </div>

              <div className="mb-3">
                <h2 style={h2Style}>6. Contact & Submission Instructions</h2>
                <p style={smallStyle}>To initiate a cancellation or refund request:</p>
                <p style={pStyle} className="fw-bold">📧 support@influexkonnect.com</p>
                <p style={smallStyle}>
                  Please include your order details, the nature of your concern, and any supporting evidence (e.g., screenshots, descriptions).
                </p>
              </div>

              <div className="mb-1">
                <h2 style={h2Style}>7. Disclaimer</h2>
                <p style={smallStyle}>
                  This policy is provided at the sole discretion of InfluexKonnect. The company reserves the right to update or modify this
                  policy at any time without prior notice. Customers are encouraged to review this page periodically for any changes.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CancellationRefundPolicy;
