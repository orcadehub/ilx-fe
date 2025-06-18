// /Edit.jsx
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import {
  Gear,
  Globe,
  GeoAlt,
  CurrencyDollar,
  XCircle,
  CheckCircle,
} from "react-bootstrap-icons";

function Edit({ businessInfo, onSave, onClose }) {
  const [formData, setFormData] = useState(businessInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Business Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            {[
              {
                icon: <Gear className="me-2 text-muted" />,
                label: "Business Name",
                name: "businessName",
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
                name: "businessStatus",
                type: "text",
              },
              {
                icon: <Gear className="me-2 text-muted" />,
                label: "Service Type",
                name: "serviceType",
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
                name: "priceRange",
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
                  name="accountStatus"
                  value={formData.accountStatus}
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
      </Modal.Body>
    </Modal>
  );
}

export default Edit;
