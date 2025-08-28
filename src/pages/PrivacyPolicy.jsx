import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5" style={{ backgroundColor: 'var(--primary-color)' }}>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="rounded-3 shadow-sm border-0 p-4 mb-4">
            <h1 className="mb-3 fw-bold text-gradient text-center">Privacy Policy – InfluexKonnect</h1>
            <p className="text-center text-muted mb-4">
              Last Updated: August 28, 2025
            </p>
            <p className="lead mb-4">
              InfluexKonnect values your privacy. This Privacy Policy explains how we collect, use, and protect your data when using our platform.
            </p>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">1. Information We Collect</h2>
              <p><strong>Personal Data:</strong> Name, email, phone, payment details.</p>
              <p><strong>Social Media Data (with user consent):</strong></p>
              <ul>
                <li>Profile information (username, profile ID).</li>
                <li>Followers/subscribers count.</li>
                <li>Post data (likes, comments, shares, views, engagement rates).</li>
                <li>Post schedules and publishing history.</li>
              </ul>
              <p><strong>Technical Data:</strong> Device type, browser, IP address, usage logs.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">2. How We Use Collected Data</h2>
              <ul>
                <li>To display influencer profiles and audience reach.</li>
                <li>To provide analytics dashboards for influencers and brands.</li>
                <li>To connect influencers with brands based on performance metrics.</li>
                <li>To generate campaign reports and track effectiveness.</li>
                <li>To improve platform features and services.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">3. Data Sharing</h2>
              <p>We never sell personal or social media data to third parties.</p>
              <p>Data may be shared only with:</p>
              <ul>
                <li>Brands/Businesses for collaboration proposals.</li>
                <li>Trusted service providers (payment processors, analytics).</li>
              </ul>
              <p>Disclosures may be made if required by law.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">4. API Compliance</h2>
              <p>InfluexKonnect uses official APIs (Instagram Graph API, YouTube Data API, Facebook API, Twitter/X API) under their terms of use.</p>
              <p>We request read-only permissions for metrics, never posting or altering your accounts.</p>
              <p>You may revoke access anytime via the social platform’s settings.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">5. Data Security</h2>
              <p>We implement industry-standard safeguards including encryption, secure servers, and access controls.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">6. User Rights</h2>
              <ul>
                <li>Request a copy of stored data.</li>
                <li>Update or delete account information.</li>
                <li>Revoke social media access anytime.</li>
                <li>Opt-out of promotional emails.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">7. Children’s Privacy</h2>
              <p>Our services are not intended for individuals under 18 years old.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">8. Changes to Policy</h2>
              <p>We may update this Policy periodically, with notice provided for significant changes.</p>
            </div>

            <div className="mb-4">
              <h2 className="fw-semibold mb-3">9. Contact Us</h2>
              <p>For privacy or terms-related questions, contact:</p>
              <p className="fw-bold">InfluexKonnect Support</p>
              <p>📧 support@influexkonnect.com</p>
              <p>🌐 www.influexkonnect.com</p>
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

export default PrivacyPolicy;