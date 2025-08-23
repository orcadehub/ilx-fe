import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav } from 'react-bootstrap';
import { PersonFill, ShieldLockFill, BellFill, ShareFill, BoxArrowRight } from 'react-bootstrap-icons';

import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import NotificationsTab from './NotificationsTab';
import SocialTab from './SocialTab';

const tabColors = {
  profile: { base: '#4a6bff', hover: '#6a8cff', active: '#2a4bdf' },
  security: { base: '#ff6b6b', hover: '#ff8b8b', active: '#df4b4b' },
  notifications: { base: '#6bceff', hover: '#8befff', active: '#4baedf' },
  social: { base: '#a162e8', hover: '#c182ff', active: '#8142c8' }
};

// Helper to convert hex color to rgb string
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [hoveredTab, setHoveredTab] = useState(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'social':
        return <SocialTab />;
      default:
        return <ProfileTab />;
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const tabs = [
    { key: 'profile', label: 'Profile', icon: <PersonFill /> },
    { key: 'security', label: 'Security', icon: <ShieldLockFill /> },
    { key: 'notifications', label: 'Notifications', icon: <BellFill /> },
    { key: 'social', label: 'Social', icon: <ShareFill /> },
  ];

  return (
    <div className="min-vh-100" style={{ background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Sticky Header */}
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h4 className="fw-bold mb-0 d-flex align-items-center gap-2 text-dark">
          <i className="bi bi-gear-fill text-primary"></i> Account Settings
        </h4>
        <Button
          variant="outline-danger"
          className="fw-semibold"
          style={{ borderRadius: 8 }}
          onClick={handleLogout}
        >
          <BoxArrowRight className="me-2" /> Sign Out
        </Button>
      </div>

      {/* Main Container */}
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={9} md={12}>
            <Card className="shadow-sm rounded-4 bg-white overflow-hidden">
              {/* Tabs Nav */}
              <Nav
                variant="tabs"
                activeKey={activeTab}
                onSelect={(selected) => setActiveTab(selected)}
                className="border-0 px-4 pt-3"
              >
                {tabs.map(({ key, label, icon }) => {
                  const color = tabColors[key];
                  const isActive = activeTab === key;
                  const isHovered = hoveredTab === key;
                  return (
                    <Nav.Item key={key}>
                      <Nav.Link
                        eventKey={key}
                        onMouseEnter={() => setHoveredTab(key)}
                        onMouseLeave={() => setHoveredTab(null)}
                        style={{
                          color: isActive ? color.active : isHovered ? color.hover : '#6c757d',
                          background: isActive ? `rgba(${hexToRgb(color.base)}, 0.1)` : 'transparent',
                          borderBottom: isActive ? `3px solid ${color.active}` : 'none',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          borderRadius: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: '1rem',
                          padding: '0.5rem 1.25rem',
                          cursor: 'pointer',
                        }}
                      >
                        {icon}
                        {label}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>

              {/* Scrollable Tab Content */}
              <div
                className="p-4"
                style={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' }}
              >
                {renderTabContent()}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Settings;
