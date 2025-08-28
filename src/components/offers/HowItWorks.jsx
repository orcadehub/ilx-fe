import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const lavishCardStyle =
  "rounded-3 shadow-sm border-0 bg-white p-4 position-relative overflow-hidden";

const HowItWorks = ({ onViewPromotions }) => {
  return (
    <Card className={`${lavishCardStyle} mt-4`}>
      <h4 className="mb-3 fw-semibold">How to Earn Rewards with Promotions</h4>
      <p>Follow these simple steps to promote our campaigns and earn rewards</p>

      <Row className="text-center mb-4">
        {[
          "Generate a Unique URL",
          "Post on Social Media",
          "Keep Live for 24 Hours",
        ].map((title, i) => (
          <Col md={4} key={i}>
            <div className="bg-light rounded-3 p-4 shadow-sm border border-1">
              <div
                className="badge bg-primary rounded-circle mb-3"
                style={{ width: 36, height: 36, lineHeight: "36px" }}
              >
                {i + 1}
              </div>
              <h6>{title}</h6>
              <p className="small text-muted">
                {i === 0
                  ? "Click the 'Generate Unique URL' button on the current promotion to create your personal tracking link."
                  : i === 1
                  ? "Share the promotion on Instagram, Facebook, or YouTube using the provided content and your unique URL."
                  : "Maintain your post for at least 24 hours to qualify for your reward."}
              </p>
            </div>
          </Col>
        ))}
      </Row>

      <Card className="bg-warning bg-opacity-10 p-3 mb-3 rounded-3">
        <h6 className="mb-2">🎁 Your Reward</h6>
        <p className="mb-0">
          After successfully keeping your promotion live for 24 hours and
          reaching 10 unique clicks, you'll automatically be eligible to claim:
          <br />
          <strong>
            ✓ 1 month Free Subscription to our Premium Business Plan
          </strong>
        </p>
      </Card>

      <Card className="bg-light p-3 mb-4 rounded-3">
        <h6 className="mb-2">📋 Rules & Requirements</h6>
        <ul className="mb-0 ps-3 text-muted">
          <li>Posts must include the provided caption and your unique URL.</li>
          <li>Content must remain live and unchanged for at least 24 hours.</li>
          <li>The post must be public and viewable by our tracking system.</li>
          <li>You need at least 10 unique clicks to be eligible for reward.</li>
          <li>You can only have one active promotion per campaign.</li>
        </ul>
      </Card>

      <div className="text-end">
        <Button
          variant="dark"
          size="sm"
          className="text-capitalize"
          onClick={onViewPromotions}
        >
          🎯 View My Current Promotion
        </Button>
      </div>
    </Card>
  );
};

export default HowItWorks;