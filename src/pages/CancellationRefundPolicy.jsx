import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const CancellationRefundPolicy = () => {
  return (
    <div className="container mt-5" style={{ backgroundColor: 'var(--primary-color)' }}>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="rounded-3 shadow-sm border-0 p-4 mb-4">
            <h1 className="mb-3 fw-bold text-gradient text-center">Cancellation & Refund Policy</h1>
            <p className="text-center text-muted mb-4">
              Last updated: August 28, 2025
            </p>
            <p className="lead mb-4">
              InfluexKonnect values transparency and fairness. This policy outlines the terms around cancellations and refunds for services and campaigns facilitated via the platform.
            </p>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">1. Cancellation/Refund Request Window</h2>
              <p>Requests must be submitted within 3–5 days of placing the order/booking.</p>
              <p>Requests submitted after this window generally cannot be accepted—especially if influencer engagement, content creation, or service delivery has started.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">2. Refund Eligibility</h2>
              <p>Refunds may be considered under these circumstances:</p>
              <ul>
                <li>If the delivered content or service materially differs from what was represented on the platform.</li>
                <li>If the campaign could not be initiated due to InfluexKonnect’s operational or technical error.</li>
                <li>If the content delivered is defective, compromised, or not as described.</li>
              </ul>
              <p>All claims of quality issues must be filed within 3–5 days of receiving the deliverable.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">3. Non-Refundable or Excluded Cases</h2>
              <p>Cancellations are not allowed if services/campaigns have already commenced or been delivered.</p>
              <p>Custom or one-off influencer packages and perishable or time-sensitive services are non-refundable except in cases of quality failure.</p>
              <p>Subjective dissatisfaction (e.g., creative style) is not eligible for a refund.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">4. Refund Processing Time</h2>
              <p>Approved refunds are processed within 6–8 business days back to the original payment method.</p>
              <p>Please note: additional delays may occur depending on your bank or payment provider.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">5. Warranty or Third-Party Coverage</h2>
              <p>If the service/product includes a manufacturer or influencer warranty, customers are advised to contact the third-party provider directly.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">6. Contact & Submission Instructions</h2>
              <p>To initiate a cancellation or refund request:</p>
              <p className="fw-bold">📧 support@influexkonnect.com</p>
              <p>Please include your order details, the nature of your concern, and any supporting evidence (e.g., screenshots, descriptions).</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">7. Disclaimer</h2>
              <p>This policy is provided at the sole discretion of InfluexKonnect. The company reserves the right to update or modify this policy at any time without prior notice. Customers are encouraged to review this page periodically for any changes.</p>
            </div>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        :root {
          --primary-color: #f8fafc;
        }
        .text-gradient {
          background: linear-gradient(to right, #605cff, #4a00e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default CancellationRefundPolicy;