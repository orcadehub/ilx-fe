import React, { useState } from 'react';
import { FaGift, FaRegCopy } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Row, Col, ProgressBar, Badge, OverlayTrigger, Tooltip, Toast, ToastContainer } from 'react-bootstrap';

const OffersPage = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  const lavishCardStyle = "rounded-4 shadow-lg border-0 bg-white p-4";
  const lavishSectionStyle = "bg-light bg-opacity-75 p-3 rounded-4 mb-3 border border-1";

  const renderCurrentOffer = () => (
    <Card className={`mt-4 ${lavishCardStyle}`}>
      <h4 className="mb-3 text-gradient">🌞 Summer Campaign 2025</h4>
      <p>Promote our new summer collection with exclusive discounts for your followers.</p>
      <Row className="mt-4">
        <Col md={6}>
          <div className="position-relative rounded overflow-hidden">
            <img
              src="/path/to/your/image.png"
              alt="Campaign"
              className="img-fluid rounded-4 border"
            />
          </div>

          <div className={`${lavishSectionStyle}`}>
            <h6 className="fw-bold">Suggested Caption:</h6>
            <p>
              Summer is here! Check out the new collection from @influenceconnect with 20% off
              using code SUMMER25 #ad
            </p>
            <Button variant="outline-primary" size="sm" onClick={() => copyToClipboard('Summer is here! Check out the new collection from @influenceconnect with 20% off using code SUMMER25 #ad')}>📋 Copy Caption</Button>
          </div>
        </Col>

        <Col md={6}>
          <div className={`${lavishSectionStyle}`}>
            <h6 className="text-primary fw-bold">Promotion Details</h6>
            <p><strong>Campaign Period:</strong> 7 days</p>
            <p><strong>Required Time Live:</strong> 24 hours</p>
            <p><strong>Your Reward:</strong> 1 month Free Subscription</p>
          </div>

          <div className={`${lavishSectionStyle}`}>
            <h6 className="text-primary fw-bold">Platform Instructions</h6>
            <ul className="mb-2">
              <li>📸 Post as regular post or story with caption</li>
              <li>🔗 Share as post with caption and tagged page</li>
              <li>📹 Include link in video description</li>
            </ul>
            <Button variant="primary" className="rounded-pill">✨ Generate Unique URL</Button>
          </div>
        </Col>
      </Row>
    </Card>
  );

  const renderMyPromotions = () => (
    <div className="mt-4">
      {[{
        platform: "Instagram",
        status: "Live",
        color: "success",
        url: "https://inf.co/promo/u123/summer25",
        time: "18h remaining"
      }, {
        platform: "Facebook",
        status: "Expired",
        color: "secondary",
        url: "https://inf.co/promo/u123/spring25",
        time: null
      }].map((promo, index) => (
        <Card key={index} className={`${lavishCardStyle} mb-4`}>
          <Row>
            <Col md={8}>
              <div className="d-flex align-items-center mb-2">
                <img src={`https://cdn-icons-png.flaticon.com/512/${promo.platform === 'Instagram' ? '1384/1384063' : '733/733547'}.png`} alt={promo.platform} width={24} className="me-2" />
                <strong>{promo.platform}</strong>
                <Badge bg={promo.color} className="ms-2">{promo.status}</Badge>
              </div>
              <p className="mb-1 text-muted">Generated URL:</p>
              <div className="d-flex align-items-center mb-2">
                <input type="text" readOnly className="form-control me-2 rounded-pill" value={promo.url} />
                <OverlayTrigger overlay={<Tooltip>Copy</Tooltip>}>
                  <Button variant="outline-secondary" size="sm" onClick={() => copyToClipboard(promo.url)}><FaRegCopy /></Button>
                </OverlayTrigger>
                 <div className="ms-1 mb-2 text-success">Reward: <strong>1 month Free Subscription</strong></div>
              </div>
              {promo.time && <><ProgressBar now={25} className="mb-1" style={{ height: '5px' }} /><small className="text-muted">Time remaining until reward eligibility</small></>}
            </Col>
            <Col md={4} className="text-md-end">
              {promo.time && <p className="mb-2 text-warning"><small>⏳ {promo.time}</small></p>}
              <Badge bg="success" className="mt-1">Given</Badge>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );

  const renderHowItWorks = () => (
    <Card className={`${lavishCardStyle} mt-4`}>
      <h4 className="mb-3">How to Earn Rewards with Promotions</h4>
      <p>Follow these simple steps to promote our campaigns and earn rewards</p>

      <Row className="text-center mb-4">
        {["Generate a Unique URL", "Post on Social Media", "Keep Live for 24 Hours"].map((title, i) => (
          <Col md={4} key={i}>
            <div className="bg-light rounded-4 p-4 shadow-sm border border-1">
              <div className="badge bg-primary rounded-circle mb-3" style={{ width: '36px', height: '36px', lineHeight: '36px' }}>{i + 1}</div>
              <h6>{title}</h6>
              <p className="small">{i === 0 ? "Click the 'Generate Unique URL' button on the current promotion to create your personal tracking link." : i === 1 ? "Share the promotion on Instagram, Facebook, or YouTube using the provided content and your unique URL." : "Maintain your post for at least 24 hours to qualify for your reward."}</p>
            </div>
          </Col>
        ))}
      </Row>

      <Card className="bg-warning bg-opacity-10 p-3 mb-3 rounded-4">
        <h6 className="mb-2">🎁 Your Reward</h6>
        <p className="mb-0">After successfully keeping your promotion live for 24 hours, you'll automatically receive:<br /><strong>✓ 1 month Free Subscription to our Premium Business Plan</strong></p>
      </Card>

      <Card className="bg-light p-3 mb-4 rounded-4">
        <h6 className="mb-2">📋 Rules & Requirements</h6>
        <ul className="mb-0">
          <li>Posts must include the provided caption and your unique URL.</li>
          <li>Content must remain live and unchanged for at least 24 hours.</li>
          <li>The post must be public and viewable by our tracking system.</li>
        </ul>
      </Card>

      <div className="text-end">
        <Button variant="success" className="rounded-pill" onClick={() => setActiveTab('promotions')}>🎯 View My Current Promotion</Button>
      </div>
    </Card>
  );

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4">
        <FaGift size={30} className="me-2 text-primary" />
        <h3 className="m-0">Promotional Offers</h3>
      </div>

      <div className="mb-3 d-flex gap-2">
        <Button variant={activeTab === 'current' ? 'primary' : 'outline-primary'} className="rounded-pill px-4" onClick={() => setActiveTab('current')}>Current Offer</Button>
        <Button variant={activeTab === 'promotions' ? 'primary' : 'outline-primary'} className="rounded-pill px-4" onClick={() => setActiveTab('promotions')}>My Promotions</Button>
        <Button variant={activeTab === 'how' ? 'primary' : 'outline-primary'} className="rounded-pill px-4" onClick={() => setActiveTab('how')}>How it Works</Button>
      </div>

      {activeTab === 'current' && renderCurrentOffer()}
      {activeTab === 'promotions' && renderMyPromotions()}
      {activeTab === 'how' && renderHowItWorks()}

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide bg="success">
          <Toast.Body className="text-white">Copied to clipboard!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default OffersPage;