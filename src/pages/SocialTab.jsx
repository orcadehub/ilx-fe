import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Twitter } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";
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
  const [editing, setEditing] = useState(null);
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
      youtube: `${baseURL}/auth/youtube?userId=${userId}`,
      twitter: `${baseURL}/auth/twitter?userId=${userId}`,
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
        className="d-flex align-items-center py-3 border-bottom"
        style={{ borderColor: "rgba(0, 0, 0, 0.05)" }}
      >
        {profilePic && (
          <img
            src={profilePic}
            alt={`${platform} profile`}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              marginRight: 10,
              objectFit: "cover",
            }}
          />
        )}
        {icons[platform]}
        <div className="d-flex flex-grow-1 align-items-center">
          <span className={username ? "" : "text-muted"} style={{ fontSize: "0.9rem" }}>
            {isConnected ? `Connected to ${username || "Unknown"}` : "Not connected"}
          </span>
          <button
            className={`btn btn-sm ms-auto ${
              isConnected ? "btn-danger" : "btn-success"
            }`}
            onClick={() =>
              isConnected ? handleDisconnect(platform) : handleConnectClick(platform)
            }
            onMouseEnter={() => setHovered(platform)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: "6px",
              padding: "6px 12px",
              boxShadow: hovered === platform ? "0 4px 15px rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            <i
              className={`bi ${isConnected ? "bi-unplug" : "bi-plug"} ${
                hovered === platform ? "text-white" : ""
              }`}
            />
            <span className="ms-1">{isConnected ? "Disconnect" : "Connect"}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <div
        className="card border-0 shadow-sm rounded-4"
        style={{
          background: "#ffffffdd",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="card-body">
          <h2 className="h5 mb-3 d-flex align-items-center text-dark fw-bold">
            <i className="bi bi-share me-2 text-warning"></i> Social Media Profiles
          </h2>
          <p className="text-muted small mb-4">
            Connect your social media accounts to enhance your profile visibility.
          </p>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Fetching social connections...</p>
            </div>
          ) : (
            ["instagram", "facebook", "youtube", "twitter"].map(renderRow)
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialTab;