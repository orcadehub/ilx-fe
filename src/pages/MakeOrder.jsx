// src/components/MakeOrder.js
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
  FaCommentDots,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const extractAllServices = (prices) => {
  const services = [];
  Object.entries(prices).forEach(([platform, platformServices]) => {
    if (platform === "combos" || platform === "custom") return;
    Object.entries(platformServices).forEach(([type, price]) => {
      services.push({
        id: `${platform}-${type}`,
        name: type,
        platform,
        type: "Platform Based",
        price: Number(price),
      });
    });
  });
  return services;
};

// Function to format numbers to K, M, B
const formatFollowers = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
};

const MakeOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedPlatformServices = {},
    selectedCombos = [],
    selected = {},
  } = location.state || {};

  const allServices = extractAllServices(selected.prices || {});

  const [selectedServicesData, setSelectedServicesData] = useState(
    selectedPlatformServices
  );
  const [selectedServices, setSelectedServices] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [affiliatedLinks, setAffiliatedLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [postDateTime, setPostDateTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // UI Controls
  const [orderType, setOrderType] = useState("Platform Based");
  const [contentType, setContentType] = useState("Post Image/Video");
  const [platform, setPlatform] = useState("Instagram");

  // Provision Method (Upload Files or Provide Content)
  const [provisionMethod, setProvisionMethod] = useState("Upload Files");

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
    const influencerName =
      selected?.name || (selected?.username ? selected.username : "Unknown");

    // Calculate totalPrice
    const totalPrice = selectedServices.reduce(
      (sum, s) => sum + Number(s.price || 0),
      0
    );

    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("influencerId", influencerId);
    formData.append("username", username);
    formData.append("influencer_name", influencerName);
    formData.append("type", orderType);
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("totalPrice", totalPrice); // Add totalPrice here
    formData.append("description", description || "");
    formData.append("affiliatedLinks", JSON.stringify(affiliatedLinks));
    formData.append("couponCode", couponCode || "");
    formData.append("postDateTime", postDateTime || "");
    if (file) formData.append("file", file);

    try {
      const response = await fetch(`${baseURL}/api/place-order`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to place order");
      toast.success("Order placed successfully!");
      setTimeout(() => navigate("/dashboard/orders"), 2000);
    } catch (error) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  // Update selectedServices on dropdown change for demonstration
  useEffect(() => {
    if (orderType === "Platform Based") {
      // For demo: Set dummy selectedServices based on selection
      setSelectedServices([
        {
          name: contentType,
          platform,
          type: "Platform Based",
          price: 1000,
        },
      ]);
    }
  }, [orderType, contentType, platform]);

  const totalPrice = selectedServices.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );

  // Handle file input trigger
  const handleFileUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const platformOptions = ["Instagram", "Facebook", "YouTube", "Twitter"];

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
      className="d-flex flex-column flex-md-row"
      style={{ background: "#fff", minHeight: "100vh", padding: 0 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Row className="w-100">
        <Col md={8} style={{ padding: "48px" }}>
          <div className="d-flex align-items-center mb-4">
            <img
              src={selected.profilePic || "https://via.placeholder.com/64"}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-circle"
              style={{ objectFit: "cover", marginRight: "24px" }}
            />
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  color: "#22223b",
                  marginBottom: "6px",
                }}
              >
                {selected.name || "Gary Vaynerchuk"}
              </div>
              <div style={{ color: "#5f5f5f", fontSize: "0.98rem" }}>
                {selected.email || "garyv@example.com"}
              </div>
            </div>
            <div className="ms-auto d-flex" style={{ gap: "34px" }}>
              <div
                className="d-flex flex-column align-items-center"
                style={{ minWidth: 75 }}
              >
                <FaInstagram size={22} color="#E1306C" />
                <span
                  style={{
                    fontWeight: 500,
                    color: "#202020",
                    fontSize: "1.09rem",
                  }}
                >
                  {formatFollowers(selected.data.instagram.total_followers)}
                </span>
                <span style={{ color: "#BDBDBD", fontSize: "12px" }}>
                  Instagram
                </span>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{ minWidth: 75 }}
              >
                <FaFacebookF size={22} color="#3B5998" />
                <span
                  style={{
                    fontWeight: 500,
                    color: "#202020",
                    fontSize: "1.09rem",
                  }}
                >
                  {formatFollowers(selected.data.facebook.total_followers)}
                </span>
                <span style={{ color: "#BDBDBD", fontSize: "12px" }}>
                  Facebook
                </span>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{ minWidth: 75 }}
              >
                <FaYoutube size={22} color="#C4302B" />
                <span
                  style={{
                    fontWeight: 500,
                    color: "#202020",
                    fontSize: "1.09rem",
                  }}
                >
                  {formatFollowers(selected.data.youtube.total_followers)}
                </span>
                <span style={{ color: "#BDBDBD", fontSize: "12px" }}>
                  YouTube
                </span>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{ minWidth: 75 }}
              >
                <FaTwitter size={22} color="#00ACEE" />
                <span
                  style={{
                    fontWeight: 500,
                    color: "#202020",
                    fontSize: "1.09rem",
                  }}
                >
                  {formatFollowers(selected.data.twitter.total_followers)}
                </span>
                <span style={{ color: "#BDBDBD", fontSize: "12px" }}>
                  Twitter
                </span>
              </div>
            </div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ gap: 24, marginBottom: 24 }}
          >
            <Form.Group style={{ width: "25%" }}>
              <Form.Label
                style={{
                  fontWeight: 500,
                  color: "#545454",
                  fontSize: "14px",
                  marginBottom: 8,
                }}
              >
                Order Type
              </Form.Label>
              <Form.Select
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
              >
                <option>Platform Based</option>
                <option>Combo Package</option>
                <option>Custom Package</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{ width: "25%" }}>
              <Form.Label
                style={{
                  fontWeight: 500,
                  color: "#545454",
                  fontSize: "14px",
                  marginBottom: 8,
                }}
              >
                Content
              </Form.Label>
              <Form.Select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                {contentOptions[orderType].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group style={{ width: "25%" }}>
              <Form.Label
                style={{
                  fontWeight: 500,
                  color: "#545454",
                  fontSize: "14px",
                  marginBottom: 8,
                }}
              >
                Platform
              </Form.Label>
              <Form.Select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Instagram</option>
                <option>Facebook</option>
                <option>YouTube</option>
                <option>Twitter</option>
              </Form.Select>
            </Form.Group>
          </div>
          <hr
            style={{
              margin: "30px 0 28px 0",
              border: "none",
              borderBottom: "1px solid #ededed",
            }}
          />
          <div
            style={{
              fontWeight: 600,
              fontSize: "16px",
              color: "#4957ba",
              marginBottom: 12,
            }}
          >
            How would you like to provide the content?
          </div>
          <div className="d-flex" style={{ gap: "0px", marginBottom: "24px" }}>
            <Button
              variant="link"
              style={{
                color:
                  provisionMethod === "Upload Files" ? "#324bff" : "#939393",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 15,
                borderBottom:
                  provisionMethod === "Upload Files"
                    ? "3px solid #324bff"
                    : "none",
                borderRadius: 0,
                background: "transparent",
                width: 155,
                marginRight: 8,
                padding: "0 0 5px 0",
              }}
              onClick={() => setProvisionMethod("Upload Files")}
            >
              Upload Files
            </Button>
            <Button
              variant="link"
              style={{
                color:
                  provisionMethod === "Provide Content" ? "#324bff" : "#939393",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 15,
                borderBottom:
                  provisionMethod === "Provide Content"
                    ? "3px solid #324bff"
                    : "none",
                borderRadius: 0,
                background: "transparent",
                width: 155,
                padding: "0 0 5px 0",
              }}
              onClick={() => setProvisionMethod("Provide Content")}
            >
              Provide Content
            </Button>
          </div>
          <div>
            <Form.Group>
              <Form.Label
                style={{
                  fontWeight: 500,
                  color: "#545454",
                  fontSize: "14px",
                  marginBottom: 8,
                }}
              >
                {provisionMethod === "Provide Content"
                  ? "Content Description"
                  : "Description"}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                style={{
                  marginBottom: 7,
                  background: "#fafbfc",
                  border: "1px solid #dedede",
                  fontSize: 15,
                  borderRadius: 8,
                  padding: "12px",
                }}
                placeholder="Add any specific instructions or details about your request..."
              />
              <span
                style={{
                  fontSize: 13,
                  color: "#b0b0b0",
                  float: "right",
                }}
              >
                {description.length}/500 characters
              </span>
            </Form.Group>
          </div>
          <div style={{ marginTop: 18, marginBottom: 0 }}>
            <Form.Group>
              <Form.Label
                style={{
                  fontWeight: 500,
                  color: "#545454",
                  fontSize: "14px",
                  marginBottom: 8,
                }}
              >
                {provisionMethod === "Provide Content"
                  ? "Reference Files Upload"
                  : "Upload Files"}
              </Form.Label>
              <div
                style={{
                  background: "#F7F8FA",
                  borderRadius: "12px",
                  border: "1.7px dashed #d5dfea",
                  textAlign: "center",
                  padding: "32px 0",
                  marginBottom: 5,
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={handleFileUploadClick}
              >
                <FaArrowUp
                  style={{ fontSize: 19, color: "#6153cc", marginBottom: 5 }}
                />
                <div style={{ color: "#939393", fontSize: 14 }}>
                  Drag & drop files here
                  <br />
                  or{" "}
                  <span style={{ color: "#324bff", cursor: "pointer" }}>
                    click to browse
                  </span>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {file && (
                <div
                  style={{
                    marginTop: 10,
                    textAlign: "left",
                    paddingLeft: 10,
                    fontSize: 14,
                    color: "#333",
                  }}
                >
                  {/* Show image preview if image file */}
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
            </Form.Group>
          </div>
        </Col>
        <Col lg={4}>
          <Card
            style={{
              background: "#fff",
              border: "none",
              boxShadow: "0 2px 12px rgba(143,143,143,0.07)",
              borderRadius: 16,
              padding: "27px 35px 25px 35px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "#3a3a56",
                fontSize: "16px",
                marginBottom: "18px",
              }}
            >
              Select Date & Time
            </div>
            <Form.Group className="mb-4">
              <Form.Control
                type="datetime-local"
                value={postDateTime}
                onChange={(e) => setPostDateTime(e.target.value)}
                style={{
                  background: "#f7f8fa",
                  borderWidth: "1.7px",
                  borderColor: "#d5dfea",
                  borderRadius: "8px",
                  padding: "11px",
                  fontSize: 15,
                }}
              />
            </Form.Group>
            <div
              style={{
                fontWeight: 600,
                color: "#3a3a56",
                fontSize: "16px",
                marginBottom: "18px",
              }}
            >
              Affiliate Link (Optional)
            </div>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={handleLinkInput}
                placeholder="https://example.com/your-affiliate-link"
                style={{
                  background: "#f7f8fa",
                  borderWidth: "1.7px",
                  borderColor: "#d5dfea",
                  borderRadius: "8px",
                  padding: "11px",
                  fontSize: 15,
                }}
              />
              <div
                className="d-flex flex-wrap"
                style={{ marginTop: 9, gap: "6px" }}
              >
                {affiliatedLinks.map((link, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#324bff",
                      color: "#fff",
                      borderRadius: "15px",
                      padding: "7px 13px",
                      marginRight: 5,
                      fontSize: "13px",
                    }}
                  >
                    {link}
                    <button
                      type="button"
                      className="ms-2"
                      onClick={() => removeLink(link)}
                      style={{
                        border: "none",
                        background: "none",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1rem",
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
                fontWeight: 600,
                color: "#3a3a56",
                fontSize: "16px",
                marginBottom: "18px",
              }}
            >
              Coupon Code
            </div>
            <Form.Group>
              <div style={{ display: "flex", gap: "10px" }}>
                <Form.Control
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    background: "#f7f8fa",
                    borderWidth: "1.7px",
                    borderColor: "#d5dfea",
                    borderRadius: "8px",
                    padding: "11px",
                    fontSize: 15,
                  }}
                  placeholder="Enter coupon code"
                />
                <Button
                  style={{
                    background: "#324bff",
                    color: "#fff",
                    fontWeight: 500,
                    borderRadius: 8,
                    border: "none",
                    padding: "0 19px",
                    fontSize: 15,
                  }}
                >
                  Apply
                </Button>
              </div>
            </Form.Group>
          </Card>
          <Card
            style={{
              background: "#fff",
              border: "none",
              boxShadow: "0 2px 12px rgba(143,143,143,0.07)",
              borderRadius: 16,
              padding: "27px 35px 25px 35px",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "#5e60ce",
                fontSize: "16px",
                marginBottom: "18px",
              }}
            >
              Order Summary
            </div>
            <div
              style={{
                color: "#767676",
                fontWeight: 500,
                fontSize: "15px",
                marginBottom: "6px",
              }}
            >
              Order Details
            </div>
            <div
              style={{
                marginBottom: "18px",
                color: "#383838",
                fontWeight: 500,
                fontSize: "15.5px",
              }}
            >
              Type: {orderType}
              <br />
              Content: {contentType}
              <br />
              Platform: {platform}
            </div>
            <hr
              style={{
                margin: "10px 0 18px 0",
                border: "none",
                borderBottom: "1px solid #ededed",
              }}
            />
            <div
              style={{
                color: "#767676",
                fontWeight: 500,
                fontSize: "15px",
                marginBottom: "6px",
              }}
            >
              Price
            </div>
            <div
              style={{
                color: "#324bff",
                fontWeight: 700,
                fontSize: "22px",
              }}
            >
              ₹{totalPrice}
            </div>
            <Button
              className="w-100 mt-4"
              style={{
                background: "#324bff",
                border: "none",
                borderRadius: "8px",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "600",
              }}
              onClick={handleMakeOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Place Order"
              )}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeOrder;
