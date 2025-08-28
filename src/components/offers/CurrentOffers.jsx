import React from "react";
import { Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { generateUniqueUrl } from "./promotionService";

const lavishCardStyle =
  "rounded-3 shadow-sm border-0 bg-white p-4 position-relative overflow-hidden";
const lavishSectionStyle = "bg-light p-3 rounded-3 mb-3 border border-1";

const CurrentOffers = ({ campaigns, promotions, isLoading, onGenerateUrl, onShowToast, onSetError }) => {
  const hasExistingPromotion = (campaignId) => {
    return promotions.some(
      (promo) => promo.campaign_id === campaignId && promo.status === true
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    onShowToast("Copied to clipboard!");
  };

  const handleGenerateUrl = async (campaignId) => {
    const url = await generateUniqueUrl(campaignId, onSetError, () => {});
    if (url) {
      copyToClipboard(url);
      onGenerateUrl();
    }
  };

  return (
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
                      onClick={() => handleGenerateUrl(campaign.id)}
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
};

export default CurrentOffers;