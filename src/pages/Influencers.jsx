import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import { Offcanvas, Dropdown } from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import ISO6391 from "iso-639-1";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaEye,
  FaShare,
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, Row, Col } from "react-bootstrap";
import "./Influencers.css";
import { useNavigate } from "react-router-dom";
import getInfluencersData from "../components/InfluencersData";

function Influencers() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadInfluencers = async () => {
      const InfluencersData = await getInfluencersData();
      setData(InfluencersData);
      // console.log(InfluencersData);
      setSelected(InfluencersData[0]); // Set selected after data is available
    };

    loadInfluencers();
  }, []);

  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [engagementRate, setEngagementRate] = useState(0);
  const [selectedService, setSelectedService] = useState("Platform Based");
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(true);
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [selectedCombos, setSelectedCombos] = useState([]);
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [niche, setNiche] = useState("");
  const [contentType, setContentType] = useState("");
  const [platform, setPlatform] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [hashtags, setHashtags] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [audienceCountry, setAudienceCountry] = useState("");

  // Store all selected filters
  const getSelectedFilters = () => ({
    country: countryCode,
    state: stateCode,
    city: selectedCity,
    niche,
    contentType,
    engagementRate: parseInt(engagementRate),
    followers: parseInt(followers),
    platform,
    priceRange,
    hashtags: hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag),
    age,
    gender,
    audienceCountry,
    language: selectedLang,
  });

  // Reset all filters
  const resetFilters = () => {
    setCountryCode("");
    setStateCode("");
    setSelectedCity("");
    setNiche("");
    setContentType("");
    setEngagementRate(0);
    setFollowers(0);
    setPlatform("");
    setPriceRange({ min: 0, max: 5000 });
    setHashtags("");
    setAge("");
    setGender("");
    setAudienceCountry("");
    setSelectedLang("");
  };

  // Handle Update button click
  const handleUpdate = () => {
    console.log("Selected Filters:", getSelectedFilters());
    setShowFilters(false);
  };

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (countryCode) {
      setStates(State.getStatesOfCountry(countryCode));
      setStateCode("");
      setCities([]);
      setSelectedCity("");
    }
  }, [countryCode]);

  useEffect(() => {
    if (countryCode && stateCode) {
      setCities(City.getCitiesOfState(countryCode, stateCode));
      setSelectedCity("");
    }
  }, [stateCode]);

  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");

  useEffect(() => {
    const allNames = ISO6391.getAllNames(); // English names
    const allCodes = ISO6391.getAllCodes(); // ISO codes
    const data = allCodes.map((code, i) => ({
      code,
      name: allNames[i],
    }));
    setLanguages(data);
  }, []);

  const [followers, setFollowers] = useState(0);

  const formatFollowers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num;
  };

  const handlePlatformChange = (service) => {
    setSelectedPlatforms((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleComboChange = (combo) => {
    setSelectedCombos((prev) =>
      prev.includes(combo)
        ? prev.filter((item) => item !== combo)
        : [...prev, combo]
    );
  };

  const comboPackages = [
    {
      name: "Starter Combo",
      price: "₹499",
      services: ["Instagram Post", "Facebook Story"],
    },
    {
      name: "Growth Combo",
      price: "₹999",
      services: [
        "Instagram Post + Story",
        "Facebook Post",
        "YouTube Community Post",
      ],
    },
  ];

  const toggleWishlist = () => {
    const newState = !isWishlisted;
    setIsWishlisted(newState);
    toast(newState ? "❤️ Added to Wishlist" : "❌ Removed from Wishlist");
  };

  return (
    <div className="d-flex flex-column flex-md-row h-100">
      {/* Left Panel */}
      <div
        className="p-3 col-12 col-lg-4"
        style={{
          background: "linear-gradient(to bottom, #fefefe, #f4f4f7)",
          borderRight: "1px solid #e0e0e0",
          height: "calc(90vh)", // Reduced height
          borderRadius: "16px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-semibold fs-4">Influencers</h6>
          <button
            className="btn btn-sm "
            style={{
              background: "linear-gradient(135deg,rgb(87, 52, 226), #7d68c3)",
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
          {/* {priceMin && (
            <span className="badge bg-danger text-white">
              Price: ₹{priceMin} - ₹{priceMax || "?"}
            </span>
          )} */}
          {selectedLang && (
            <span className="badge bg-light text-dark border">
              Lang: {selectedLang}
            </span>
          )}
        </div>

        <input
          className="form-control mb-3"
          placeholder="Search..."
          style={{
            borderRadius: "12px",
            fontSize: "0.85rem",
            padding: "8px 12px",
            border: "1px solid #dcdcdc",
          }}
        />

        <div className="overflow-auto" style={{ height: "calc(90vh - 120px)" }}>
          {data.map((inf, index) => (
            <div
              key={inf.id}
              className="d-flex align-items-start p-2"
              onClick={() => setSelected(inf)}
              style={{
                background: "#fff",
                cursor: index >= 5 ? "default" : "pointer",
                pointerEvents: index >= 5 ? "none" : "auto",
                opacity: index >= 5 ? 0.5 : 1,
                minHeight: "70px",
                transition: "0.2s",
                filter: index >= 5 ? "blur(2px)" : "none",
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
                    <span>{inf.stats.instagram}</span>
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <FaFacebook style={{ color: "#1877F2" }} size={14} />{" "}
                    <span>{inf.stats.facebook}</span>
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <FaTwitter style={{ color: "#1DA1F2" }} size={14} />{" "}
                    <span>{inf.stats.twitter}</span>
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <FaYoutube style={{ color: "#FF0000" }} size={14} />{" "}
                    <span>{inf.stats.youtube}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="right-panel p-4 overflow-auto"
        style={{
          borderRadius: "1rem",
          background: "#fff",
          minHeight: "100%",
        }}
      >
        {selected && (
          <>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0">Profile</h4>
              <button className="btn btn-primary">Book</button>
            </div>

            {/* Profile Card */}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 shadow-sm p-3 bg-light rounded-4 mb-4">
              <div className="d-flex align-items-center gap-3 flex-grow-1">
                <img
                  src={selected.profilePic}
                  className="rounded border border-1"
                  width="70"
                  height="70"
                  alt="Profile"
                />
                <div>
                  <h5 className="fw-semibold mb-1 d-flex align-items-center gap-3">
                    {selected.name}
                    <FaHeart
                      style={{
                        cursor: "pointer",
                        color: isWishlisted ? "#dc3545" : "#b6b6b6",
                        transition: "all 0.2s ease",
                      }}
                      onClick={toggleWishlist}
                    />

                    <FaComment
                      className="text-primary cursor-pointer"
                      title="Chat"
                      onClick={() => navigate(`/dashboard/chats/${selected.id}`)}
                    />
                    <FaShareAlt
                      className="text-secondary cursor-pointer"
                      title="Share"
                    />
                  </h5>
                  <div className="text-muted small">@{selected.username}</div>
                </div>
              </div>

              <div className="d-flex gap-4 flex-wrap text-center">
                <div>
                  <FaInstagram color="#E1306C" size={26} />
                  <div className="fw-bold">{selected.stats.instagram}</div>
                </div>
                <div>
                  <FaFacebook color="#1877F2" size={26} />
                  <div className="fw-bold">{selected.stats.facebook}</div>
                </div>
                <div>
                  <FaYoutube color="#FF0000" size={26} />
                  <div className="fw-bold">{selected.stats.youtube}</div>
                </div>
                <div>
                  <FaTwitter color="#1DA1F2" size={26} />
                  <div className="fw-bold">{selected.stats.twitter}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="d-flex mb-4 w-100">
              {["services", "prices", "data"].map((tab) => (
                <button
                  key={tab}
                  className={`btn w-100 text-center fw-semibold py-2 shadow-sm border-0 ${
                    activeTab === tab
                      ? " border-bottom border-4 border-primary"
                      : "bg-light text-dark"
                  }`}
                  style={{
                    width: "33.33%",
                    borderBottom:
                      activeTab === tab
                        ? "4px solid #0d6efd"
                        : "4px solid transparent",
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Services */}
            {activeTab === "services" && (
              <Row className="g-4">
                {data
                  .flatMap((influencer) => influencer.posts || [])
                  .map((post, index) => (
                    <Col xs={12} sm={6} md={4} key={index}>
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Img
                          variant="top"
                          src={post.image}
                          height="140"
                          className="rounded-top"
                        />
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-around small text-muted">
                            <div>
                              <FaHeart className="text-danger" />{" "}
                              {post.likes || 0}
                            </div>
                            <div>
                              <FaEye /> {post.views || 0}
                            </div>
                            <div>
                              <FaComment /> {post.comments || 0}
                            </div>
                            <div>
                              <FaShare /> {post.shares || 0}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            )}

            {/* Prices */}
            {activeTab === "prices" && (
              <div className="border rounded-4 p-4 bg-light shadow-sm">
                {/* Tab Options */}
                <div className="mb-3 d-flex gap-3">
                  {["Platform Based", "Combo Package"].map((tab) => (
                    <div className="form-check" key={tab}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="serviceTypeTab"
                        id={`tab-${tab}`}
                        checked={selectedService === tab}
                        onChange={() => {
                          setSelectedService(tab);
                          setSelectedPlatforms([]);
                          setSelectedCombos([]);
                        }}
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor={`tab-${tab}`}
                        style={{ cursor: "pointer" }}
                      >
                        {tab}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Platform Based Content */}
                {selectedService === "Platform Based" && (
                  <>
                    {Object.entries(selected.prices).map(
                      ([key, value], idx) => (
                        <div
                          key={idx}
                          className="d-flex justify-content-between align-items-center border-bottom py-2"
                        >
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`platform-${key}`}
                              checked={selectedPlatforms.includes(key)}
                              onChange={() => handlePlatformChange(key)}
                            />
                            <label
                              className="form-check-label ms-2"
                              htmlFor={`platform-${key}`}
                            >
                              {key}
                            </label>
                          </div>
                          <div className="fw-semibold">{value}</div>
                        </div>
                      )
                    )}
                  </>
                )}

                {/* Combo Package Content */}
                {selectedService === "Combo Package" && (
                  <div className="row">
                    {comboPackages.map((combo) => {
                      const isSelected = selectedCombos.includes(combo.name);
                      return (
                        <div
                          key={combo.name}
                          className="col-md-6 mb-3"
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className={`card h-100 shadow-sm ${
                              isSelected ? "border-success border-2" : "border"
                            }`}
                          >
                            <div className="card-body">
                              <div className="form-check d-flex justify-content-between align-items-center">
                                <div>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`combo-${combo.name}`}
                                    checked={isSelected}
                                    onChange={() =>
                                      handleComboChange(combo.name)
                                    }
                                  />
                                  <label
                                    htmlFor={`combo-${combo.name}`}
                                    className="form-check-label ms-2 fw-semibold"
                                  >
                                    {combo.name}
                                  </label>
                                </div>
                                <span className="fw-semibold">
                                  {combo.price}
                                </span>
                              </div>
                              <ul className="mt-3 ps-3 text-muted small mb-0">
                                {combo.services.map((service, idx) => (
                                  <li key={idx}>{service}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="text-end mt-3">
                  <button className="btn btn-success rounded-pill px-4 shadow-sm">
                    Book
                  </button>
                </div>
              </div>
            )}
            {/* Data */}
            {activeTab === "data" && (
              <Row className="g-4">
                {Object.entries(selected.data).map(([label, value]) => (
                  <Col xs={6} md={3} key={label}>
                    <div className="bg-light border rounded-4 p-3 text-center shadow-sm">
                      <div className="fs-5 fw-bold">{value}</div>
                      <div className="small text-muted">
                        {label
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </div>
                    </div>
                  </Col>
                ))}

                {/* Area Chart */}
                <Col md={6}>
                  <div className="bg-white rounded-4 p-3 shadow-sm">
                    <h6 className="fw-bold mb-3">Engagement Rate Over Time</h6>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart
                        data={[
                          { month: "Feb", rate: 52 },
                          { month: "Mar", rate: 56 },
                          { month: "Apr", rate: 59 },
                          { month: "May", rate: 62 },
                          { month: "Jun", rate: 65 },
                        ]}
                      >
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="rate"
                          stroke="#4c75f2"
                          fill="#aecbfa"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Col>

                {/* Pie Chart */}
                <Col md={6}>
                  <div className="bg-white rounded-4 p-3 shadow-sm">
                    <h6 className="fw-bold mb-3">
                      Content Performance by Platform
                    </h6>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Instagram", value: 40 },
                            { name: "Facebook", value: 30 },
                            { name: "Twitter", value: 15 },
                            { name: "YouTube", value: 15 },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          label
                        >
                          <Cell fill="#4c75f2" />
                          <Cell fill="#90ee90" />
                          <Cell fill="#ffa500" />
                          <Cell fill="#ffcccb" />
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
      </div>

      {/* Filters Offcanvas */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
        backdrop={true}
        style={{ zIndex: 1100 }}
      >
        <Offcanvas.Header className="d-flex justify-content-between align-items-center">
          <Offcanvas.Title className="fw-bold">Filters</Offcanvas.Title>
          <div>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowFilters(false)}
              aria-label="Close"
            ></button>
          </div>
        </Offcanvas.Header>

        <Offcanvas.Body className="px-4 py-3 bg-light">
          {/* Custom Styles */}
          <style>
            {`
            .form-select {
              background-color: #e6f3ff !important;
              border-color: #b3d7ff !important;
              transition: all 0.2s ease-in-out;
            }
            .form-select:hover {
              background-color: #d1e7ff !important;
              border-color: #80bfff !important;
              box-shadow: 0 0 8px rgba(0, 123, 255, 0.3) !important;
            }
            .form-select:focus {
              background-color: #e6f3ff !important;
              border-color: #80bfff !important;
              box-shadow: 0 0 8px rgba(0, 123, 255, 0.3) !important;
            }
          `}
          </style>

          {/* Location Section */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Location</label>
            <div className="mb-2">
              <select
                className="form-select border-2 shadow-sm"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <select
                className="form-select border-2 shadow-sm"
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                disabled={!countryCode}
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="form-select border-2 shadow-sm"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!stateCode}
              >
                <option value="">Select City</option>
                {cities.map((ci) => (
                  <option key={ci.name} value={ci.name}>
                    {ci.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Niche & Content Type */}
          <div className="d-flex gap-2 mb-3">
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">Niche</label>
              <select
                className="form-select border-2 shadow-sm"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              >
                <option value="">Select Niche</option>
                <option>Education</option>
                <option>Fashion</option>
                <option>Food</option>
                <option>Gaming</option>
                <option>Business</option>
              </select>
            </div>
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">
                Content Type
              </label>
              <select
                className="form-select border-2 shadow-sm"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option>Video</option>
                <option>Image</option>
                <option>Reel</option>
                <option>Short</option>
                <option>Story</option>
                <option>Live</option>
              </select>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">
              Engagement Rate:{" "}
              <span className="text-primary">{engagementRate}%</span>
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100"
              value={engagementRate}
              onChange={(e) => setEngagementRate(e.target.value)}
              style={{ direction: "ltr" }}
            />
            <div className="d-flex justify-content-between small">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Follower Count */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">
              Follower Count:{" "}
              <span className="text-primary">{formatFollowers(followers)}</span>
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="10000000"
              step="10000"
              value={followers}
              onChange={(e) => setFollowers(parseInt(e.target.value))}
            />
            <div className="d-flex justify-content-between small">
              <span>0</span>
              <span>10M</span>
            </div>
          </div>

          {/* Platform */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Platform</label>
            <select
              className="form-select border-2 shadow-sm"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option value="">Select Platform</option>
              <option>Instagram</option>
              <option>Facebook</option>
              <option>YouTube</option>
              <option>Twitter</option>
              <option>Threads</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">
              Price Range
            </label>
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control border-2 shadow-sm"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    min: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="0"
              />
              <input
                type="number"
                className="form-control border-2 shadow-sm"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: parseInt(e.target.value) || 5000,
                  })
                }
                placeholder="5000"
              />
            </div>
          </div>

          {/* Hashtags */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Hashtags</label>
            <input
              type="text"
              className="form-control border-2 shadow-sm"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="Enter hashtags"
            />
            <div className="mt-2 d-flex flex-wrap gap-2">
              {["#travel", "#food"].map((tag, idx) => (
                <span
                  key={idx}
                  className="badge bg-secondary bg-opacity-10 text-dark border border-secondary px-2 py-1"
                  style={{ fontSize: "0.85rem", cursor: "pointer" }}
                  onClick={() =>
                    setHashtags(hashtags ? `${hashtags}, ${tag}` : tag)
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Age & Gender */}
          <div className="d-flex gap-2 mb-3">
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">Age</label>
              <select
                className="form-select border-2 shadow-sm"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              >
                <option value="">Select Age</option>
                <option value="13-17">13 - 17</option>
                <option value="18-24">18 - 24</option>
                <option value="25-34">25 - 34</option>
                <option value="35-44">35 - 44</option>
                <option value="45-54">45 - 54</option>
                <option value="55+">55+</option>
              </select>
            </div>
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">Gender</label>
              <select
                className="form-select border-2 shadow-sm"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>

          {/* Top Audience Country */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">
              Top Audience Countries
            </label>
            <select
              className="form-select border-2 shadow-sm"
              value={audienceCountry}
              onChange={(e) => setAudienceCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Top Audience Language */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">
              Top Audience Languages
            </label>
            <select
              className="form-select border-2 shadow-sm"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="">Select Language</option>
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between position-sticky bottom-0 bg-light py-2">
            <button
              className="btn btn-outline-secondary px-4 py-2"
              onClick={() => setShowFilters(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary px-4 py-2"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Influencers;
