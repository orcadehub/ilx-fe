import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Ready({ theme = "blue" }) {
  // Background and color themes
  const navigate = useNavigate();
  const themes = {
    blue: {
      bg: "#E8F0FE",
      headingColor: "#1B263B",
      textColor: "#415A77",
      buttonBg: "#1B263B",
      buttonHoverBg: "#415A77",
    },
    beige: {
      bg: "#FFF7ED",
      headingColor: "#4B3F2F",
      textColor: "#5F4C3B",
      buttonBg: "#4B3F2F",
      buttonHoverBg: "#6B5C48",
    },
    mint: {
      bg: "#ECFDF5",
      headingColor: "#065F46",
      textColor: "#047857",
      buttonBg: "#065F46",
      buttonHoverBg: "#047857",
    },
  };

  const selectedTheme = themes[theme] || themes.blue;

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: selectedTheme.bg,
        color: selectedTheme.headingColor,
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2
            className="mb-3"
            style={{
              fontWeight: "700",
              fontSize: "2.75rem",
              letterSpacing: "0.05em",
              textShadow: "1px 1px 4px rgba(255,255,255,0.6)",
            }}
          >
            Ready to Transform Your Marketing?
          </h2>
          <p
            className="mb-4"
            style={{
              fontSize: "1.25rem",
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "'Open Sans', sans-serif",
              color: selectedTheme.textColor,
              lineHeight: "1.6",
              textShadow: "0 0 3px rgba(255,255,255,0.7)",
            }}
          >
            Join thousands of businesses who have already revolutionized their
            marketing with InfluexKonnect.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn"
              style={{
                backgroundColor: selectedTheme.buttonBg,
                color: "#F5F5F7",
                fontWeight: "600",
                padding: "12px 36px",
                borderRadius: "30px",
                boxShadow: `0 6px 15px rgba(0,0,0,0.2)`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  selectedTheme.buttonHoverBg;
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = selectedTheme.buttonBg;
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up Now
            </button>
            <button
              className="btn btn-outline-dark"
              style={{
                padding: "12px 36px",
                borderRadius: "30px",
                fontWeight: "600",
                borderWidth: "2px",
                transition: "all 0.3s ease",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                color: selectedTheme.headingColor,
                borderColor: selectedTheme.headingColor,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.07)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ready;
