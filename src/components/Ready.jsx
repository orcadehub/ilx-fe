import React from "react";
import { useNavigate } from "react-router-dom";

function Ready({ theme = "blue" }) {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2
            className="mb-3"
            style={{
              fontWeight: "700",
              fontSize: "2.2rem",
              letterSpacing: "0.05em",
              textShadow: "1px 1px 4px rgba(255,255,255,0.6)",
            }}
          >
            Ready to Transform Your Influencer Marketing?
          </h2>
          <p
            className="mb-4"
            style={{
              fontSize: "1.15rem",
              maxWidth: "600px",
              color:"#707276ff",
              margin: "0 auto",
              lineHeight: "1.6",
              textShadow: "0 0 3px rgba(255, 255, 255, 0.7)",
            }}
          >
            Join thousands of brands using InfluencerConnect to run successful
            campaigns and measure real ROI.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn"
              style={{
                backgroundColor: "transparent",
                color: "#0A1A4C",
                fontWeight: "600",
                padding: "12px 36px",
                borderRadius: "30px",
                boxShadow: `0 6px 15px rgba(0,0,0,0.1)`,
                border: "1.5px solid #0A1A4C",
                transition: "all 0.3s ease",
              }}
             
              onClick={() => navigate("/signup")}
            >
              Start your free Trial
            </button>
            <button
              className="btn"
              style={{
                backgroundColor: "#0A1A4C",
                color: "#fff",
                fontWeight: "600",
                padding: "12px 36px",
                borderRadius: "30px",
                border: "none",
                boxShadow: "0 6px 15px rgba(10,26,76,0.6)",
                transition: "all 0.3s ease",
              }}
             
              onClick={() => navigate("/login")}
            >
              View pricing plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ready;
