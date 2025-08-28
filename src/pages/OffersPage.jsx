import React, { useState, useEffect } from "react";
import { FaGift, FaRegCopy } from "react-icons/fa";
import {
  Button,
  Card,
  Row,
  Col,
  ProgressBar,
  Badge,
  OverlayTrigger,
  Tooltip,
  Toast,
  ToastContainer,
  Spinner,
  Alert,
} from "react-bootstrap";
import config from "../config";
const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const OffersPage = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [campaigns, setCampaigns] = useState([
    {
      id: "summer2025",
      name: "🌞 Summer Campaign 2025",
      description:
        "Promote our new summer collection with exclusive discounts for your followers.",
      image: "https://picsum.photos/seed/twitter_1/800/450",
      period: "7 days",
      requiredTime: "24 hours",
      reward: "1 month Free Subscription",
      caption:
        "Summer is here! Check out the new collection from @influenceconnect with 20% off using code SUMMER25 #ad",
    },
    {
      id: "backtoschool2025",
      name: "🎒 Back to School 2025",
      description:
        "Promote our back to school essentials with special offers for students.",
      image: "https://picsum.photos/seed/education/800/450",
      period: "14 days",
      requiredTime: "48 hours",
      reward: "2 months Free Subscription",
      caption:
        "Get ready for school! Shop our back to school collection with 15% off using code SCHOOL25 #ad",
    },
    {
      id: "holiday2025",
      name: "🎄 Holiday Special 2025",
      description:
        "Promote our holiday collection with festive discounts and special offers.",
      image: "https://picsum.photos/seed/christmas/800/450",
      period: "10 days",
      requiredTime: "72 hours",
      reward: "Premium features for 3 months",
      caption:
        "Holiday magic is here! Enjoy 25% off our festive collection with code HOLIDAY25 #ad",
    },
  ]);
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user's promotions
  const fetchPromotions = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your promotions");
        return;
      }

      const response = await fetch(`${baseURL}/api/promotions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPromotions(data);
      } else {
        setError("Failed to fetch promotions");
      }
    } catch (err) {
      setError("Error fetching promotions");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user already has a promotion for a specific campaign
  const hasExistingPromotion = (campaignId) => {
    return promotions.some(
      (promo) => promo.campaign_id === campaignId && promo.status === true
    );
  };

  // Generate unique URL
  const generateUniqueUrl = async (campaignId) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to generate a URL");
        return;
      }

      // Check if user already has an active promotion for this campaign
      if (hasExistingPromotion(campaignId)) {
        setError("You already have an active promotion for this campaign");
        return null;
      }

      const response = await fetch(`${baseURL}/api/generate-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ campaignId }),
      });

      if (response.ok) {
        const data = await response.json();
        setToastMessage("URL generated successfully!");
        setShowToast(true);
        // Refresh promotions list
        fetchPromotions();
        return data.unique_url;
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to generate URL");
        return null;
      }
    } catch (err) {
      setError("Error generating URL");
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Claim reward
  const claimReward = async (promotionId) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to claim reward");
        return;
      }

      const response = await fetch(`${baseURL}/api/promotions/claim-reward`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ promotionId }),
      });

      if (response.ok) {
        setSuccess("Reward claimed successfully!");
        // Refresh promotions list
        fetchPromotions();
      } else {
        setError("Failed to claim reward");
      }
    } catch (err) {
      setError("Error claiming reward");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setToastMessage("Copied to clipboard!");
    setShowToast(true);
  };

  const handleGenerateUrl = async (campaignId, campaignName) => {
    const url = await generateUniqueUrl(campaignId);
    if (url) {
      copyToClipboard(url);
    }
  };

  // Check if promotion is expired (created more than campaign period ago)
  const isPromotionExpired = (promo, campaign) => {
    if (!campaign) return false;

    const createdDate = new Date(promo.created_at);
    const days = parseInt(campaign.period);
    const expirationDate = new Date(createdDate);
    expirationDate.setDate(expirationDate.getDate() + days);

    return new Date() > expirationDate;
  };

  // Get campaign by ID
  const getCampaignById = (campaignId) => {
    return campaigns.find((campaign) => campaign.id === campaignId);
  };

  // Fetch promotions when component mounts or tab changes to promotions
  useEffect(() => {
    if (activeTab === "promotions") {
      fetchPromotions();
    }
  }, [activeTab]);

  const lavishCardStyle =
    "rounded-3 shadow-sm border-0 bg-white p-4 position-relative overflow-hidden";
  const lavishSectionStyle = "bg-light p-3 rounded-3 mb-3 border border-1";

  const renderCurrentOffer = () => (
    <div className="mt-4">
      {campaigns.map((campaign, index) => {
        const hasExisting = hasExistingPromotion(campaign.id);

        return (
          <Card key={index} className={`${lavishCardStyle} mb-4`}>
            <h4 className="mb-3 fw-semibold text-gradient">{campaign.name}</h4>
            <p>{campaign.description}</p>
            <Row className="mt-4">
              <Col md={6}>
                <div className="rounded-3 overflow-hidden shadow-sm mb-4">
                  <img
                    src={campaign.image}
                    alt="Campaign"
                    className="img-fluid rounded-3 border"
                    style={{
                      objectFit: "cover",
                      maxHeight: "200px",
                      width: "100%",
                    }}
                  />
                </div>

                <div className={lavishSectionStyle}>
                  <h6 className="fw-bold mb-2">Suggested Caption:</h6>
                  <p className="mb-3 small text-muted">{campaign.caption}</p>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => copyToClipboard(campaign.caption)}
                    aria-label="Copy suggested caption"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "📋 Copy Caption"
                    )}
                  </Button>
                </div>
              </Col>

              <Col md={6}>
                <div className={lavishSectionStyle}>
                  <h6 className="text-primary fw-bold mb-3">
                    Promotion Details
                  </h6>
                  <p className="mb-1">
                    <strong>Campaign Period:</strong> {campaign.period}
                  </p>
                  <p className="mb-1">
                    <strong>Required Time Live:</strong> {campaign.requiredTime}
                  </p>
                  <p className="mb-0">
                    <strong>Your Reward:</strong> {campaign.reward}
                  </p>
                </div>

                <div className={lavishSectionStyle}>
                  <h6 className="text-primary fw-bold mb-2">
                    Platform Instructions
                  </h6>
                  <ul className="mb-3 ps-3">
                    <li>📸 Post as regular post or story with caption</li>
                    <li>🔗 Share as post with caption and tagged page</li>
                    <li>📹 Include link in video description</li>
                  </ul>
                  {hasExisting ? (
                    <Alert variant="info" className="mb-0">
                      <small>
                        You already have an active promotion for this campaign.
                        Check "My Promotions" tab.
                      </small>
                    </Alert>
                  ) : (
                    <Button
                      variant="dark"
                      size="sm"
                      className="text-capitalize"
                      aria-label="Generate unique URL"
                      onClick={() =>
                        handleGenerateUrl(campaign.id, campaign.name)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "✨ Generate Unique URL"
                      )}
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );

  const renderMyPromotions = () => (
    <div className="mt-4">
      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
          {success}
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : promotions.length === 0 ? (
        <Card className={`${lavishCardStyle} text-center py-5`}>
          <FaGift size={40} className="text-muted mb-3" />
          <h5>No promotions yet</h5>
          <p className="text-muted">
            Generate your first promotion URL to get started
          </p>
          <Button variant="primary" onClick={() => setActiveTab("current")}>
            Create Promotion
          </Button>
        </Card>
      ) : (
        promotions.map((promo) => {
          const campaign = getCampaignById(promo.campaign_id);
          const isExpired = isPromotionExpired(promo, campaign);
          const isActive = promo.status && !isExpired;
          const isEligibleForReward = isActive && promo.unique_clicks >= 10;
          const isRewardClaimed = promo.reward_claimed;

          // Calculate time left for active promotions
          let timeLeft = null;
          if (isActive && campaign) {
            const createdDate = new Date(promo.created_at);
            const days = parseInt(1);
            const expirationDate = new Date(createdDate);
            expirationDate.setDate(expirationDate.getDate() + days);

            const now = new Date();
            const timeDiff = expirationDate - now;

            if (timeDiff > 0) {
              const hoursLeft = Math.floor(
                (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              timeLeft = `${hoursLeft}h left`;
            }
          }

          return (
            <Card key={promo.id} className={`${lavishCardStyle} mb-4`}>
              <Row>
                <Col md={8}>
                  <div className="d-flex align-items-center mb-2 gap-2">
                    <strong>
                      {promo.promotion_name ||
                        campaign?.name ||
                        "Unknown Campaign"}
                    </strong>
                    <Badge
                      bg={
                        isExpired
                          ? "secondary"
                          : isActive
                          ? "success"
                          : "danger"
                      }
                      className="ms-2 px-3 py-2 text-uppercase"
                    >
                      {isExpired ? "Expired" : isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="mb-1 text-muted small">Generated URL:</p>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <input
                      type="text"
                      readOnly
                      className="form-control me-2 rounded-pill"
                      value={promo.unique_url}
                    />
                    <OverlayTrigger overlay={<Tooltip>Copy</Tooltip>}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => copyToClipboard(promo.unique_url)}
                        aria-label="Copy promotion URL"
                        disabled={isLoading}
                      >
                        <FaRegCopy />
                      </Button>
                    </OverlayTrigger>
                  </div>

                  {isActive && (
                    <div className="mt-2">
                      <p className="mb-1 small">
                        <strong>Unique Clicks:</strong>{" "}
                        {promo.unique_clicks || 0}
                      </p>
                      <ProgressBar
                        now={Math.min((promo.unique_clicks || 0) * 10, 100)}
                        className="mb-1"
                        style={{ height: "5px" }}
                        variant={
                          (promo.unique_clicks || 0) >= 10
                            ? "success"
                            : "primary"
                        }
                      />
                      <small className="text-muted">
                        Progress toward reward eligibility (
                        {promo.unique_clicks || 0}/10 clicks)
                      </small>
                    </div>
                  )}
                </Col>
                <Col
                  md={4}
                  className="text-md-end d-flex flex-column justify-content-between"
                >
                  <div className="mt-auto">
                    {isActive && isEligibleForReward && !isRewardClaimed && (
                      <Button
                        variant="success"
                        className="mt-3 w-100"
                        onClick={() => claimReward(promo.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "🎁 Claim Reward"
                        )}
                      </Button>
                    )}
                    {isRewardClaimed && (
                      <Badge
                        bg="success"
                        className="mt-3 px-3 py-2 w-100 d-block"
                      >
                        Reward Claimed
                      </Badge>
                    )}
                    {isActive && !isEligibleForReward && !isRewardClaimed && (
                      <Badge
                        bg="info"
                        className="mt-3 px-3 py-2 w-100 d-block"
                      >
                        Need {10 - (promo.unique_clicks || 0)} more clicks
                      </Badge>
                    )}
                  </div>

                  <div className="mt-2">
                    {timeLeft && (
                      <div className="mb-1">
                        <Badge bg="" className="px-2 py-1 border border-warning text-danger">
                          ⏰ {timeLeft}
                        </Badge>
                      </div>
                    )}
                    <small className="text-muted d-block">
                      Created: {new Date(promo.created_at).toLocaleDateString()}
                      {isExpired && ` (Expired)`}
                    </small>
                  </div>
                </Col>
              </Row>
            </Card>
          );
        })
      )}
    </div>
  );

  const renderHowItWorks = () => (
    <Card className={`${lavishCardStyle} mt-4`}>
      <h4 className="mb-3 fw-semibold">How to Earn Rewards with Promotions</h4>
      <p>Follow these simple steps to promote our campaigns and earn rewards</p>

      <Row className="text-center mb-4">
        {[
          "Generate a Unique URL",
          "Post on Social Media",
          "Keep Live for 24 Hours",
        ].map((title, i) => (
          <Col md={4} key={i}>
            <div className="bg-light rounded-3 p-4 shadow-sm border border-1">
              <div
                className="badge bg-primary rounded-circle mb-3"
                style={{ width: 36, height: 36, lineHeight: "36px" }}
              >
                {i + 1}
              </div>
              <h6>{title}</h6>
              <p className="small text-muted">
                {i === 0
                  ? "Click the 'Generate Unique URL' button on the current promotion to create your personal tracking link."
                  : i === 1
                  ? "Share the promotion on Instagram, Facebook, or YouTube using the provided content and your unique URL."
                  : "Maintain your post for at least 24 hours to qualify for your reward."}
              </p>
            </div>
          </Col>
        ))}
      </Row>

      <Card className="bg-warning bg-opacity-10 p-3 mb-3 rounded-3">
        <h6 className="mb-2">🎁 Your Reward</h6>
        <p className="mb-0">
          After successfully keeping your promotion live for 24 hours and
          reaching 10 unique clicks, you'll automatically be eligible to claim:
          <br />
          <strong>
            ✓ 1 month Free Subscription to our Premium Business Plan
          </strong>
        </p>
      </Card>

      <Card className="bg-light p-3 mb-4 rounded-3">
        <h6 className="mb-2">📋 Rules & Requirements</h6>
        <ul className="mb-0 ps-3 text-muted">
          <li>Posts must include the provided caption and your unique URL.</li>
          <li>Content must remain live and unchanged for at least 24 hours.</li>
          <li>The post must be public and viewable by our tracking system.</li>
          <li>You need at least 10 unique clicks to be eligible for reward.</li>
          <li>You can only have one active promotion per campaign.</li>
        </ul>
      </Card>

      <div className="text-end">
        <Button
          variant="dark"
          size="sm"
          className="text-capitalize"
          onClick={() => setActiveTab("promotions")}
        >
          🎯 View My Current Promotion
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-4 gap-2">
        <FaGift size={30} className="text-primary animate-bounce" />
        <h3 className="m-0 text-gradient fw-bold">Promotional Offers</h3>
      </div>

      <div className="mb-3 d-flex gap-2 flex-wrap">
        <Button
          variant={activeTab === "current" ? "dark" : "outline-dark"}
          size="sm"
          className="text-capitalize px-4"
          onClick={() => setActiveTab("current")}
        >
          Current Offers
        </Button>
        <Button
          variant={activeTab === "promotions" ? "dark" : "outline-dark"}
          size="sm"
          className="text-capitalize px-4"
          onClick={() => setActiveTab("promotions")}
        >
          My Promotions
        </Button>
        <Button
          variant={activeTab === "how" ? "dark" : "outline-dark"}
          size="sm"
          className="text-capitalize px-4"
          onClick={() => setActiveTab("how")}
        >
          How it Works
        </Button>
      </div>

      {activeTab === "current" && renderCurrentOffer()}
      {activeTab === "promotions" && renderMyPromotions()}
      {activeTab === "how" && renderHowItWorks()}

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
          bg="success"
        >
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(to right, #605cff, #4a00e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default OffersPage;
