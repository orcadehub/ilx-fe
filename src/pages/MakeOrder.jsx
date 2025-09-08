import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

// K/M/B formatter
const formatFollowers = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num;
};

const MakeOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selected = {} } = location.state || {};

  // UI selections
  const [orderType, setOrderType] = useState("Platform Based");
  const [contentType, setContentType] = useState("Post Image/Video");
  const [platform, setPlatform] = useState("Instagram");

  // Inputs
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [affiliatedLinks, setAffiliatedLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [postDateTime, setPostDateTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Tabs: Upload vs Provide
  const [provisionMethod, setProvisionMethod] = useState("Upload Files");

  // Selected services with dynamic pricing from selected.prices
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    let price = 0;
    let serviceName = contentType;

    if (orderType === "Platform Based") {
      // Map contentType to the key in selected.prices[platform]
      const platformKey = platform.toLowerCase();
      const contentKeyMap = {
        "Post Image/Video": "Post Image/Video",
        "Reels/Shorts": "Reels/Shorts",
        "Story Image/Video": "Story (Image/Video)",
        "In Video Promotion <10min": "Short Video (<10m)",
        "Promotion >10min": "Video (>10m)",
        Polls: "Polls",
        "Visit and Promote": "Visit and Promote at Your Business",
      };
      const contentKey = contentKeyMap[contentType] || contentType;
      price =
        selected?.prices?.[platformKey]?.[contentKey] || 0;
    } else if (orderType === "Combo Package") {
      // Find combo by name or services
      const combo = selected?.prices?.combos?.find(
        (c) =>
          c.name === contentType ||
          c.services.includes(contentType.replace("Combo ", ""))
      );
      price = combo?.price || 0;
      serviceName = combo?.name || contentType;
    } else if (orderType === "Custom Package") {
      // Find custom service by name
      const custom = selected?.prices?.custom?.find(
        (c) => c.name === contentType
      );
      price = custom?.price || 0;
      serviceName = custom?.name || contentType;
    }

    setSelectedServices([
      {
        name: serviceName,
        platform: orderType === "Combo Package" ? "Combo" : platform,
        type: orderType,
        price,
      },
    ]);
  }, [orderType, contentType, platform, selected]);

  const totalPrice = selectedServices.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );

  const handleLinkInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = linkInput.trim();
      if (trimmed && !affiliatedLinks.includes(trimmed)) {
        setAffiliatedLinks((p) => [...p, trimmed]);
        setLinkInput("");
      }
    }
  };

  const removeLink = (l) => setAffiliatedLinks((p) => p.filter((x) => x !== l));

  const handleFileUploadClick = () => {
    const el = document.getElementById("fileInput");
    if (el) el.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
  };

  const handleMakeOrder = async () => {
    if (selectedServices.length === 0) {
      toast.error(
        "Please select at least one service, combo, or custom package."
      );
      return;
    }
    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userId = localUser?.id;
    const influencerId = selected?.id;
    const username = localUser?.fullname;
    const influencerName = selected?.name || selected?.username || "Unknown";

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("influencerId", influencerId);
    formData.append("username", username);
    formData.append("influencer_name", influencerName);
    formData.append("type", orderType);
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("totalPrice", totalPrice);
    formData.append("description", description || "");
    formData.append("affiliatedLinks", JSON.stringify(affiliatedLinks));
    formData.append("couponCode", couponCode || "");
    formData.append("postDateTime", postDateTime || "");
    if (file instanceof File) {
      formData.append("file", file);
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}/api/place-order`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to place order");
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/dashboard/orders"), 1200);
    } catch (err) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  // Style tokens tuned to screenshot
  const palette = {
    bg: "#F6F7FB",
    card: "#FFFFFF",
    text: "#383A46",
    sub: "#767676",
    label: "#545454",
    light: "#939393",
    hairline: "#EDEDED",
    inputBg: "#F7F8FA",
    inputBorder: "#D5DFEA",
    brand: "#324BFF",
    brandDeep: "#5E60CE",
    chip: "#324BFF",
    danger: "#FF3B30",
    gradientFrom: "#775EDC",
    gradientTo: "#A07BFF",
    gradientBtnFrom: "#6C63FF",
    gradientBtnTo: "#9B79FF",
  };

  const gradient = `linear-gradient(135deg, ${palette.gradientFrom} 0%, ${palette.gradientTo} 100%)`;
  const ctaGradient = `linear-gradient(90deg, ${palette.gradientBtnFrom} 0%, ${palette.gradientBtnTo} 100%)`;

  const contentOptions = {
    "Platform Based": [
      "Post Image/Video",
      "Reels/Shorts",
      "Story Image/Video",
      "In Video Promotion <10min",
      "Promotion >10min",
      "Polls",
      "Visit and Promote",
    ],
    "Combo Package": [
      "Combo Post Image/Video",
      "Combo Reels/Shorts",
      "Combo Story Image/Video",
      "Combo In Video Promotion <10min",
      "Combo Promotion >10min",
      "Combo Polls",
      "Combo Visit and Promote",
    ],
    "Custom Package": ["In Video Promotion", "Promotion", "Visit and Promote"],
  };

  return (
    <Container
      fluid
      style={{
        background: palette.bg,
        minHeight: "100vh",
        padding: "24px 28px",
      }}
    >
      <ToastContainer position="top-right" autoClose={2500} />
      <Row style={{ maxWidth: 1180, margin: "0 auto", gap: 24 }}>
        {/* Left column */}
        <Col lg={7} style={{ padding: 0 }}>
          {/* Gradient Profile Banner */}
          <div
            style={{
              background: gradient,
              borderRadius: 14,
              padding: "18px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 18,
              boxShadow: "0 6px 24px rgba(64,57,131,0.12)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={selected.profilePic || "https://via.placeholder.com/64"}
                alt="Profile"
                width={56}
                height={56}
                className="rounded-circle"
                style={{
                  objectFit: "cover",
                  border: "2px solid rgba(255,255,255,0.6)",
                }}
              />
              <div style={{ marginLeft: 14 }}>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16.5,
                    letterSpacing: 0.1,
                  }}
                >
                  {selected.name || "Gary Vaynerchuk"}
                </div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 13.5 }}>
                  {selected.email || "garyv@example.com"}
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
              {selected?.data?.instagram?.total_followers ? (
                <div style={{ textAlign: "center", minWidth: 72 }}>
                  <FaInstagram size={20} color="#FFF" />
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {formatFollowers(selected.data.instagram.total_followers)}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                    Instagram
                  </div>
                </div>
              ) : null}
              {selected?.data?.facebook?.total_followers ? (
                <div style={{ textAlign: "center", minWidth: 72 }}>
                  <FaFacebookF size={18} color="#FFF" />
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {formatFollowers(selected.data.facebook.total_followers)}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                    Facebook
                  </div>
                </div>
              ) : null}
              {selected?.data?.youtube?.total_followers ? (
                <div style={{ textAlign: "center", minWidth: 72 }}>
                  <FaYoutube size={20} color="#FFF" />
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {formatFollowers(selected.data.youtube.total_followers)}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                    YouTube
                  </div>
                </div>
              ) : null}
              {selected?.data?.twitter?.total_followers ? (
                <div style={{ textAlign: "center", minWidth: 72 }}>
                  <FaTwitter size={20} color="#FFF" />
                  <div
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      marginTop: 4,
                    }}
                  >
                    {formatFollowers(selected.data.twitter.total_followers)}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>
                    Twitter
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Selector Row */}
          <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
            <Form.Group style={{ flex: 1, minWidth: 220 }}>
              <Form.Label
                style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
              >
                Selected Order
              </Form.Label>
              <div style={{ display: "flex", gap: 12 }}>
                <Form.Select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.inputBorder}`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 14,
                  }}
                >
                  <option>Platform Based</option>
                  <option>Combo Package</option>
                  <option>Custom Package</option>
                </Form.Select>
                <Form.Select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.inputBorder}`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 14,
                  }}
                >
                  {contentOptions[orderType].map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  style={{
                    background: palette.card,
                    border: `1px solid ${palette.inputBorder}`,
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 14,
                    maxWidth: 180,
                  }}
                >
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>YouTube</option>
                  <option>Twitter</option>
                </Form.Select>
              </div>
            </Form.Group>
          </div>

          <hr
            style={{
              border: "none",
              borderBottom: `1px solid ${palette.hairline}`,
              margin: "18px 0 14px",
            }}
          />

          {/* Provide content toggle */}
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: palette.brandDeep,
              marginBottom: 10,
            }}
          >
            How would you like to provide the content?
          </div>
          <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
            {["Upload Files", "Provide Content"].map((tab) => {
              const active = provisionMethod === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setProvisionMethod(tab)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: active ? palette.brand : palette.light,
                    fontWeight: 600,
                    fontSize: 14,
                    padding: 0,
                    borderBottom: active
                      ? `3px solid ${palette.brand}`
                      : "3px solid transparent",
                    width: 160,
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Description */}
          <Form.Group>
            <Form.Label
              style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
            >
              {provisionMethod === "Provide Content"
                ? "Content Description"
                : "Description"}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              placeholder="Add any specific instructions or details about your request..."
              style={{
                background: "#FAFBFC",
                border: `1px solid #DEDEDE`,
                borderRadius: 10,
                fontSize: 14.5,
                padding: "12px 12px",
              }}
            />
            <div
              style={{
                textAlign: "right",
                color: "#B0B0B0",
                fontSize: 12,
                marginTop: 6,
              }}
            >
              {description.length}/500 characters
            </div>
          </Form.Group>

          {/* Upload / Reference Files */}
          <div style={{ marginTop: 14 }}>
            <Form.Label
              style={{ fontWeight: 600, color: palette.label, fontSize: 13 }}
            >
              {provisionMethod === "Provide Content"
                ? "Reference Files Upload"
                : "Upload Files"}
            </Form.Label>
            <div
              onClick={handleFileUploadClick}
              style={{
                background: palette.inputBg,
                borderRadius: 12,
                border: `1.7px dashed ${palette.inputBorder}`,
                textAlign: "center",
                padding: "34px 0",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <FaArrowUp
                style={{ fontSize: 18, color: "#6153CC", marginBottom: 6 }}
              />
              <div
                style={{ color: palette.light, fontSize: 14, lineHeight: 1.5 }}
              >
                Drag & drop files here
                <br />
                or <span style={{ color: palette.brand }}>click to browse</span>
              </div>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {file instanceof File && (
              <div style={{ marginTop: 10, fontSize: 14, color: "#333" }}>
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: 150,
                      borderRadius: 8,
                    }}
                  />
                ) : file.type.startsWith("video/") ? (
                  <video
                    width="100%"
                    height={150}
                    controls
                    src={URL.createObjectURL(file)}
                    style={{ borderRadius: 8 }}
                  />
                ) : (
                  <div>
                    <strong>Selected File:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </div>
        </Col>

        {/* Right rail */}
        <Col lg={4} style={{ padding: 0 }}>
          {/* Date & Time + Affiliate + Coupon */}
          <Card
            style={{
              background: palette.card,
              border: "none",
              borderRadius: 16,
              padding: "22px 22px 18px",
              boxShadow: "0 2px 12px rgba(143,143,143,0.07)",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: palette.text,
                fontSize: 16,
                marginBottom: 12,
              }}
            >
              Select Date & Time
            </div>
            <Form.Group className="mb-3">
              <Form.Control
                type="datetime-local"
                value={postDateTime}
                onChange={(e) => setPostDateTime(e.target.value)}
                style={{
                  background: palette.inputBg,
                  border: `1.7px solid ${palette.inputBorder}`,
                  borderRadius: 8,
                  padding: "10px 11px",
                  fontSize: 14.5,
                }}
              />
            </Form.Group>

            <div
              style={{
                fontWeight: 700,
                color: palette.text,
                fontSize: 16,
                marginBottom: 12,
              }}
            >
              Affiliate Link (Optional)
            </div>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={handleLinkInput}
                placeholder="https://example.com/your-affiliate-link"
                style={{
                  background: palette.inputBg,
                  border: `1.7px solid ${palette.inputBorder}`,
                  borderRadius: 8,
                  padding: "10px 11px",
                  fontSize: 14.5,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginTop: 8,
                }}
              >
                {affiliatedLinks.map((l, i) => (
                  <span
                    key={i}
                    style={{
                      background: palette.chip,
                      color: "#fff",
                      borderRadius: 14,
                      padding: "6px 11px",
                      fontSize: 12.5,
                    }}
                  >
                    {l}
                    <button
                      type="button"
                      onClick={() => removeLink(l)}
                      style={{
                        marginLeft: 8,
                        border: "none",
                        background: "transparent",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </Form.Group>

            <div
              style={{
                fontWeight: 700,
                color: palette.text,
                fontSize: 16,
                marginBottom: 12,
              }}
            >
              Coupon Code
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Form.Control
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                style={{
                  background: palette.inputBg,
                  border: `1.7px solid ${palette.inputBorder}`,
                  borderRadius: 8,
                  padding: "10px 11px",
                  fontSize: 14.5,
                }}
              />
              <Button
                style={{
                  background: palette.brand,
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 8,
                  border: "none",
                  padding: "0 16px",
                  fontSize: 14.5,
                }}
              >
                Apply
              </Button>
            </div>
          </Card>

          {/* Summary */}
          <Card
            style={{
              background: palette.card,
              border: "none",
              borderRadius: 16,
              padding: "22px 22px 20px",
              boxShadow: "0 2px 12px rgba(143,143,143,0.07)",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: palette.brandDeep,
                fontSize: 16,
                marginBottom: 14,
              }}
            >
              Order Summary
            </div>

            <div
              style={{
                color: palette.sub,
                fontWeight: 600,
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              Order Details
            </div>
            <div
              style={{
                color: "#383838",
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 12,
                lineHeight: 1.6,
              }}
            >
              {selectedServices.map((service, index) => (
                <div key={index}>
                  Type: {service.type}
                  <br />
                  Content: {service.name}
                  <br />
                  Platform: {service.platform}
                  <br />
                  Price: ₹{service.price || "Not specified"}
                  <br />
                  <br />
                </div>
              ))}
            </div>

            <hr
              style={{
                border: "none",
                borderBottom: `1px solid ${palette.hairline}`,
                margin: "8px 0 14px",
              }}
            />

            <div
              style={{
                color: palette.sub,
                fontWeight: 600,
                fontSize: 14,
                marginBottom: 6,
              }}
            >
              Total
            </div>
            <div
              style={{ color: palette.brand, fontWeight: 800, fontSize: 24 }}
            >
              ₹{totalPrice || "Not specified"}
            </div>

            <Button
              className="w-100"
              style={{
                marginTop: 18,
                background: ctaGradient,
                border: "none",
                borderRadius: 10,
                padding: "14px",
                fontSize: 15.5,
                fontWeight: 700,
                boxShadow: "0 8px 22px rgba(98,73,230,0.25)",
              }}
              onClick={handleMakeOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Send Request"
              )}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeOrder;