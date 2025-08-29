import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { People, Check2Circle, BarChart } from 'react-bootstrap-icons';

function Section1() {
  const cards = [
    {
      icon: <People size={32} />,
      title: 'Discover Influencers',
      text: 'Browse thousands of influencers across various niches, demographics, and platforms to find your perfect match.',
    },
    {
      icon: <Check2Circle size={32} />,
      title: 'Connect & Collaborate',
      text: 'Send requests directly to influencers, negotiate terms, and manage your campaigns all in one place.',
    },
    {
      icon: <BarChart size={32} />,
      title: 'Track Results',
      text: 'Measure campaign performance with detailed analytics and reporting to optimize your influencer marketing ROI.',
    },
  ];

  return (
    <div
      id="how-it-works"
      className="p-5"
      style={{
        background: "#f7f9fb",
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      <div className="container">
        <h2
          className="text-center fw-bold mb-5"
          style={{
            color: '#181A20',
          fontSize: "2.25rem"
          }}
        >
          How InfluexKonnect Works
        </h2>
        <div
          className="text-center mb-5"
          style={{
            color: "#5c6071",
            fontSize: "1.14rem",
            maxWidth: "660px",
            margin: "16px auto 0 auto",
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          Our platform makes it easy to discover, connect, and collaborate with influencers who align with your brand.
        </div>

        <Row xs={1} md={3} className="g-4">
          {cards.map(({ icon, title, text }, idx) => (
            <Col key={idx} className="d-flex justify-content-center">
              <Card
                style={{
                  border: "1.5px solid #edeff7",
                  borderRadius: "18px",
                  background: "#fff",
                  minHeight: "220px",
                  maxWidth: "360px",
                  boxShadow: "0 4px 24px 0 rgba(38,50,56,.04)",
                  padding: "0",
                  transition: "transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(38,50,56,.09)";
                  e.currentTarget.style.borderColor = "#dde0fa";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(38,50,56,.04)";
                  e.currentTarget.style.borderColor = "#edeff7";
                }}
              >
                <div
                  style={{
                    margin: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background: "#eceafd",
                    boxShadow: "0 2px 8px rgba(138,122,255,.07)",
                  }}
                >
                  <span style={{
                    color: "#776be7",
                  }}>
                    {icon}
                  </span>
                </div>
                <Card.Body className="px-4 py-0">
                  <h5
                    className="fw-bold mb-2"
                    style={{
                      fontWeight: 700,
                      fontSize: "1.23rem",
                      color: "#181A20",
                      marginBottom: "10px",
                    }}
                  >
                    {title}
                  </h5>
                  <p
                    style={{
                      fontSize: "1.02rem",
                      color: "#65676c",
                      marginBottom: 0,
                      fontWeight: 500,
                      lineHeight: "1.58",
                    }}
                  >
                    {text}
                  </p>
                </Card.Body>
                <div style={{ marginBottom: "22px" }}>&nbsp;</div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Section1;
