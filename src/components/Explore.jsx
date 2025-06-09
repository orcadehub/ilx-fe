import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import {
  FaBullseye,
  FaSearch,
  FaChartBar,
  FaMapMarkerAlt,
  FaPalette,
  FaBullhorn,
  FaTv,
} from 'react-icons/fa';

function Explore() {
  return (
    <div className="bg-white py-5 px-3">
      <Container fluid>
        <Row className="align-items-center">
          {/* Left Section */}
          <Col lg={6} className="mb-4">
            <h2 className="fw-bold mb-3 display-6">
              🚀 More Than Just Influencers —
              <br />
              Your Full Digital Marketing Partner
            </h2>
            <p className="text-secondary mb-4 fs-5">
              💡 While influencer marketing is our specialty, we also offer powerful digital
              marketing services to amplify your brand across platforms.
            </p>
            <Button className="px-4 py-2 fw-bold rounded-pill bg-primary border-0">
              🔍 Explore Our Digital Marketing Services
            </Button>
          </Col>

          {/* Right Service Cards */}
          <Col lg={6}>
            <Row xs={1} md={2} className="g-3">
              <Col>
                <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm h-100">
                  <FaBullseye className="me-3 text-danger" size={24} />
                  <div>
                    <h6 className="mb-1">🎯 PPC Campaigns</h6>
                    <small className="text-muted">Google Ads</small>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm h-100">
                  <FaSearch className="me-3 text-primary" size={24} />
                  <div>
                    <h6 className="mb-1">🔎 SEO Optimization</h6>
                    <small className="text-muted"> & Ranking</small>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm h-100">
                  <FaChartBar className="me-3 text-success" size={24} />
                  <div>
                    <h6 className="mb-1">📊 Google Analytics</h6>
                    <small className="text-muted">Setup</small>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm h-100">
                  <FaMapMarkerAlt className="me-3 text-pink" size={24} />
                  <div>
                    <h6 className="mb-1">📍 Google Business</h6>
                    <small className="text-muted">Profile Setup</small>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm h-100">
                  <FaPalette className="me-3 text-warning" size={24} />
                  <div>
                    <h6 className="mb-1">🎨 Design Editors</h6>
                    <small className="text-muted">Ad Creatives & Visuals</small>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm h-100">
                  <FaBullhorn className="me-3 text-danger" size={24} />
                  <div>
                    <h6 className="mb-1">📣 Social Media Campaigns</h6>
                    <small className="text-muted">
                      Facebook, Instagram, YouTube, LinkedIn, Pinterest, Snapchat, Twitter
                    </small>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="d-flex align-items-start bg-light p-3 rounded shadow-sm h-100">
                  <FaTv className="me-3 text-purple" size={24} />
                  <div>
                    <h6 className="mb-1">
                      📺 OTT Campaigns
                      <Badge bg="warning" text="dark" className="ms-2">
                        Coming Soon
                      </Badge>
                    </h6>
                    <small className="text-muted">Hotstar, Amazon Prime, Jio, Zee5</small>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Explore;
