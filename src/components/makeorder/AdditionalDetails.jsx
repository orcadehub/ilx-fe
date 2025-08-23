// src/components/AdditionalDetails.js
import React from "react";
import { Card } from "react-bootstrap";

const AdditionalDetails = () => {
  const [file, setFile] = React.useState(null);
  const [description, setDescription] = React.useState("");

  return (
    <Card
      className="rounded-4 p-4 mt-4"
      style={{
        background: "linear-gradient(135deg, #f1f5f9, #fef2f2)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h6 className="text-lg fw-bold text-dark mb-4">📋 Additional Details</h6>
      <div className="space-y-4">
        <div>
          <label
            className="form-label text-secondary"
            style={{ color: "#475569" }}
          >
            File Upload
          </label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ borderColor: "#a5b4fc", backgroundColor: "#f8fafc" }}
          />
        </div>
        <div>
          <label
            className="form-label text-secondary"
            style={{ color: "#475569" }}
          >
            Manual Description
          </label>
          <textarea
            className="form-control"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter any specific instructions or details"
            style={{ borderColor: "#a5b4fc", backgroundColor: "#f8fafc" }}
          />
        </div>
      </div>
    </Card>
  );
};

export default AdditionalDetails;