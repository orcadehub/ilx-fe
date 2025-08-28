import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const TermsAndConditions = () => {
  return (
    <div className="container mt-5" style={{ backgroundColor: 'var(--primary-color)' }}>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="rounded-3 shadow-sm border-0 p-4 mb-4">
            <h1 className="mb-3 fw-bold text-gradient text-center">Terms & Conditions – InfluexKonnect</h1>
            <p className="text-center text-muted mb-4">
              Last Updated: August 28, 2025
            </p>
            <p className="lead mb-4">
              Welcome to InfluexKonnect (“Company”, “we”, “our”, “us”). By accessing or using our platform, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately.
            </p>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">1. Definitions</h2>
              <p><strong>“Platform”</strong> refers to the InfluexKonnect website, application, and services.</p>
              <p><strong>“Influencer”</strong> means users who connect social media accounts to showcase and promote products/services.</p>
              <p><strong>“Brand/Business”</strong> means companies that collaborate with influencers for campaigns.</p>
              <p><strong>“User”</strong> means any person accessing or using the Platform.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">2. Eligibility</h2>
              <p>You must be at least 18 years old and legally capable of entering into binding agreements to use the Platform.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">3. Services</h2>
              <p>InfluexKonnect enables influencers and brands to:</p>
              <ul>
                <li>Connect and manage collaborations.</li>
                <li>Link social media accounts (Instagram, Facebook, YouTube, Twitter/X).</li>
                <li>Collect and analyze performance data such as followers, subscribers, post reach, likes, comments, shares, and views.</li>
                <li>Use analytics for campaign planning, performance tracking, and marketplace visibility.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">4. Account Registration</h2>
              <p>Users must provide accurate information and keep login credentials secure.</p>
              <p>You authorize InfluexKonnect to access connected social media accounts only to retrieve analytics data as permitted by the respective platforms’ APIs.</p>
              <p>We will never post, comment, or act on your behalf without explicit consent.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">5. Payments & Commissions</h2>
              <p>Influencer earnings, commissions, and payments are processed as per the campaign agreements between influencers and brands.</p>
              <p>InfluexKonnect may charge platform service fees.</p>
              <p>Users are responsible for applicable taxes and compliance.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">6. User Responsibilities</h2>
              <ul>
                <li>Do not share unlawful, harmful, or misleading content.</li>
                <li>Do not misuse connected social accounts or provide false metrics.</li>
                <li>Respect third-party platform rules (Instagram, Facebook, YouTube, Twitter/X).</li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">7. Data Access & Ownership</h2>
              <p>Influencers retain full ownership of their social media content.</p>
              <p>InfluexKonnect only accesses public metrics and account analytics for providing insights, not private messages or personal content.</p>
              <p>Users grant InfluexKonnect a limited license to use extracted metrics for analytics, campaign reporting, and marketplace display.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">8. Limitation of Liability</h2>
              <p>InfluexKonnect is not liable for:</p>
              <ul>
                <li>Accuracy of third-party social media data.</li>
                <li>Direct/indirect losses from campaigns or collaborations.</li>
                <li>Service interruptions caused by external APIs.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">9. Termination</h2>
              <p>We may suspend or terminate accounts that violate these Terms or misuse social account integrations.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">10. Governing Law</h2>
              <p>These Terms shall be governed by Indian law, with courts in Tirupati, Andhra Pradesh having exclusive jurisdiction.</p>
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

export default TermsAndConditions;