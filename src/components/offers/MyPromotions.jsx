import React from "react";
import { FaGift, FaRegCopy } from "react-icons/fa";
import {
  Card,
  Row,
  Col,
  ProgressBar,
  Badge,
  OverlayTrigger,
  Tooltip,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { claimReward } from "./promotionService";

const lavishCardStyle =
  "rounded-3 shadow-sm border-0 p-4 position-relative overflow-hidden";

const MyPromotions = ({
  promotions,
  campaigns,
  isLoading,
  error,
  success,
  onFetchPromotions,
  onSetError,
  onSetSuccess,
}) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const isPromotionExpired = (promo, campaign) => {
    if (!campaign) return false;

    const createdDate = new Date(promo.created_at);
    const days = parseInt(campaign.period);
    const expirationDate = new Date(createdDate);
    expirationDate.setDate(expirationDate.getDate() + days);

    return new Date() > expirationDate;
  };

  const getCampaignById = (campaignId) => {
    return campaigns.find((campaign) => campaign.id === campaignId);
  };

  const handleClaimReward = async (promotionId) => {
    const success = await claimReward(
      promotionId,
      onSetSuccess,
      onSetError,
      () => {}
    );
    if (success) {
      onFetchPromotions();
    }
  };

  return (
    <div className="mt-4">
      {error && (
        <Alert variant="danger" onClose={() => onSetError("")} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => onSetSuccess("")} dismissible>
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
          <Button variant="primary" onClick={() => onSetActiveTab("current")}>
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
                        onClick={() => handleClaimReward(promo.id)}
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
                        <Badge
                          bg=""
                          className="px-2 py-1 border border-warning text-danger"
                        >
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
};

export default MyPromotions;