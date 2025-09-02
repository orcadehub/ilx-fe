import React from "react";
import { Row, Col } from "react-bootstrap";

const roles = [
  {
    type: "business",
    label: "Business User",
    desc: "Find influencers and manage campaigns",
    icon: "bi bi-buildings", // or bi-briefcase
  },
  {
    type: "influencer",
    label: "Influencer",
    desc: "Connect with brands and get paid for promotions",
    icon: "bi bi-person",
  },
];

export default function RoleSelect({ onSelect }) {
  const cardBase = {
    width: "100%",
    borderRadius: 16,
    background: "#ffffff",
    padding: "18px 20px",
    border: "1.5px solid #E6E9F4",
    boxShadow: "0 8px 24px rgba(17,24,39,.06)",
    display: "flex",
    alignItems: "center",
    gap: 16,
    cursor: "pointer",
    transition: "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
  };

  const iconWrap = {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#ECEAFD",
    color: "#6F6AE6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    boxShadow: "0 2px 8px rgba(138,122,255,.08)",
    flex: "0 0 56px",
  };

  const title = {
    fontSize: "1.05rem",
    fontWeight: 800,
    color: "#0b1220",
    marginBottom: 6,
  };

  const desc = {
    margin: 0,
    color: "#6B7280",
    fontSize: ".98rem",
    lineHeight: 1.45,
  };

  return (
    <div>
      {/* Header like screenshot */}
      <div className="text-center mb-3">
        <h2 style={{ fontWeight: 800, color: "#0b1220", marginBottom: 6, fontSize: "2rem" }}>
          Join InfluenceConnect
        </h2>
        <p style={{ color: "#6B7280", margin: 0, fontSize: "1.03rem" }}>
          Select how you&apos;d like to use our platform
        </p>
      </div>

      <Row className="g-3 mt-2">
        {roles.map(({ type, label, desc: sub, icon }) => (
          <Col xs={12} key={type}>
            <div
              onClick={() => onSelect(type)}
              style={cardBase}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 36px rgba(17,24,39,.10)";
                e.currentTarget.style.borderColor = "#C7CBFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(17,24,39,.06)";
                e.currentTarget.style.borderColor = "#E6E9F4";
              }}
            >
              <div style={iconWrap}>
                <i className={icon} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={title}>{label}</div>
                <p style={desc}>{sub}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4" style={{ color: "#6B7280" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#5357EB", fontWeight: 700, textDecoration: "none" }}>
          Sign in
        </a>
      </div>
    </div>
  );
}
