import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const LeftPanel = ({
  data,
  selected,
  setSelected,
  searchTerm,
  setSearchTerm,
  setShowFilters,
  countryCode,
  stateCode,
  selectedCity,
  niche,
  contentType,
  platform,
  engagementRate,
  followers,
  selectedLang,
  formatFollowers,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (or set this false when API fetch completes)
    if (data && data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div
      className="p-3 col-12 col-lg-4"
      style={{
        backgroundColor: "var(--primary-color)",
        borderRight: "1px solid #e0e0e0",
        height: "calc(90vh)",
        borderRadius: "16px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-semibold fs-4" style={{ color: "#1a237e" }}>
          Influencers
        </h6>
        <button
          className="btn btn-sm"
          style={{
            background: "linear-gradient(135deg, rgb(87, 52, 226), #1976d2)",
            border: "none",
            color: "#fff",
            borderRadius: "50px",
            padding: "0.6rem 1.5rem",
            fontWeight: 600,
            fontSize: "0.95rem",
            boxShadow: "0 4px 14px rgba(125, 104, 195, 0.25)",
          }}
          onClick={() => setShowFilters(true)}
        >
          Filters
        </button>
      </div>

      {/* Selected Filters Badges */}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {countryCode && (
          <span className="badge bg-primary text-white">
            Country: {countryCode}
          </span>
        )}
        {stateCode && (
          <span className="badge bg-primary text-white">
            State: {stateCode}
          </span>
        )}
        {selectedCity && (
          <span className="badge bg-primary text-white">
            City: {selectedCity}
          </span>
        )}
        {niche && (
          <span className="badge bg-success text-white">Niche: {niche}</span>
        )}
        {contentType && (
          <span className="badge bg-info text-dark">
            Content: {contentType}
          </span>
        )}
        {platform && (
          <span className="badge bg-warning text-dark">
            Platform: {platform}
          </span>
        )}
        {engagementRate > 0 && (
          <span className="badge bg-dark text-white">
            Engagement: {engagementRate}%
          </span>
        )}
        {followers > 0 && (
          <span className="badge bg-secondary text-white">
            Followers: {formatFollowers(followers)}
          </span>
        )}
        {selectedLang && (
          <span className="badge bg-light text-dark border">
            Lang: {selectedLang}
          </span>
        )}
      </div>

      <input
        className="form-control mb-3"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        style={{
          borderRadius: "12px",
          fontSize: "0.85rem",
          padding: "8px 12px",
          border: "1px solid #dcdcdc",
        }}
      />

      <div
        className="overflow-auto"
        style={{
          height: "calc(90vh - 120px)",
          backgroundColor: "var(--primary-color)",
        }}
      >
        {loading
          ? // Skeleton loading
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="d-flex align-items-start p-2 mb-2 rounded"
                style={{
                  backgroundColor: "#fff",
                  minHeight: "70px",
                  opacity: 0.7,
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#ddd",
                    borderRadius: "50%",
                  }}
                />
                <div className="ms-3 w-100">
                  <div
                    style={{
                      height: "12px",
                      backgroundColor: "#ddd",
                      width: "50%",
                      borderRadius: "4px",
                      marginBottom: "6px",
                    }}
                  />
                  <div
                    style={{
                      height: "10px",
                      backgroundColor: "#eee",
                      width: "30%",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            ))
          : data
              .filter((inf) => inf.username.toLowerCase().includes(searchTerm))
              .map((inf, index) => (
                <div
                  key={inf.id}
                  className="d-flex align-items-start p-2 mb-2 rounded transition-all"
                  onClick={() => setSelected(inf)}
                  style={{
                    backgroundColor: "#fff",
                    cursor: index >= 5 ? "default" : "pointer",
                    pointerEvents: index >= 5 ? "none" : "auto",
                    opacity: index >= 5 ? 0.5 : 1,
                    minHeight: "70px",
                    filter: index >= 5 ? "blur(2px)" : "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    if (index < 5) {
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.05)";
                      e.currentTarget.style.backgroundColor = "#e2e8f0";
                      e.currentTarget.style.transform = "scale(1.015)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index < 5) {
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  <img
                    src={inf.profilePic}
                    alt="profile"
                    width="50"
                    height="50"
                    className="rounded-circle border"
                    style={{
                      borderColor: "#FFD700",
                      borderWidth: "2px",
                      borderStyle: "solid",
                      marginTop: "4px",
                    }}
                  />
                  <div className="ms-3 w-100">
                    <div
                      className="fw-medium text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {inf.username}
                    </div>
                    <div
                      className="text-muted mb-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {inf.category}
                    </div>
                    <div className="d-flex flex-wrap gap-3 small text-secondary">
                      <span className="d-flex align-items-center gap-1">
                        <FaInstagram style={{ color: "#E1306C" }} size={14} />{" "}
                        <span>
                          {formatFollowers(
                            inf.data?.instagram?.total_followers
                          )}
                        </span>
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaFacebook style={{ color: "#1877F2" }} size={14} />{" "}
                        <span>
                          {formatFollowers(inf.data?.facebook?.total_followers)}
                        </span>
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaTwitter style={{ color: "#1DA1F2" }} size={14} />{" "}
                        <span>
                          {formatFollowers(inf.data?.twitter?.total_followers)}
                        </span>
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaYoutube style={{ color: "#FF0000" }} size={14} />{" "}
                        <span>
                          {formatFollowers(inf.data?.youtube?.total_followers)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </div>
  );
};

export default LeftPanel;
