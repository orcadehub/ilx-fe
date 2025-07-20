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
  const services = [
    {
      icon: <FaBullseye size={22} className="text-danger" />,
      title: '🎯 PPC Campaigns',
      subtitle: 'Google Ads',
    },
    {
      icon: <FaSearch size={22} className="text-primary" />,
      title: '🔎 SEO Optimization',
      subtitle: '& Ranking',
    },
    {
      icon: <FaChartBar size={22} className="text-success" />,
      title: '📊 Google Analytics',
      subtitle: 'Setup',
    },
    {
      icon: <FaMapMarkerAlt size={22} style={{ color: '#d63384' }} />,
      title: '📍 Google Business',
      subtitle: 'Profile Setup',
    },
    {
      icon: <FaPalette size={22} className="text-warning" />,
      title: '🎨 Design Editors',
      subtitle: 'Ad Creatives & Visuals',
    },
    {
      icon: <FaBullhorn size={22} className="text-danger" />,
      title: '📣 Social Media Campaigns',
      subtitle:
        'Facebook, Instagram, YouTube, LinkedIn, Pinterest, Snapchat, Twitter',
    },
    {
      icon: <FaTv size={22} style={{ color: '#6a0dad' }} />,
      title: (
        <>
          📺 OTT Campaigns
        </>
      ),
      subtitle: 'Hotstar, Amazon Prime, Jio, Zee5',
    },
  ];

  return (
    <div className="py-5" style={{ backgroundColor: '#f8f9fc' }}>
      <Container>
        <Row className="align-items-center">
          {/* Left Section */}
          <Col lg={6} className="mb-4">
            <h2 className="fw-bold mb-3 display-6 text-dark">
              🚀 More Than Just Influencers —<br />
              Your Full Digital Marketing Partner
            </h2>
            <p className="text-secondary fs-5 mb-4">
              💡 While influencer marketing is our specialty, we also offer powerful digital
              marketing services to amplify your brand across platforms.
            </p>
            <Button className="px-4 py-2 fw-bold rounded-pill bg-primary border-0 shadow-sm">
              🔍 Explore Our Digital Marketing Services
            </Button>
          </Col>

          {/* Right Section - Service Cards */}
          <Col lg={6}>
            <Row xs={1} sm={2} className="g-4">
              {services.map((service, idx) => (
                <Col key={idx}>
                  <div className="d-flex align-items-start bg-white p-3 rounded-3 shadow-sm h-100 border">
                    <div className="me-3">{service.icon}</div>
                    <div>
                      <h6 className="mb-1 fw-semibold text-dark">{service.title}</h6>
                      <small className="text-muted">{service.subtitle}</small>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Explore;
