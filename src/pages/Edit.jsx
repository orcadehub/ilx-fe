// Edit.jsx
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import {
  Gear,
  Globe,
  GeoAlt,
  CurrencyDollar,
  XCircle,
  CheckCircle,
} from "react-bootstrap-icons";
import axios from "axios";
import config from "../config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

function Edit({ user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    business_name: user.business_name || "My Business",
    category: user.category || "Lifestyle",
    business_status: user.business_status || "Active",
    service_type: user.service_type || "Consulting",
    website: user.website || "example.com",
    location: user.location || "Hyderabad, India",
    price_range: user.price_range || "₹1000 - ₹10000",
    account_status: user.account_status || "Activate",
  });

  const [loading, setLoading] = useState(false); // 🔹 loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔹 Start loading
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      const response = await axios.put(
        `${baseURL}/api/dashboard/update-profile`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Profile updated successfully!", {
        position: "bottom-right"
      });
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "bottom-right"
      });
    } finally {
      setLoading(false); // 🔹 Stop loading
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Business Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          // 🔹 Fullscreen loader
          <div className="d-flex flex-column justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="mt-3 text-muted">Updating profile...</div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              {[
                {
                  icon: <Gear className="me-2 text-muted" />,
                  label: "Business Name",
                  name: "business_name",
                  type: "text",
                },
                {
                  icon: <Gear className="me-2 text-muted" />,
                  label: "Category",
                  name: "category",
                  type: "text",
                },
                {
                  icon: <Gear className="me-2 text-muted" />,
                  label: "Business Status",
                  name: "business_status",
                  type: "text",
                },
                {
                  icon: <Gear className="me-2 text-muted" />,
                  label: "Service Type",
                  name: "service_type",
                  type: "text",
                },
                {
                  icon: <Globe className="me-2 text-muted" />,
                  label: "Website",
                  name: "website",
                  type: "url",
                },
                {
                  icon: <GeoAlt className="me-2 text-muted" />,
                  label: "Location",
                  name: "location",
                  type: "text",
                },
                {
                  icon: <CurrencyDollar className="me-2 text-muted" />,
                  label: "Price Range",
                  name: "price_range",
                  type: "text",
                },
              ].map((field, idx) => (
                <Col md={6} key={idx}>
                  <Form.Group controlId={`form-${field.name}`}>
                    <Form.Label className="d-flex align-items-center text-muted small mb-1">
                      {field.icon}
                      <span className="fw-semibold">{field.label}</span>
                    </Form.Label>
                    <Form.Control
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="border-2"
                    />
                  </Form.Group>
                </Col>
              ))}

              <Col xs={12}>
                <Form.Group controlId="form-account-status" className="mb-3">
                  <Form.Label className="fw-semibold small text-muted">
                    Account Management
                  </Form.Label>
                  <Form.Select
                    name="account_status"
                    value={formData.account_status}
                    onChange={handleChange}
                    className="border-2"
                  >
                    <option value="Activate">Activate</option>
                    <option value="Deactivate">Deactivate</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button
                variant="outline-secondary"
                onClick={onClose}
                className="d-flex align-items-center"
              >
                <XCircle className="me-1" />
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="d-flex align-items-center"
              >
                <CheckCircle className="me-1" />
                Save changes
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Modal>
  );
}

export default Edit;
