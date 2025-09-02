import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Twitter } from "react-bootstrap-icons";
import { Container, Card, Spinner, Button } from "react-bootstrap";
import config from "../config";

const icons = {
  instagram: <Instagram className="text-danger me-2" size={22} />,
  facebook: <Facebook className="text-primary me-2" size={22} />,
  youtube: <Youtube className="text-danger me-2" size={22} />,
  twitter: <Twitter className="text-info me-2" size={22} />,
};

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const SocialTab = () => {
  const [hovered, setHovered] = useState(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${baseURL}/api/connect/status/${user?.email}`);
        const data = await res.json();
        setConnectedPlatforms(data);
      } catch (err) {
        console.error("Failed to fetch social status", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleConnectClick = (platform) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.email;

    const oauthUrlMap = {
      facebook: `${baseURL}/api/connect/auth/facebook?userId=${userId}`,
      instagram: `${baseURL}/api/auth/instagram?userId=${userId}`,
      youtube: `${baseURL}/api/connect/auth/google?userId=${userId}`,
      twitter: `${baseURL}/api/auth/twitter?userId=${userId}`,
    };

    const redirectUrl = oauthUrlMap[platform];
    if (redirectUrl) window.open(redirectUrl, "_self");
  };

  const handleDisconnect = async (platform) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await fetch(`${baseURL}/api/connect/disconnect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.email, platform }),
      });

      setConnectedPlatforms((prev) => ({
        ...prev,
        [platform]: {
          connected: false,
          username: null,
          profile_pic: null,
        },
      }));
    } catch (err) {
      console.error("Error disconnecting:", err);
    }
  };

  const renderRow = (platform) => {
    const profile = connectedPlatforms[platform] || {};
    const isConnected = profile.connected;
    const username = profile.username;
    const profilePic = profile.profile_pic;

    return (
      <div
        key={platform}
        className="d-flex align-items-center justify-content-between py-3 border-bottom"
        style={{ borderColor: "rgba(0, 0, 0, 0.05)" }}
      >
        {/* Left side: Icon + Info */}
        <div className="d-flex align-items-center">
          {profilePic ? (
            <img
              src={profilePic}
              alt={`${platform} profile`}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                marginRight: 10,
                objectFit: "cover",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            />
          ) : (
            icons[platform]
          )}
          <span
            className={`fw-semibold ${isConnected ? "text-dark" : "text-muted"}`}
            style={{ fontSize: "0.95rem" }}
          >
            {isConnected
              ? `${username || "Connected Account"}`
              : "Not connected"}
          </span>
        </div>

        {/* Right side: Action Button */}
        <Button
          size="sm"
          variant={isConnected ? "outline-danger" : "success"}
          className="px-3 rounded-3 fw-semibold shadow-sm"
          onClick={() =>
            isConnected ? handleDisconnect(platform) : handleConnectClick(platform)
          }
          onMouseEnter={() => setHovered(platform)}
          onMouseLeave={() => setHovered(null)}
          style={{
            transition: "all 0.2s ease-in-out",
            transform: hovered === platform ? "scale(1.05)" : "scale(1)",
          }}
        >
          <i className={`bi ${isConnected ? "bi-unplug" : "bi-plug"} me-1`} />
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    );
  };

  return (
    <Container fluid className="px-3 px-md-5 py-3 w-100">
      <h2 className="h5 fw-bold text-dark mb-4">
        <i className="bi bi-share me-2 text-warning"></i>
        Social Media Profiles
      </h2>
      <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
        Connect your social accounts to enhance your profile and enable extra features.
      </p>

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Fetching social connections...</p>
            </div>
          ) : (
            ["instagram", "facebook", "youtube", "twitter"].map(renderRow)
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SocialTab;
