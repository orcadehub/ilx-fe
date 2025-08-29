import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaBullseye,
  FaSearch,
  FaChartBar,
  FaMapMarkerAlt,
  FaPalette,
  FaBullhorn,
  FaTv,
} from "react-icons/fa";

function Explore() {
  const services = [
    {
      icon: <FaBullseye size={22} style={{ color: "#4a90e2" }} />,
      title: "PPC Campaigns",
      subtitle: "Google Ads",
    },
    {
      icon: <FaSearch size={22} style={{ color: "#4a90e2" }} />,
      title: "SEO Optimization",
      subtitle: "& Ranking",
    },
    {
      icon: <FaChartBar size={22} style={{ color: "#4a90e2" }} />,
      title: "Google Analytics",
      subtitle: "Setup",
    },
    {
      icon: <FaMapMarkerAlt size={22} style={{ color: "#4a90e2" }} />,
      title: "Google Business",
      subtitle: "Profile Setup",
    },
    {
      icon: <FaPalette size={22} style={{ color: "#4a90e2" }} />,
      title: "Design Editors",
      subtitle: "Ad Creatives & Visuals",
    },
    {
      icon: <FaBullhorn size={22} style={{ color: "#4a90e2" }} />,
      title: "Social Media Campaigns",
      subtitle:
        "Facebook, Instagram, YouTube, LinkedIn, Pinterest, Snapchat, Twitter",
    },
    {
      icon: <FaTv size={22} style={{ color: "#4a90e2" }} />,
      title: <>OTT Campaigns</>,
      subtitle: "Hotstar, Amazon Prime, Jio, Zee5",
    },
  ];

  return (
    <div className="py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Section */}
          <Col lg={6} className="mb-4">
            <h2
              className="fw-bold mb-3 display-6 fs-2"
              style={{ color: "#222" }}
            >
              More Than Just Influencers —<br />
              Your Full Digital Marketing Partner
            </h2>
            <p className="fs-6 mb-4" style={{ color: "#556080" }}>
              While influencer marketing is our specialty, we also offer
              powerful digital marketing services to amplify your brand across
              platforms.
            </p>
            <Button
              className="px-4 py-2 fw-semibold rounded-pill shadow-sm"
              style={{
                backgroundColor: "#5357eb",
                border: "none",
                color: "#fff",
                fontWeight: "300",
                boxShadow: "0 6px 15px rgba(83,87,235,0.4)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3a3ed4")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#5357eb")
              }
            >
              Explore Our Digital Marketing Services
            </Button>
          </Col>

          {/* Right Section - Service Cards */}
          <Col lg={6}>
            <Row xs={1} sm={2} className="g-4">
              {services.map((service, idx) => (
                <Col key={idx}>
                  <div
                    className="d-flex align-items-start p-3 rounded-4 shadow-sm h-100"
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #e4e8f1",
                      color: "#556080",
                      transition: "box-shadow 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(83,87,235,0.25)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "0 2px 10px 0 #eaeef7")
                    }
                  >
                    <div className="me-3">{service.icon}</div>
                    <div>
                      <p
                        className="mb-1 fw-semibold"
                        style={{
                          color: "#222",
                          fontSize: "0.85rem",
                          lineHeight: "1.1",
                        }}
                      >
                        {service.title}
                      </p>
                      <small style={{ fontSize: "0.75rem" }}>
                        {service.subtitle}
                      </small>
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
