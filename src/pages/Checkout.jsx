/Checkout.jsx/
import React, { useState } from 'react';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get order data from navigation state with proper fallback
  const order = location.state?.order || {
    orderId: '4292424244',
    scheduledDate: '15/4/2025',
    scheduledTime: '14:30:00',
    type: 'Reel', // Changed from category to type
    product: 'Instagram Promotion',
    businessStatus: 'Verified',
    subtotal: 1000,
    total: 1000
  };

  const handlePayment = () => {
    navigate('/payment', { state: { order } });
  };

  // Style variables for consistency
  const styles = {
    primaryColor: '#4f46e5',
    secondaryColor: '#6b7280',
    lightBg: '#f9f8fc',
    borderColor: '#d1d5db',
    badgeStyle: { 
      backgroundColor: '#10b981',
      fontSize: '0.85rem',
      letterSpacing: '0.5px'
    },
    buttonStyle: {
      backgroundColor: '#4f46e5',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.3)',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 8px -1px rgba(79, 70, 229, 0.4)'
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 checkout-bg">
      <Card className="checkout-card p-4 shadow-lg rounded-4">
        <Card.Body>
          {/* Header Section */}
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-2" style={{ color: styles.primaryColor }}>
              Order Summary
            </h4>
            <div className="text-muted" style={{ letterSpacing: '0.5px' }}>
              Review your order details
            </div>
          </div>

          {/* Order Details Section */}
          <div className="mb-4 p-3 rounded-3 order-details-section">
            <div className="d-flex flex-column gap-2">
              <DetailRow label="Order ID" value={order.orderId} />
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

          <hr className="my-4" style={{ borderTop: `1px dashed ${styles.borderColor}` }} />

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
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                Apply
              </Button>
            </div>
          </Form.Group>

          <hr className="my-4" style={{ borderTop: `1px dashed ${styles.borderColor}` }} />

          {/* Pricing Section */}
          <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: styles.lightBg }}>
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-medium">Subtotal:</span>
              <span>₹{order.subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span style={{ color: styles.primaryColor }}>₹{order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Button */}
          <div className="d-grid">
            <Button
              onClick={handlePayment}
              className="py-3 rounded-3 fw-bold payment-button"
              style={styles.buttonStyle}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
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
    <span style={{ color: '#6b7280' }}>{value}</span>
  </div>
);

export default Checkout;