// src/components/AffiliateLinks.js
import React, { useState } from "react";
import { Card } from "react-bootstrap";

const AffiliateLinks = () => {
  const [postDateTime, setPostDateTime] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [affiliatedLinks, setAffiliatedLinks] = useState([]);
  const [couponCode, setCouponCode] = useState("");

  const handleLinkInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedLink = linkInput.trim();
      if (trimmedLink && !affiliatedLinks.includes(trimmedLink)) {
        setAffiliatedLinks([...affiliatedLinks, trimmedLink]);
        setLinkInput("");
      }
    }
  };

  const removeLink = (linkToRemove) => {
    setAffiliatedLinks(affiliatedLinks.filter((link) => link !== linkToRemove));
  };

  return (
    <Card
      className="mb-4 rounded-4 p-4 shadow border-0"
      style={{ background: "linear-gradient(to bottom right, #f8fafc, #e6f0fa)" }}
    >
      <h5 className="fw-bold mb-4 text-dark">
        <i className="bi bi-link-45deg me-2 text-indigo"></i>Add Affiliate Links
      </h5>
      <div className="mb-3">
        <label
          className="form-label text-secondary"
          style={{ color: "#475569" }}
        >
          Schedule Post Date & Time
        </label>
        <input
          type="datetime-local"
          className="form-control"
          value={postDateTime}
          onChange={(e) => setPostDateTime(e.target.value)}
          style={{ backgroundColor: "#f8fafc", borderColor: "#a5b4fc" }}
        />
      </div>
      <div className="mb-3">
        <label
          className="form-label text-secondary"
          style={{ color: "#475569" }}
        >
          Affiliated Links
        </label>
        <input
          type="text"
          className="form-control"
          value={linkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          onKeyDown={handleLinkInput}
          placeholder="Enter link and press Enter or comma"
          style={{ borderColor: "#a5b4fc", backgroundColor: "#f8fafc" }}
        />
        <div className="d-flex flex-wrap gap-2 mt-2">
          {affiliatedLinks.map((link, index) => (
            <span
              key={index}
              className="badge rounded-pill px-3 py-2"
              style={{ backgroundColor: "#a5b4fc", color: "#ffffff" }}
            >
              {link}
              <button
                type="button"
                className="btn btn-sm btn-link text-white ms-2"
                onClick={() => removeLink(link)}
                style={{ fontSize: "1.2rem", lineHeight: "1rem" }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <label
          className="form-label text-secondary"
          style={{ color: "#475569" }}
        >
          Coupon Code
        </label>
        <input
          type="text"
          className="form-control"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          style={{ backgroundColor: "#f8fafc", borderColor: "#a5b4fc" }}
        />
      </div>
    </Card>
  );
};

export default AffiliateLinks;