// src/components/Services.js
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const servicesData = {
  "Design Services": [
    { id: "posts", title: "Posts" },
    { id: "reels", title: "Reels/Shorts" },
    { id: "logo", title: "Logo Design" },
    { id: "logo-animation", title: "Logo Animation" },
  ],
  "Marketing Services": [
    { id: "ppc", title: "Pay per click" },
    { id: "seo", title: "SEO Ranking" },
    { id: "analytics", title: "Google Analytics" },
    { id: "business", title: "Google Business" },
  ],
  "Social Media Campaigns": [
    { id: "instagram", title: "Instagram" },
    { id: "snapchat", title: "Snapchat" },
    { id: "youtube", title: "YouTube" },
    { id: "twitter", title: "Twitter" },
    { id: "pinterest", title: "Pinterest" },
    { id: "facebook", title: "Facebook" },
    { id: "googleads", title: "Google Ads" },
    { id: "linkedin", title: "LinkedIn" },
  ],
  "OTT Campaigns": [
    { id: "hotstar", title: "Hotstar" },
    { id: "amazon", title: "Amazon" },
    { id: "zeetv", title: "ZeeTV" },
  ],
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    projectDescription: "",
    budget: "",
    timeline: "",
  });
  const [formStatus, setFormStatus] = useState(null); // { type: 'success'|'error', message: string }
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) {
      setFormStatus({ type: "error", message: "Please select a service" });
      return;
    }

    setIsLoading(true); // Show loading screen
    try {
      const response = await fetch(`${baseURL}/api/service-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceTitle: selectedService.title,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus({
          type: "success",
          message: "Service request submitted successfully! You'll receive a confirmation email soon.",
        });
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          projectDescription: "",
          budget: "",
          timeline: "",
        });
        setSelectedService(null);
      } else {
        setFormStatus({ type: "error", message: data.message || "Failed to submit service request" });
      }
    } catch (error) {
      console.error("Error submitting service request:", error);
      setFormStatus({ type: "error", message: "Server error. Please try again later." });
    } finally {
      setIsLoading(false); // Hide loading screen
    }
  };

  const renderForm = () => {
    return !selectedService ? (
      <div
        className="text-center py-5"
        style={{
          color: "#888",
          fontSize: "2.1rem",
          fontWeight: 500,
          background: "hsl(214.3, 31.8%, 98%)",
          borderRadius: "1rem",
          boxShadow: "0 0 12px rgba(0,0,0,0.06)",
        }}
      >
        Please select a service to continue
      </div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: "relative" }}
      >
        {isLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              borderRadius: "1rem",
            }}
          >
            <Spinner animation="border" variant="primary" />
            <span className="ms-2">Submitting...</span>
          </div>
        )}
        <Card
          className="p-4 shadow-sm border-0 rounded-4"
          style={{
            background: "hsl(214.3, 31.8%, 98%)",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <h5 className="mb-4" style={{ color: "#1a237e" }}>
            Request {selectedService.title} Service
          </h5>
          {formStatus && (
            <Alert
              variant={formStatus.type === "success" ? "success" : "danger"}
              onClose={() => setFormStatus(null)}
              dismissible
            >
              {formStatus.message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleInputChange}
                placeholder="Describe your requirements"
                required
                disabled={isLoading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Budget Range</Form.Label>
              <Form.Select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              >
                <option value="">Select Budget</option>
                <option value="0-5000">₹0 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-25000">₹10,000 - ₹25,000</option>
                <option value="25000+">₹25,000+</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Timeline</Form.Label>
              <Form.Select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              >
                <option value="">Select Timeline</option>
                <option value="1week">1 Week</option>
                <option value="2weeks">2 Weeks</option>
                <option value="1month">1 Month</option>
                <option value="flexible">Flexible</option>
              </Form.Select>
            </Form.Group>
            <Button
              style={{
                background: "linear-gradient(135deg, #1976d2, rgb(87, 52, 226))",
                border: "none",
                borderRadius: "30px",
              }}
              className="w-100 fw-bold"
              type="submit"
              disabled={isLoading}
            >
              Submit Request
            </Button>
          </Form>
        </Card>
      </motion.div>
    );
  };

  const renderServiceCards = () => (
    <div className="px-2">
      {Object.entries(servicesData).map(([category, services]) => (
        <div key={category} className="mb-4">
          <h6
            className="fw-semibold mb-3"
            style={{
              borderLeft: "4px solid #6a11cb",
              paddingLeft: "10px",
              color: "#444",
            }}
          >
            {category}
          </h6>
          <motion.div
            className="d-flex flex-wrap gap-3 justify-content-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card
                  onClick={() => {
                    setSelectedService(service);
                    handleCloseModal();
                  }}
                  className={`text-center d-flex flex-column justify-content-center align-items-center ${
                    selectedService?.id === service.id
                      ? "border-primary shadow"
                      : ""
                  }`}
                  style={{
                    width: "120px",
                    height: "100px",
                    cursor: "pointer",
                    border: "1px solid #ddd",
                    borderRadius: "16px",
                    transition: "all 0.3s ease-in-out",
                    boxShadow:
                      selectedService?.id === service.id
                        ? "0 0 10px rgba(106, 17, 203, 0.3)"
                        : "",
                  }}
                >
                  <Image
                    src={`/icons/${service.id}.png`}
                    alt={service.title}
                    style={{
                      width: "36px",
                      height: "36px",
                      marginBottom: "8px",
                    }}
                  />
                  <div style={{ fontSize: "13px" }}>{service.title}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );

  return (
    <Container
      fluid
      className="p-4"
      style={{ background: "var(--primary-color)", minHeight: "100vh" }}
    >
      <motion.h4
        className="mb-4 fw-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ color: "#1a237e" }}
      >
        Services
      </motion.h4>
      <Row>
        <Col md={6} className="d-none d-md-block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="p-4 shadow-sm border-0 rounded-4"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              {renderServiceCards()}
            </Card>
          </motion.div>
        </Col>
        <Col md={6}>
          <div className="d-md-none mb-3">
            <Button
              onClick={handleOpenModal}
              className="w-100 fw-bold text-white"
              style={{
                background: "linear-gradient(to right, #8e2de2, #4a00e0)",
                border: "none",
                borderRadius: "10px",
              }}
              disabled={isLoading}
            >
              Select Service
            </Button>
          </div>
          {renderForm()}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Select a Service</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-2" style={{ backgroundColor: "var(--primary-color)" }}>
          {renderServiceCards()}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Services;