import React, { useEffect, useState } from "react";
import { Instagram, Facebook, Youtube, Twitter } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner"; // Optional: if you're using Bootstrap

const icons = {
  instagram: <Instagram className="text-danger me-2" size={22} />,
  facebook: <Facebook className="text-primary me-2" size={22} />,
  youtube: <Youtube className="text-danger me-2" size={22} />,
  twitter: <Twitter className="text-info me-2" size={22} />,
};

const SocialTab = () => {
  const [userType, setUserType] = useState("");
  const [editing, setEditing] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState({});
  const [loading, setLoading] = useState(true);
  const [socialProfiles, setSocialProfiles] = useState({
    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setUserType(user?.role || "influencer");

    const fetchStatus = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/status/${user?.id}`);
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

  const handleChange = (e, platform) => {
    setSocialProfiles((prev) => ({ ...prev, [platform]: e.target.value }));
  };

  const handleConnectClick = (platform) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const oauthUrlMap = {
      facebook: `http://localhost:4000/api/auth/facebook?userId=${userId}`,
      instagram: `http://localhost:4000/api/auth/instagram?userId=${userId}`,
      youtube: `http://localhost:4000/auth/youtube?userId=${userId}`,
      twitter: `http://localhost:4000/auth/twitter?userId=${userId}`,
    };

    const redirectUrl = oauthUrlMap[platform];
    if (redirectUrl) window.open(redirectUrl, "_self");
  };

  const handleDisconnect = async (platform) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      await fetch("http://localhost:4000/api/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id, platform }),
      });

      setConnectedPlatforms((prev) => ({
        ...prev,
        [platform]: {
          connected: false,
          username: null,
          profile_pic: null,
        },
      }));

      setSocialProfiles((prev) => ({ ...prev, [platform]: "" }));
    } catch (err) {
      console.error("Error disconnecting:", err);
    }
  };

  const renderRow = (platform) => {
    const isEditing = editing === platform;
    const profile = connectedPlatforms[platform] || {};
    const isConnected = profile.connected;
    const username = profile.username;
    const profilePic = profile.profile_pic;
    const isInfluencer = userType === "influencer";

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
        {isEditing ? (
          <div className="d-flex flex-grow-1 gap-2">
            <input
              type="url"
              className="form-control form-control-sm"
              value={socialProfiles[platform]}
              onChange={(e) => handleChange(e, platform)}
              placeholder={`https://${platform}.com/username`}
              style={{
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "6px",
                padding: "8px 12px",
              }}
            />
            <button
              className="btn btn-sm btn-success"
              onClick={() => setEditing(null)}
            >
              <i className="bi bi-check" />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setEditing(null)}
            >
              <i className="bi bi-x" />
            </button>
          </div>
        ) : (
          <div className="d-flex flex-grow-1 align-items-center">
            <span className={username ? "" : "text-muted"} style={{ fontSize: "0.9rem" }}>
              {isConnected
                ? `Connected to ${username || "Unknown"}`
                : "Not connected"}
            </span>
            <button
              className="btn btn-sm ms-auto"
              onClick={() =>
                isInfluencer
                  ? isConnected
                    ? handleDisconnect(platform)
                    : handleConnectClick(platform)
                  : setEditing(platform)
              }
              onMouseEnter={() => setHovered(platform)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background:
                  hovered === platform
                    ? "linear-gradient(135deg, #dc3545, #c82333)"
                    : "transparent",
                color: hovered === platform ? "white" : "#d4af37",
                border: `1px solid ${
                  hovered === platform ? "#dc3545" : "#d4af37"
                }`,
                borderRadius: "6px",
                padding: "6px 12px",
                boxShadow:
                  hovered === platform
                    ? "0 4px 15px rgba(220, 53, 69, 0.3)"
                    : "none",
              }}
            >
              <i
                className={`bi ${
                  isInfluencer
                    ? isConnected
                      ? "bi-unplug"
                      : "bi-plug"
                    : "bi-pencil"
                } ${hovered === platform ? "text-white" : ""}`}
              />
              <span className="ms-1">
                {isInfluencer
                  ? isConnected
                    ? "Disconnect"
                    : "Connect"
                  : "Edit"}
              </span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container p-4">
      <div
        className="card shadow-sm"
        style={{
          border: "none",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="card-body">
          <h2
            className="h5 mb-3 d-flex align-items-center"
            style={{ color: "#2c3e50", fontWeight: "600" }}
          >
            <i className="bi bi-share me-2" style={{ color: "#9c7c5e" }}></i>{" "}
            Social Media Profiles
          </h2>
          <p className="text-muted small mb-4">
            Connect your social media accounts to enhance your profile
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
