import React from "react";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const DashboardHeader = ({ role }) => {
  const navigate = useNavigate();

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      <div
        className="d-flex justify-content-between align-items-center mb-5 px-4 py-3 rounded shadow-sm"
        style={{
          backgroundColor: "#fff",
          borderLeft: "5px solid #1e3a8a",
        }}
      >
        <div>
          <h4
            className="fw-semibold mb-2"
            style={{ color: "#1e3a8a", fontSize: "1.75rem" }}
          >
            {role === "admin"
              ? "Admin Dashboard"
              : role === "influencer"
              ? "Influencer Dashboard"
              : "Business Dashboard"}
          </h4>
          <p
            className="text-muted"
            style={{
              fontSize: "0.95rem",
              marginBottom: 0,
              color: "#475569",
            }}
          >
            Monitor performance, orders, influencers, and more.
          </p>
        </div>
        <div>
          <Button
            variant="outline-primary"
            className="rounded-pill px-4 py-2"
            onClick={() => navigate("/dashboard/influencers")}
          >
            Find Influencers
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;