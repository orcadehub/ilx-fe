import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Collapse } from "antd";

const { Panel } = Collapse;

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
  const [accordionOpen, setAccordionOpen] = useState(['1']); // Default to open

  // Calculate match percentage for each influencer
  const getFilteredData = () => {
    return data.map((inf) => {
      let score = 0;
      let totalCriteria = 0;
      
      // Search term matching
      if (searchTerm) {
        totalCriteria++;
        if (inf.name?.toLowerCase().includes(searchTerm) || 
            inf.username?.toLowerCase().includes(searchTerm) ||
            inf.category?.toLowerCase().includes(searchTerm)) {
          score++;
        }
      }
      
      // Location matching
      if (selectedCity) {
        totalCriteria++;
        if (inf.location_city === selectedCity) score++;
      }
      if (stateCode) {
        totalCriteria++;
        if (inf.location_state === stateCode) score++;
      }
      
      // Niche matching
      if (niche) {
        totalCriteria++;
        if (inf.category === niche) score++;
      }
      
      // Platform matching
      if (platform) {
        totalCriteria++;
        if ((platform === 'Instagram' && inf.data?.instagram?.total_followers > 0) ||
            (platform === 'Facebook' && inf.data?.facebook?.total_followers > 0) ||
            (platform === 'YouTube' && inf.data?.youtube?.total_followers > 0) ||
            (platform === 'Twitter' && inf.data?.twitter?.total_followers > 0)) {
          score++;
        }
      }
      
      // Engagement rate matching
      if (engagementRate > 0) {
        totalCriteria++;
        if (inf.engagement_rate >= engagementRate) score++;
      }
      
      // Followers matching
      if (followers > 0) {
        totalCriteria++;
        const totalFollowers = (inf.data?.instagram?.total_followers || 0) +
                              (inf.data?.facebook?.total_followers || 0) +
                              (inf.data?.youtube?.total_followers || 0) +
                              (inf.data?.twitter?.total_followers || 0);
        if (totalFollowers >= followers) score++;
      }
      
      // Calculate match percentage
      const matchPercentage = totalCriteria > 0 ? (score / totalCriteria) * 100 : 100;
      
      return { ...inf, matchPercentage };
    })
    .filter(inf => inf.matchPercentage > 0) // Show only influencers with some match
    .sort((a, b) => b.matchPercentage - a.matchPercentage); // Sort by match percentage descending
  };

  const filteredData = getFilteredData();

  useEffect(() => {
    // Simulate loading delay (or set this false when API fetch completes)
    if (data && data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className=" xl:p-3 !pb-0 col-12 col-lg-4 xl:h-[calc(100vh-180px)] overflow-hidden rounded-xl"
    // style={{
    // backgroundColor: "var(--bg)",
    // borderRight: "1px solid #e0e0e0",
    // height: "calc(90vh-100px)",
    // borderRadius: "16px",
    // }}
    >
      {/* <div className="d-flex justify-content-between align-items-center mb-3 ">
        <h6 className="fw-semibold fs-4" style={{ color: "var(--primary)" }}>
          Influencers
        </h6>
        <button
          className="btn btn-sm text-white rounded-pill text-14 !bg-[var(--primary)] px-3 shadow-lg"
          // style={{
            // background: "linear-gradient(135deg, rgb(87, 52, 226), #1976d2)",
            // border: "none",
            // color: "#fff",
            // borderRadius: "50px",
            // padding: "0.6rem 1.5rem",
            // fontWeight: 600,
            // fontSize: "0.95rem",
            // boxShadow: "0 4px 14px rgba(125, 104, 195, 0.25)",
          // }}
          onClick={() => setShowFilters(true)}
        >
          Filters
        </button>
      </div> */}

      {/* Selected Filters Badges */}
      {/* <div className="d-flex flex-wrap gap-2 mb-3">
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
      </div> */}

      <div className="!border !border-[var(--border)] p-3 rounded-xl  md:!h-[100%] overflow-hidden bg-[var(--card)]">
        <input
          className="form-control mb-3 !border !border-[var(--border)] placeholder:!text-gray-500"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          style={{
            borderRadius: "12px",
            fontSize: "0.85rem",
            padding: "8px 12px",
            // border: "1px solid #dcdcdc",
          }}
        />

        <div
          className="overflow-auto xl:!h-[calc(100vh-260px)] "
        // style={{
        //   height: "calc(90vh - 120px)",
        //   backgroundColor: "var(--bg)",
        // }}
        >
          <style>{`
          .ant-collapse {
            background: var(--card) !important;
            border: 1px solid var(--border) !important;
          }
          .ant-collapse > .ant-collapse-item {
            border-bottom: 1px solid var(--border) !important;
          }
          .ant-collapse > .ant-collapse-item:last-child {
            border-bottom: none !important;
          }
          .ant-collapse-header {
            background: var(--card) !important;
            color: var(--text) !important;
            border-radius: 8px !important;
          }
          .ant-collapse-content {
            background: var(--card) !important;
            border-top: 1px solid var(--border) !important;
          }
          .ant-collapse-content-box {
            padding: 0 !important;
          }
          @media (min-width: 1080px) {
            .mobile-accordion {
              display: none !important;
            }
          }
          @media (max-width: 1080px) {
            .desktop-cards {
              display: none !important;
            }
          }
        `}</style>

          {loading ? (
            // Skeleton loading
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
          ) : (
            <>
              {/* Mobile Accordion View */}
              <div className="mobile-accordion">
                <Collapse
                  activeKey={accordionOpen}
                  onChange={setAccordionOpen}
                  className="!bg-[var(--card)] !border-[var(--border)]"
                  expandIconPosition="right"
                >
                  <Panel
                    header={
                      <span className="font-medium text-[var(--text)]">
                        Influencers ({filteredData.length}) - Sorted by Match %
                      </span>
                    }
                    key="1"
                    className="!bg-[var(--card)]"
                  >
                    <div className="space-y-2">
                      {filteredData
                        .map((inf, index) => (
                          <div
                            key={inf.id}
                            className="d-flex align-items-start p-2 mb-2 rounded transition-all hover:!bg-[var(--hover2)]"
                            onClick={() => setSelected(inf)}
                            style={{
                              backgroundColor: "var(--card)",
                              cursor: index >= 5 ? "default" : "pointer",
                              pointerEvents: index >= 5 ? "none" : "auto",
                              opacity: index >= 5 ? 0.5 : 1,
                              minHeight: "70px",
                              filter: index >= 5 ? "blur(2px)" : "none",
                              transition: "all 0.2s ease-in-out",
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
                                className="fw-medium text-[var(--text)]"
                                style={{ fontSize: "0.9rem" }}
                              >
                                {inf.username}
                              </div>
                              <div
                                className="!text-gray-500 mb-1"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {inf.category}
                              </div>
                              <div className="d-flex !justify-between flex-wrap gap-3 text-[var(--text)]">
                                <span className="d-flex align-items-center gap-1 text-[10px]">
                                  <FaInstagram style={{ color: "#E1306C" }} size={14} />{" "}
                                  <span>
                                    {inf.data?.instagram?.total_followers !== undefined && inf.data?.instagram?.total_followers !== null
                                      ? formatFollowers(inf.data.instagram.total_followers)
                                      : "N/A"}
                                  </span>
                                </span>
                                <span className="d-flex align-items-center gap-1 text-[10px]">
                                  <FaFacebook style={{ color: "#1877F2" }} size={14} />{" "}
                                  <span>
                                    {inf.data?.facebook?.total_followers !== undefined && inf.data?.facebook?.total_followers !== null
                                      ? formatFollowers(inf.data.facebook.total_followers)
                                      : "N/A"}
                                  </span>
                                </span>
                                <span className="d-flex align-items-center gap-1 text-[10px]">
                                  <FaTwitter style={{ color: "#1DA1F2" }} size={14} />{" "}
                                  <span>
                                    {inf.data?.twitter?.total_followers !== undefined && inf.data?.twitter?.total_followers !== null
                                      ? formatFollowers(inf.data.twitter.total_followers)
                                      : "N/A"}
                                  </span>
                                </span>
                                <span className="d-flex align-items-center gap-1 text-[10px]">
                                  <FaYoutube style={{ color: "#FF0000" }} size={14} />{" "}
                                  <span>
                                    {inf.data?.youtube?.total_followers !== undefined && inf.data?.youtube?.total_followers !== null
                                      ? formatFollowers(inf.data.youtube.total_followers)
                                      : "N/A"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Panel>
                </Collapse>
              </div>

              {/* Desktop Cards View */}
              <div className="desktop-cards">
                {filteredData
                  .map((inf, index) => (
                    <div
                      key={inf.id}
                      className="d-flex align-items-start p-2 mb-2 rounded transition-all hover:!bg-[var(--hover2)]"
                      onClick={() => setSelected(inf)}
                      style={{
                        backgroundColor: "var(--card)",
                        cursor: index >= 5 ? "default" : "pointer",
                        pointerEvents: index >= 5 ? "none" : "auto",
                        opacity: index >= 5 ? 0.5 : 1,
                        minHeight: "70px",
                        filter: index >= 5 ? "blur(2px)" : "none",
                        transition: "all 0.2s ease-in-out",
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
                          className="fw-medium text-[var(--text)]"
                          style={{ fontSize: "0.9rem" }}
                        >
                          {inf.username}
                        </div>
                        <div
                          className="!text-gray-500 mb-1"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {inf.category}
                        </div>
                        <div className="d-flex flex-wrap justify-between gap-3 text-[var(--text)]">
                          <span className="d-flex align-items-center gap-1 text-[10px]">
                            <FaInstagram style={{ color: "#E1306C" }} size={14} />{" "}
                            <span>
                              {inf.data?.instagram?.total_followers !== undefined && inf.data?.instagram?.total_followers !== null
                                ? formatFollowers(inf.data.instagram.total_followers)
                                : "N/A"}
                            </span>
                          </span>
                          <span className="d-flex align-items-center gap-1 text-[10px]">
                            <FaFacebook style={{ color: "#1877F2" }} size={14} />{" "}
                            <span>
                              {inf.data?.facebook?.total_followers !== undefined && inf.data?.facebook?.total_followers !== null
                                ? formatFollowers(inf.data.facebook.total_followers)
                                : "N/A"}
                            </span>
                          </span>
                          <span className="d-flex align-items-center gap-1 text-[10px]">
                            <FaTwitter style={{ color: "#1DA1F2" }} size={14} />{" "}
                            <span>
                              {inf.data?.twitter?.total_followers !== undefined && inf.data?.twitter?.total_followers !== null
                                ? formatFollowers(inf.data.twitter.total_followers)
                                : "N/A"}
                            </span>
                          </span>
                          <span className="d-flex align-items-center gap-1 text-[10px]">
                            <FaYoutube style={{ color: "#FF0000" }} size={14} />{" "}
                            <span>
                              {inf.data?.youtube?.total_followers !== undefined && inf.data?.youtube?.total_followers !== null
                                ? formatFollowers(inf.data.youtube.total_followers)
                                : "N/A"}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default LeftPanel;
