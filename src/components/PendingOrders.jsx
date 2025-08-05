import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaArrowRight,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Dash.css";

const PendingOrders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      name: "Influencer Campaign - Summer",
      influencer: "Priya Sharma",
      platforms: [
        <FaInstagram className="text-danger me-1" />,
        <FaYoutube className="text-danger" />,
      ],
      types: ["reel", "video"],
      status: "pending",
      path: "summer-campaign",
    },
    {
      name: "Product Launch - Spring",
      influencer: "Raj Malhotra",
      platforms: [<FaFacebook className="text-primary" />],
      types: ["post"],
      status: "pending",
      path: "product-launch",
    },
    {
      name: "Brand Awareness - Winter",
      influencer: "Aisha Khan",
      platforms: [
        <FaTwitter className="text-info me-1" />,
        <FaInstagram className="text-danger" />,
      ],
      types: ["story", "post"],
      status: "pending",
      path: "brand-awareness",
    },
    {
      name: "Engagement Boost - Autumn",
      influencer: "Vikram Patel",
      platforms: [<FaYoutube className="text-danger" />],
      types: ["short"],
      status: "awaiting",
      path: "engagement-boost",
    },
    {
      name: "Influencer Campaign - Summer",
      influencer: "Priya Sharma",
      platforms: [
        <FaInstagram className="text-danger me-1" />,
        <FaYoutube className="text-danger" />,
      ],
      types: ["reel", "video"],
      status: "pending",
      path: "summer-campaign-2",
    },
    {
      name: "Holiday Promo - December",
      influencer: "Neha Gupta",
      platforms: [
        <FaInstagram className="text-danger me-1" />,
        <FaFacebook className="text-primary" />,
      ],
      types: ["story", "reel"],
      status: "pending",
      path: "holiday-promo",
    },
    {
      name: "Tech Gadget Review",
      influencer: "Arjun Singh",
      platforms: [<FaYoutube className="text-danger" />],
      types: ["video"],
      status: "pending",
      path: "tech-gadget-review",
    },
    {
      name: "Fitness Challenge - January",
      influencer: "Sanya Verma",
      platforms: [
        <FaInstagram className="text-danger me-1" />,
        <FaTwitter className="text-info" />,
      ],
      types: ["post", "story"],
      status: "pending",
      path: "fitness-challenge",
    },
    {
      name: "Eco-Friendly Campaign",
      influencer: "Karan Desai",
      platforms: [<FaFacebook className="text-primary" />],
      types: ["post"],
      status: "pending",
      path: "eco-friendly-campaign",
    },
    {
      name: "Travel Vlog - Summer",
      influencer: "Meera Joshi",
      platforms: [<FaYoutube className="text-danger" />],
      types: ["video"],
      status: "pending",
      path: "travel-vlog",
    },
  ];

  const statusVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "awaiting":
        return "info";
      default:
        return "secondary";
    }
  };

  const typeVariant = (type) => {
    switch (type) {
      case "reel":
        return "info";
      case "video":
        return "primary";
      case "post":
        return "secondary";
      case "story":
        return "warning";
      case "short":
        return "info";
      default:
        return "dark";
    }
  };

  const typeVariantColor = (type) => {
    const variants = {
      reel: "#06b6d4", // Cyan
      story: "#1e40af", // Blue
      video: "#d97706", // Amber
      post: "#059669", // Green
      short: "#06b6d4", // Cyan
    };
    return variants[type.toLowerCase()] || "#475569"; // Default to Slate
  };

  const statusVariantColor = (status) => {
    const variants = {
      pending: "#d97706", // Amber
      approved: "#059669", // Green
      rejected: "#dc2626", // Red
      completed: "#1e40af", // Blue
    };
    return variants[status.toLowerCase()] || "#475569"; // Default to Slate
  };

  return (
    <Card
      className="shadow-sm border-0"
      style={{
        backgroundColor: "#fff",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flex: "1 1 auto",
      }}
    >
      <Card.Body
        style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold" style={{ color: "#1e293b" }}>
            🕒 Pending Orders
          </h5>
          <Badge
            bg="light"
            text="dark"
            className="rounded-pill px-3 py-2 shadow-sm"
            style={{
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#1e293b",
            }}
            onClick={() => navigate("/dashboard/orders")}
          >
            View All <FaArrowRight className="ms-2" size={12} />
          </Badge>
        </div>
        <div
          style={{
            flex: "1 1 auto",
            backgroundColor: "#fff",
            borderRadius: "0.5rem",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <div className="d-flex flex-column">
            {/* Header Row */}
            <div
              className="d-flex text-muted py-2 px-3"
              style={{
                backgroundColor: "var(--primary-color)",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "500",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <div style={{ flex: "2", padding: "8px" }}>Order</div>
              <div style={{ flex: "1.5", padding: "8px" }}>Influencer</div>
              <div style={{ flex: "1", padding: "8px" }}>Platform</div>
              <div style={{ flex: "1.5", padding: "8px" }}>Type</div>
              <div style={{ flex: "1", padding: "8px" }}>Status</div>
              <div style={{ flex: "0.5", padding: "8px", textAlign: "end" }}>
                Action
              </div>
            </div>
            {/* Order Rows */}
            {orders.map((order, index) => (
              <div
                key={index}
                className="d-flex cursor-pointer"
                onClick={() => navigate(`/orders/${order.path}`)}
                style={{
                  backgroundColor: "#fff",
                  padding: "8px",
                  borderBottom: "1px solid #e5e7eb",
                  transition: "background-color 0.3s ease",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e2e8f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <div
                  className="fw-medium"
                  style={{ flex: "2", padding: "8px" }}
                >
                  {order.name}
                </div>
                <div style={{ flex: "1.5", padding: "8px" }}>
                  {order.influencer}
                </div>
                <div style={{ flex: "1", padding: "8px" }}>
                  {order.platforms}
                </div>
                <div style={{ flex: "1.5", padding: "8px" }}>
                  {order.types.map((type, i) => (
                    <Badge
                      key={i}
                      bg={typeVariant(type)}
                      className="me-1 text-capitalize"
                      style={{ backgroundColor: typeVariantColor(type) }}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
                <div style={{ flex: "1", padding: "8px" }}>
                  <Badge
                    bg={statusVariant(order.status)}
                    className="text-capitalize"
                    style={{
                      backgroundColor: statusVariantColor(order.status),
                    }}
                  >
                    {order.status}
                  </Badge>
                </div>
                <div
                  style={{ flex: "0.5", padding: "8px", textAlign: "end" }}
                >
                  <FaEye
                    className="text-dark cursor-pointer"
                    style={{ color: "#1e293b" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/orders/${order.path}`);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PendingOrders;