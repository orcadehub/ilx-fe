import React, { useState } from "react";
import { Card, Form, Button, Badge, Spinner, Overlay } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading screen
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from navigation state with proper fallback
  const order = location.state?.order || {
    id: "4292424244",
    scheduledDate: "15/4/2025",
    scheduledTime: "14:30:00",
    type: "Reel",
    product: "Instagram Promotion",
    businessStatus: "Verified",
    subtotal: 1000,
    total: 1000,
  };

  const handlePayment = async () => {
    setIsLoading(true); // Show loading screen
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${baseURL}/api/create-payment-order`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              amount: order.total * 100,
              currency: "INR",
              orderId: order.id,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create payment order");
          }

          const { razorpayOrderId, key } = await response.json();

          const options = {
            key,
            amount: order.total * 100,
            currency: "INR",
            name: "Your Company Name",
            description: `Payment for Order #${order.id}`,
            order_id: razorpayOrderId,
            handler: async function (response) {
              try {
                // Verify payment with backend
                const verifyResponse = await fetch(`${baseURL}/api/verify-payment`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: order.id,
                  }),
                });

                if (!verifyResponse.ok) {
                  throw new Error("Payment verification failed");
                }

                const verifyData = await verifyResponse.json();
                navigate("/dashboard/orders", {
                  state: {
                    order: verifyData.order,
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                    status: "success",
                  },
                });
              } catch (error) {
                console.error("Payment verification error:", error);
                navigate("/dashboard/orders", {
                  state: { order, error: "Payment verification failed", status: "failure" },
                });
              }
            },
            prefill: {
              name: order.username || "Unknown",
              email: localStorage.getItem("user")
                ? JSON.parse(localStorage.getItem("user")).email
                : "",
            },
            theme: {
              color: "#4f46e5",
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
          setIsLoading(false); // Hide loading screen when gateway opens

          razorpay.on("payment.failed", function (response) {
            console.error("Payment failed:", response.error);
            navigate("/dashboard/orders", {
              state: { order, error: response.error.description, status: "failure" },
            });
            setIsLoading(false); // Hide loading screen on failure
          });
        } catch (error) {
          console.error("Payment initiation error:", error);
          alert("Error initiating payment. Please try again.");
          setIsLoading(false); // Hide loading screen on error
        }
      };

      script.onerror = () => {
        console.error("Failed to load Razorpay SDK");
        alert("Failed to load payment gateway. Please try again.");
        setIsLoading(false); // Hide loading screen on SDK load failure
      };
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Error initiating payment. Please try again.");
      setIsLoading(false); // Hide loading screen on error
    }
  };

  // Style variables for consistency
  const styles = {
    primaryColor: "#4f46e5",
    secondaryColor: "#6b7280",
    lightBg: "#f9f8fc",
    borderColor: "#d1d5db",
    badgeStyle: {
      backgroundColor: "#10b981",
      fontSize: "0.85rem",
      letterSpacing: "0.5px",
    },
    buttonStyle: {
      backgroundColor: "#4f46e5",
      border: "none",
      boxShadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3)",
      transition: "all 0.3s ease",
      ":hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 6px 8px -1px rgba(79, 70, 229, 0.4)",
      },
    },
    loadingOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1500,
    },
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 checkout-bg">
      {/* Loading Overlay */}
      {isLoading && (
        <Overlay target={document.body} show={isLoading} placement="center">
          <div style={styles.loadingOverlay}>
            <Spinner animation="border" variant="light" />
            <span className="text-white ms-3">Processing Payment...</span>
          </div>
        </Overlay>
      )}
      <Card className="checkout-card p-4 shadow-lg rounded-4">
        <Card.Body>
          {/* Header Section */}
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-2" style={{ color: styles.primaryColor }}>
              Order Summary
            </h4>
            <div className="text-muted" style={{ letterSpacing: "0.5px" }}>
              Review your order details
            </div>
          </div>

          {/* Order Details Section */}
          <div className="mb-4 p-3 rounded-3 order-details-section">
            <div className="d-flex flex-column gap-2">
              <DetailRow label="Order ID" value={order.id} />
              <DetailRow label="Scheduled Date" value={order.scheduledDate} />
              <DetailRow label="Scheduled Time" value={order.scheduledTime} />
              <DetailRow label="Order Type" value={order.type} />
              <DetailRow label="Product/Service" value={order.product} />
              <div className="d-flex align-items-center">
                <span className="fw-medium me-2">Business Status:</span>
                <Badge pill style={styles.badgeStyle} className="px-3 py-1">
                  {order.businessStatus}
                </Badge>
              </div>
            </div>
          </div>

          <hr
            className="my-4"
            style={{ borderTop: `1px dashed ${styles.borderColor}` }}
          />

          {/* Coupon Section */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium">Coupon Code</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="py-2"
                style={{ borderColor: styles.borderColor }}
              />
              <Button
                className="ms-2 px-4 py-2"
                style={styles.buttonStyle}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                Apply
              </Button>
            </div>
          </Form.Group>

          <hr
            className="my-4"
            style={{ borderTop: `1px dashed ${styles.borderColor}` }}
          />

          {/* Pricing Section */}
          <div
            className="mb-4 p-3 rounded-3"
            style={{ backgroundColor: styles.lightBg }}
          >
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-medium">Subtotal:</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span style={{ color: styles.primaryColor }}>
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Button */}
          <div className="d-grid">
            <Button
              onClick={handlePayment}
              className="py-3 rounded-3 fw-bold payment-button"
              style={styles.buttonStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              disabled={isLoading} // Disable button while loading
            >
              Proceed to Payment
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* CSS in JS for better scoping */}
      <style jsx>{`
        .checkout-bg {
          min-height: 100vh;
          padding: 20px;
          background-image: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        }
        .checkout-card {
          width: 600px;
          border: none;
          background-color: white;
        }
        .order-details-section {
          background-color: ${styles.lightBg};
        }
        .payment-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px -1px rgba(79, 70, 229, 0.4);
        }
      `}</style>
    </div>
  );
};

// Reusable component for detail rows
const DetailRow = ({ label, value }) => (
  <div className="d-flex">
    <span className="fw-medium me-2">{label}:</span>
    <span style={{ color: "#6b7280" }}>{value}</span>
  </div>
);

export default Checkout;