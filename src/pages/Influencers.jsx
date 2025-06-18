import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Offcanvas, Dropdown } from "react-bootstrap";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaHeart,
  FaEye,
  FaComment,
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
import influencersData from "../components/influencersData";
import { Card, Row, Col } from "react-bootstrap";
import services from "../components/services";
import "./Influencers.css";

function Influencers() {
  const [selected, setSelected] = useState(influencersData[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [selectedService, setSelectedService] = useState("Platform Based");
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);

  return (
    <div className="d-flex flex-column flex-md-row h-100">
      {/* Left Panel */}
      <div className="p-3 border-end col-12 col-lg-4 bg-light custom-height-panel">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold text-primary">Top Influencers</h5>
          <button
            className="btn btn-outline-primary btn-sm shadow-sm"
            onClick={() => setShowFilters(true)}
          >
            Filters
          </button>
        </div>

        <input
          className="form-control mb-3 shadow-sm"
          placeholder="Search influencers..."
        />

        <div className="overflow-auto" style={{ height: "calc(90vh - 110px)" }}>
          {influencersData.map((inf, index) => (
            <div
              key={inf.id}
              className={`d-flex align-items-center gap-2 p-2 rounded-4 mb-3 bg-white border shadow-sm transition ${
                index >= 5 ? "opacity-100 blur-lg" : "hover-shadow-lg"
              }`}
              onClick={() => setSelected(inf)}
              style={{
                cursor: index >= 5 ? "default" : "pointer",
                height: "80px",
                overflow: "hidden",
                pointerEvents: index >= 5 ? "none" : "auto",
              }}
            >
              <img
                src={inf.profilePic}
                alt="profile"
                className="rounded-circle border border-2 border-primary"
                width="45"
                height="45"
              />
              <div className="flex-grow-1">
                <div className="fw-semibold text-dark">{inf.username}</div>
                <div className="text-muted small">{inf.category}</div>
                <div className="d-flex flex-wrap gap-2 mt-1 small text-secondary">
                  <span className="d-flex align-items-center">
                    <FaInstagram
                      className="me-1"
                      style={{ color: "#E1306C" }}
                    />{" "}
                    {inf.stats.instagram}
                  </span>
                  <span className="d-flex align-items-center">
                    <FaFacebook className="me-1" style={{ color: "#1877F2" }} />{" "}
                    {inf.stats.facebook}
                  </span>
                  <span className="d-flex align-items-center">
                    <FaTwitter className="me-1" style={{ color: "#1DA1F2" }} />{" "}
                    {inf.stats.twitter}
                  </span>
                  <span className="d-flex align-items-center">
                    <FaYoutube className="me-1" style={{ color: "#FF0000" }} />{" "}
                    {inf.stats.youtube}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div
        className="right-panel p-3 bg-white overflow-auto"
        style={{ borderRadius: "1rem" }}
      >
        {selected && (
          <>
            {/* Profile Header */}
            <h4 className="mb-4 fw-bold text-primary">Influencer Profile</h4>
            <div className="d-flex align-items-center mb-4 flex-wrap shadow-sm p-3 bg-light rounded-3">
              <img
                src={selected.profilePic}
                className="rounded-circle me-3 border border-3 border-primary"
                width="70"
                height="70"
                alt="Profile"
              />
              <div>
                <h5 className="mb-0 fw-semibold">{selected.name}</h5>
                <div className="text-muted">@{selected.username}</div>
              </div>
              <div className="ms-md-auto mt-3 mt-md-0 d-flex gap-3 flex-wrap justify-content-end">
                <div className="text-center">
                  <FaInstagram color="#E1306C" />
                  <div className="small">{selected.stats.instagram}</div>
                </div>
                <div className="text-center">
                  <FaFacebook color="#1877F2" />
                  <div className="small">{selected.stats.facebook}</div>
                </div>
                <div className="text-center">
                  <FaYoutube color="#FF0000" />
                  <div className="small">{selected.stats.youtube}</div>
                </div>
                <div className="text-center">
                  <FaTwitter color="#1DA1F2" />
                  <div className="small">{selected.stats.twitter}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs border-0 mb-4">
              {["services", "prices", "data"].map((tab) => (
                <li className="nav-item" key={tab}>
                  <button
                    className={`nav-link rounded-pill px-4 me-2 fw-semibold ${
                      activeTab === tab
                        ? "btn btn-info text-warning"
                        : "btn btn-outline-secondary"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Services */}
            {activeTab === "services" && (
              <Row className="g-4">
                {services.map((service) => (
                  <Col xs={12} sm={6} md={4} key={service.id}>
                    <Card className="shadow-sm h-100 border-0">
                      <Card.Img
                        variant="top"
                        src={service.image}
                        className="card-img-top rounded-top"
                        height="140"
                      />
                      <Card.Body className="p-3">
                        <Card.Title className="fs-6 text-center mb-2 fw-semibold">
                          {service.title}
                        </Card.Title>
                        <div className="d-flex justify-content-around text-muted small">
                          <div>
                            <FaHeart className="text-danger" /> {service.likes}
                          </div>
                          <div>
                            <FaEye /> {service.views}
                          </div>
                          <div>
                            <FaComment /> {service.comments}
                          </div>
                          <div>
                            <FaShare /> {service.shares}
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
              <div className="border rounded p-4 bg-light shadow-sm">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="serviceType"
                    checked={selectedService === "Platform Based"}
                    onChange={() => setSelectedService("Platform Based")}
                  />
                  <label className="form-check-label">Platform Based</label>
                </div>
                <Dropdown
                  show={platformDropdownOpen}
                  onToggle={() =>
                    setPlatformDropdownOpen(!platformDropdownOpen)
                  }
                  className="my-2"
                >
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    className="rounded-pill shadow-sm"
                  >
                    Select Platforms
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Instagram</Dropdown.Item>
                    <Dropdown.Item>Facebook</Dropdown.Item>
                    <Dropdown.Item>Twitter</Dropdown.Item>
                    <Dropdown.Item>YouTube</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {Object.entries(selected.prices).map(([key, value], idx) => (
                  <div
                    className="form-check d-flex justify-content-between align-items-center border-bottom py-2"
                    key={idx}
                  >
                    <div>
                      <input
                        className="form-check-input me-2"
                        type="radio"
                        name="serviceType"
                        onChange={() => setSelectedService(key)}
                      />
                      <label className="form-check-label">{key}</label>
                    </div>
                    <div className="fw-semibold">{value}</div>
                  </div>
                ))}
                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="serviceType"
                    onChange={() => setSelectedService("Combo Package")}
                  />
                  <label className="form-check-label">Combo Package</label>
                </div>
                <div className="text-end mt-3">
                  <button className="btn btn-success px-4 rounded-pill shadow">
                    Book
                  </button>
                </div>
              </div>
            )}

            {/* Data */}
            {activeTab === "data" && (
              <div className="row g-4">
                {Object.entries(selected.data).map(([label, value]) => (
                  <div className="col-6 col-md-3" key={label}>
                    <div className="bg-light border rounded p-3 text-center shadow-sm">
                      <div className="fw-bold fs-5">{value}</div>
                      <div className="text-muted small">
                        {label
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Area Chart */}
                <div className="col-md-6">
                  <div className="border rounded p-3 shadow-sm bg-white">
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
                </div>

                {/* Pie Chart */}
                <div className="col-md-6">
                  <div className="border rounded p-3 shadow-sm bg-white">
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
                </div>
              </div>
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
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Filters</Offcanvas.Title>
          <button className="btn btn-outline-secondary btn-sm ms-auto">
            Reset Filters
          </button>
        </Offcanvas.Header>

        <Offcanvas.Body className="px-4 py-3 bg-light">
          {/* Location Section */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Location</label>
            <div className="d-flex gap-2">
              <select className="form-select border-2 shadow-sm">
                <option>Select Country</option>
              </select>
              <select className="form-select border-2 shadow-sm">
                <option>Select State</option>
              </select>
              <select className="form-select border-2 shadow-sm">
                <option>Select City</option>
              </select>
            </div>
          </div>

          {/* Niche & Content Type */}
          <div className="d-flex gap-2 mb-3">
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">Niche</label>
              <select className="form-select border-2 shadow-sm">
                <option>Select Niche</option>
              </select>
            </div>
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">
                Content Type
              </label>
              <select className="form-select border-2 shadow-sm">
                <option>Select Type</option>
              </select>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">
              Engagement Rate
            </label>
            <input type="range" className="form-range" />
            <div className="d-flex justify-content-between small">
              <span>0%</span>
              <span>10%</span>
            </div>
          </div>

          {/* Follower Count */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">
              Follower Count
            </label>
            <input type="range" className="form-range" />
            <div className="d-flex justify-content-between small">
              <span>0</span>
              <span>1.5M</span>
            </div>
          </div>

          {/* Platform */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Platform</label>
            <select className="form-select border-2 shadow-sm">
              <option>Select platforms</option>
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
                placeholder="0"
              />
              <input
                type="number"
                className="form-control border-2 shadow-sm"
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
              placeholder="Enter hashtags"
            />
          </div>

          {/* Age & Gender */}
          <div className="d-flex gap-2 mb-3">
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">Age</label>
              <select className="form-select border-2 shadow-sm">
                <option>Select Age</option>
              </select>
            </div>
            <div className="w-50">
              <label className="form-label fw-semibold text-dark">Gender</label>
              <select className="form-select border-2 shadow-sm">
                <option>Select Gender</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-outline-secondary px-4 py-2">
              Cancel
            </button>
            <button className="btn btn-primary px-4 py-2">Update</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Influencers;
