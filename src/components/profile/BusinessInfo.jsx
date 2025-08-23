// src/components/BusinessInfo.js
import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

const BusinessInfo = ({ user, setShowEdit }) => (
  <Card className="border-0 shadow-sm mb-4">
    <Card.Header className="bg-white d-flex justify-content-between align-items-center border-bottom">
      <h6 className="mb-0">Business Info</h6>
      <Button variant="link" size="sm" onClick={() => setShowEdit(true)}>
        <Pencil /> Edit
      </Button>
    </Card.Header>
    <Card.Body>
      <div className="mb-2">
        <small className="text-muted">Business Name</small>
        <p>{user?.business_name || "ABC Company"}</p>
      </div>
      <div className="mb-2">
        <small className="text-muted">Category</small>
        <p>{user?.category || "XYZ Products"}</p>
      </div>
      <div className="mb-2">
        <small className="text-muted">Business Status</small>
        <p>{user?.business_status || "Not Registered"}</p>
      </div>
      <div className="mb-2">
        <small className="text-muted">Service Type</small>
        <p>{user?.service_type || "Online & Offline"}</p>
      </div>
      <div className="mb-2">
        <small className="text-muted">Visit our site</small>
        <p>
          <a href={user?.website || "#"}>{user?.website || "www.xyz.com"}</a>
        </p>
      </div>
      <div className="mb-2">
        <small className="text-muted">Location</small>
        <p>{user?.location || "[Address]"}</p>
      </div>
      <div className="mb-2">
        <small className="text-muted">Price Range</small>
        <p>{user?.price_range || "₹5,000 - 50,000"}</p>
      </div>
      <div>
        <small className="text-muted">Account Management</small>
        <Form.Select
          value={user?.account_status || "Select"}
          onChange={(e) =>
            setUser((prev) => ({ ...prev, account_status: e.target.value }))
          }
        >
          <option>Select</option>
          <option value="Activate">Activate</option>
          <option value="Deactivate">Deactivate</option>
        </Form.Select>
      </div>
    </Card.Body>
  </Card>
);

export default BusinessInfo;