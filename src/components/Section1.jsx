import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { People, Clock, BarChart } from 'react-bootstrap-icons';

function Section1() {
  const cards = [
    {
      icon: <People size={28} />,
      title: 'Discover Influencers',
      text: 'Browse thousands of influencers across various niches, demographics, and platforms to find your perfect match.',
      bg: '#F0F4FF', // Light blue
    },
    {
      icon: <Clock size={28} />,
      title: 'Connect & Collaborate',
      text: 'Send requests directly to influencers, negotiate terms, and manage your campaigns all in one place.',
      bg: '#F9FAFB', // Light gray
    },
    {
      icon: <BarChart size={28} />,
      title: 'Track Results',
      text: 'Measure campaign performance with detailed analytics and reporting to optimize your influencer marketing ROI.',
      bg: '#FFF7ED', // Light warm beige
    },
  ];

  return (
    <div
      id="how-it-works"
      className="container py-5"
      style={{
        backgroundColor: '#ffffff',
        fontFamily: 'Alumni Sans SC, sans-serif',
      }}
    >
      <h2
        className="text-center mb-4"
        style={{
          fontWeight: '700',
          color: '#1F2937',
          fontSize: '3rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        How InfluexKonnect Works
      </h2>

      <p
        className="text-center mb-5 mx-auto"
        style={{
          maxWidth: '720px',
          color: '#4B5563',
          fontSize: '1.125rem',
          lineHeight: '1.6',
          fontWeight: '500',
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        Our platform makes it easy to discover, connect, and collaborate with influencers who align with your brand.
      </p>

      <Row xs={1} sm={2} md={3} className="g-4 justify-content-center">
        {cards.map(({ icon, title, text, bg }, idx) => (
          <Col key={idx} className="d-flex justify-content-center">
            <Card
              className="shadow-sm"
              style={{
                backgroundColor: bg,
                maxWidth: '320px',
                minHeight: '300px',
                borderRadius: '20px',
                border: 'none',
                padding: '25px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div
                style={{
                  color: '#3B82F6',
                  marginBottom: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#DBEAFE',
                  boxShadow: '0 4px 10px rgba(59, 130, 246, 0.2)',
                }}
              >
                {icon}
              </div>

              <h5
                style={{
                  fontWeight: '700',
                  fontSize: '1.35rem',
                  marginBottom: '12px',
                  color: '#111827',
                }}
              >
                {title}
              </h5>

              <p
                style={{
                  fontSize: '1rem',
                  color: '#6B7280',
                  lineHeight: '1.5',
                  fontWeight: '500',
                  fontFamily: "'Open Sans', sans-serif",
                  flexGrow: 1,
                }}
              >
                {text}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Section1;
