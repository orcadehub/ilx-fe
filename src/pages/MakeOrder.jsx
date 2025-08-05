import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaComment,
  FaShareAlt,
  FaHeart,
  FaFileUpload,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

 const baseURL =
    import.meta.env.MODE === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;


// Helper to build service list from prices
const extractAllServices = (prices) => {
  const services = [];
  Object.entries(prices).forEach(([platform, platformServices]) => {
    if (platform === "combos" || platform === "custom") return;
    Object.entries(platformServices).forEach(([type, price]) => {
      services.push({
        id: `${platform}-${type}`,
        name: type,
        platform,
        type: "Platform Based",
        price: Number(price),
      });
    });
  });
  return services;
};

const MakeOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedPlatformServices = {},
    selectedCombos = [],
    selected = {},
  } = location.state;

  const allServices = extractAllServices(selected.prices || {});
  const allCombos = selected.prices?.combos || [];
  const allCustom = selected.prices?.custom || [];

  const [selectedServicesData, setSelectedServicesData] = useState({});
  const [selectedComboData, setSelectedComboData] = useState([]);
  const [selectedCustomData, setSelectedCustomData] = useState([]);
  const [selectedService, setSelectedService] = useState("Platform Based");
  const [expandedPlatform, setExpandedPlatform] = useState("instagram");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [affiliatedLinks, setAffiliatedLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [postDateTime, setPostDateTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
  };

  const handlePlatformChange = (key) => {
    const [platform, service] = key.split("-");

    setSelectedServicesData((prev) => {
      const updated = { ...prev };
      if (!updated[platform]) updated[platform] = [];

      if (updated[platform].includes(service)) {
        updated[platform] = updated[platform].filter((s) => s !== service);
        if (updated[platform].length === 0) delete updated[platform];
        setSelectedServices((prev) =>
          prev.filter(
            (s) =>
              !(
                s.platform === platform &&
                s.name === service &&
                s.type === "Platform Based"
              )
          )
        );
      } else {
        updated[platform].push(service);
        const price = selected?.prices?.[platform]?.[service] || 0;

        setSelectedServices((prev) => {
          const exists = prev.some(
            (s) =>
              s.platform === platform &&
              s.name === service &&
              s.type === "Platform Based"
          );
          if (exists) return prev;
          return [
            ...prev,
            {
              name: service,
              platform,
              type: "Platform Based",
              price: Number(price),
            },
          ];
        });
      }

      return updated;
    });
  };

  const handleComboChange = (name, type) => {
    const isCombo = type === "Combo Package";
    const setData = isCombo ? setSelectedComboData : setSelectedCustomData;
    const data = isCombo ? selectedComboData : selectedCustomData;
    const items = isCombo ? allCombos : allCustom;

    const isSelected = data.includes(name);

    if (isSelected) {
      setData((prev) => prev.filter((n) => n !== name));
      setSelectedServices((prev) =>
        prev.filter((s) => !(s.type === type && s.name === name))
      );
    } else {
      const item = items.find((c) => c.name === name);
      if (item) {
        setData((prev) => [...prev, name]);

        setSelectedServices((prev) => {
          const exists = prev.some((s) => s.name === name && s.type === type);
          if (exists) return prev;

          return [
            ...prev,
            {
              name: item.name,
              platform: item.platforms?.join(", ") || "Custom",
              type,
              price: Number(item.price),
            },
          ];
        });
      }
    }
  };

  const handleLinkInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedLink = linkInput.trim();
      if (trimmedLink && !affiliatedLinks.includes(trimmedLink)) {
        setAffiliatedLinks([...affiliatedLinks, trimmedLink]);
        setLinkInput("");
      }
    }
  };

  const removeLink = (linkToRemove) => {
    setAffiliatedLinks(affiliatedLinks.filter((link) => link !== linkToRemove));
  };

  const handleMakeOrder = async () => {
    if (selectedServices.length === 0) {
      toast.error(
        "Please select at least one service, combo, or custom package."
      );
      return;
    }

    const localUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const userId = localUser?.id;
    const influencerId = selected?.id;
    const username = localUser.fullname;
    const influencerName =
      selected?.name || (selected?.username ? selected.username : "Unknown");

    if (!userId || !influencerId) {
      toast.error("Missing user or influencer info.");
      return;
    }

    console.log("Order Data:", {
      userId,
      influencerId,
      username,
      selectedServices,
      totalPrice,
      description,
      affiliatedLinks,
      couponCode,
      postDateTime,
      file,
    });
    debugger;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("influencerId", influencerId);
    formData.append("username", username);
    formData.append("influencer_name", influencerName);
    formData.append("type", selectedService);
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("totalPrice", totalPrice);
    formData.append("description", description || "");
    formData.append("affiliatedLinks", JSON.stringify(affiliatedLinks));
    formData.append("couponCode", couponCode || "");
    formData.append("postDateTime", postDateTime || "");
    if (file) formData.append("file", file);

    try {
      const response = await fetch(`${baseURL}/api/place-order`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/dashboard/orders"), 2000);
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const services = [];
    const platformState = {};

    Object.entries(selectedPlatformServices).forEach(([platform, names]) => {
      names.forEach((name) => {
        const found = allServices.find(
          (s) => s.platform === platform && s.name === name
        );
        if (found) {
          services.push({ ...found, type: "Platform Based" });
          if (!platformState[platform]) platformState[platform] = [];
          platformState[platform].push(name);
        }
      });
    });

    const combos = selectedCombos.map((comboId) =>
      allCombos.find((c) => c.name === comboId || c.id === comboId)
    );

    const comboServices = combos.filter(Boolean).map((combo) => ({
      name: combo.name,
      platform: combo.platforms?.join(", "),
      type: "Combo Package",
      price: Number(combo.price),
    }));

    const customServices = selectedCombos
      .map((customId) =>
        allCustom.find((c) => c.name === customId || c.id === customId)
      )
      .filter(Boolean)
      .map((custom) => ({
        name: custom.name,
        platform: "Custom",
        type: "Custom Package",
        price: Number(custom.price),
      }));

    setSelectedServicesData(platformState);
    setSelectedComboData(combos.map((c) => c.name));
    setSelectedCustomData(customServices.map((c) => c.name));
    setSelectedServices([...services, ...comboServices, ...customServices]);
  }, [selectedPlatformServices, selectedCombos]);

  const totalPrice = selectedServices.reduce(
    (sum, s) => sum + Number(s.price || 0),
    0
  );

  const groupedServices = selectedServices.reduce((acc, service) => {
    const key =
      service.type === "Platform Based" ? service.platform : service.type;
    if (!acc[key]) acc[key] = [];
    acc[key].push(service);
    return acc;
  }, {});

  return (
    <Container className="py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card className="mb-4 shadow-sm rounded-4 border-0 p-3 bg-white">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3 flex-grow-1">
            <img
              src={selected.profilePic || "https://via.placeholder.com/70"}
              className="rounded border border-1"
              width="70"
              height="70"
              alt="Profile"
            />
            <div>
              <h5 className="fw-semibold mb-1 d-flex align-items-center gap-3">
                {selected.name || "Unknown User"}
                <FaHeart
                  style={{
                    cursor: "pointer",
                    color: isWishlisted ? "#e63946" : "#6b7280",
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
              <div className="text-muted small">
                @{selected.username || "username"}
              </div>
            </div>
          </div>

          <div className="d-flex gap-4 flex-wrap text-center">
            <div>
              <FaInstagram color="#833AB4" size={26} />
              <div className="fw-bold">{selected.stats?.instagram || "0"}</div>
            </div>
            <div>
              <FaFacebook color="#3B5998" size={26} />
              <div className="fw-bold">
                {selected.data?.facebook?.friends?.summary?.total_count ?? "0"}
              </div>
            </div>
            <div>
              <FaYoutube color="#C4302B" size={26} />
              <div className="fw-bold">{selected.stats?.youtube || "0"}</div>
            </div>
            <div>
              <FaTwitter color="#00ACEE" size={26} />
              <div className="fw-bold">{selected.stats?.twitter || "0"}</div>
            </div>
          </div>
        </div>
      </Card>

      <Row className="g-4">
        <Col lg={7}>
          <div className="border rounded-4 p-4 bg-light shadow-sm">
            <div className="mb-3 d-flex gap-3">
              {["Platform Based", "Combo Package", "Custom Package"].map(
                (tab) => (
                  <div className="form-check" key={tab}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="serviceTypeTab"
                      id={`tab-${tab}`}
                      checked={selectedService === tab}
                      onChange={() => {
                        setSelectedService(tab);
                        setSelectedServicesData({});
                        setSelectedComboData([]);
                        setSelectedCustomData([]);
                        setSelectedServices([]);
                        setExpandedPlatform("instagram");
                      }}
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor={`tab-${tab}`}
                      style={{ cursor: "pointer", color: "#1e293b" }}
                    >
                      {tab}
                    </label>
                  </div>
                )
              )}
            </div>

            {selectedService === "Platform Based" && (
              <>
                {["facebook", "instagram", "youtube", "twitter"].map(
                  (platform) =>
                    selected.prices[platform] && (
                      <div
                        key={platform}
                        className="mb-3 rounded border shadow-sm bg-light overflow-hidden"
                      >
                        <button
                          className="btn w-100 text-start d-flex justify-content-between align-items-center px-3 py-2 border-bottom fw-bold text-white"
                          style={{ backgroundColor: "#2c3e50" }}
                          onClick={() =>
                            setExpandedPlatform((prev) =>
                              prev === platform ? null : platform
                            )
                          }
                        >
                          <span className="text-capitalize">{platform}</span>
                          <i
                            className={`bi ${
                              expandedPlatform === platform
                                ? "bi-chevron-up"
                                : "bi-chevron-down"
                            } fs-5`}
                          ></i>
                        </button>

                        {expandedPlatform === platform && (
                          <div className="px-3 pt-2 pb-3 bg-white">
                            {Object.entries(selected.prices[platform])
                              .filter(([service]) => service !== "combo")
                              .map(([service, price], idx) => (
                                <div
                                  key={idx}
                                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                                >
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`platform-${platform}-${service}`}
                                      checked={
                                        selectedServicesData[
                                          platform
                                        ]?.includes(service) || false
                                      }
                                      onChange={() =>
                                        handlePlatformChange(
                                          `${platform}-${service}`
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label ms-2"
                                      htmlFor={`platform-${platform}-${service}`}
                                    >
                                      {service}
                                    </label>
                                  </div>
                                  <div
                                    className="fw-semibold text-success"
                                    style={{ color: "#059669" }}
                                  >
                                    ₹{price}
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )
                )}
              </>
            )}

            {(selectedService === "Combo Package" ||
              selectedService === "Custom Package") && (
              <div className="row">
                {(selectedService === "Combo Package"
                  ? allCombos
                  : allCustom
                ).map((item) => {
                  const isSelected = (
                    selectedService === "Combo Package"
                      ? selectedComboData
                      : selectedCustomData
                  ).includes(item.name);

                  return (
                    <div
                      key={item.name}
                      className="col-12 col-md-6 col-lg-4 mb-4"
                    >
                      <div
                        className="card h-100 shadow-sm border-0"
                        style={{ backgroundColor: "#f8fafc" }}
                      >
                        <div className="card-body d-flex flex-column justify-content-between">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={`item-${item.name}`}
                                checked={isSelected}
                                onChange={() =>
                                  handleComboChange(item.name, selectedService)
                                }
                              />
                            </div>
                            <span
                              className="badge rounded-pill bg-gradient text-white"
                              style={{
                                background:
                                  "linear-gradient(135deg, #4c1d95, #db2777)",
                              }}
                            >
                              ₹{item.price}
                            </span>
                          </div>

                          <h5
                            className="card-title text-primary"
                            style={{ color: "#1e40af" }}
                          >
                            {item.name}
                          </h5>
                          <p
                            className="card-text text-muted"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {item.description || "No description available."}
                          </p>

                          {item.platforms?.length > 0 && (
                            <>
                              <h6
                                className="mt-3 mb-2 text-secondary"
                                style={{ color: "#475569" }}
                              >
                                Platforms
                              </h6>
                              <div className="d-flex flex-wrap gap-2">
                                {item.platforms.map((platform, index) => (
                                  <span
                                    key={index}
                                    className="badge bg-light text-dark border"
                                    style={{
                                      backgroundColor: "#e5e7eb",
                                      color: "#1e293b",
                                    }}
                                  >
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}

                          {item.services?.length > 0 && (
                            <>
                              <h6
                                className="mt-3 mb-2 text-secondary"
                                style={{ color: "#475569" }}
                              >
                                Includes
                              </h6>
                              <div className="d-flex flex-wrap gap-2">
                                {item.services.map((service, index) => (
                                  <span
                                    key={index}
                                    className="badge bg-white text-dark border"
                                    style={{
                                      backgroundColor: "#ffffff",
                                      color: "#1e293b",
                                    }}
                                  >
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div
              className="border rounded-4 p-4 mt-4"
              style={{
                background: "linear-gradient(135deg, #f1f5f9, #fef2f2)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <h6 className="text-lg fw-bold text-dark mb-4">
                📋 Additional Details
              </h6>
              <div className="space-y-4">
                <div>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "#475569" }}
                  >
                    File Upload
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{
                      borderColor: "#a5b4fc",
                      backgroundColor: "#f8fafc",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "#475569" }}
                  >
                    Manual Description
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter any specific instructions or details"
                    style={{
                      borderColor: "#a5b4fc",
                      backgroundColor: "#f8fafc",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "#475569" }}
                  >
                    Affiliated Links
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    onKeyDown={handleLinkInput}
                    placeholder="Enter link and press Enter or comma"
                    style={{
                      borderColor: "#a5b4fc",
                      backgroundColor: "#f8fafc",
                    }}
                  />
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {affiliatedLinks.map((link, index) => (
                      <span
                        key={index}
                        className="badge rounded-pill px-3 py-2"
                        style={{ backgroundColor: "#a5b4fc", color: "#ffffff" }}
                      >
                        {link}
                        <button
                          type="button"
                          className="btn btn-sm btn-link text-white ms-2"
                          onClick={() => removeLink(link)}
                          style={{ fontSize: "1.2rem", lineHeight: "1rem" }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "#475569" }}
                  >
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#a5b4fc",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="form-label text-secondary"
                    style={{ color: "#475569" }}
                  >
                    Schedule Post Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={postDateTime}
                    onChange={(e) => setPostDateTime(e.target.value)}
                    style={{
                      backgroundColor: "#f8fafc",
                      borderColor: "#a5b4fc",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={5}>
          <Card
            className="p-4 shadow rounded-4 border-0"
            style={{
              background: "linear-gradient(to bottom right, #f8fafc, #e6f0fa)",
            }}
          >
            <h5 className="fw-bold mb-4 text-dark" style={{ color: "#4b0082" }}>
              <i className="bi bi-receipt me-2 text-indigo"></i>Order Summary
            </h5>

            {selectedServices.length > 0 ? (
              <>
                <div className="mb-4">
                  <h6 className="fw-semibold text-secondary mb-2">
                    <i className="bi bi-tag-fill me-2 text-cyan"></i>Order Type
                  </h6>
                  <div className="border rounded p-3 bg-white shadow-sm text-dark">
                    {selectedService}
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold text-secondary mb-3">
                    <i className="bi bi-box-seam me-2 text-amber"></i>Selected
                    Services
                  </h6>
                  {Object.entries(groupedServices).map(([group, services]) => (
                    <div key={group} className="mb-3">
                      <div
                        className="px-3 py-2 rounded fw-bold text-capitalize text-white"
                        style={{
                          backgroundColor: "#f4a261",
                          borderLeft: "5px solid #f7b731",
                        }}
                      >
                        {group}
                      </div>
                      <ul className="list-group mt-2">
                        {services.map((service, index) => (
                          <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-start border-0 shadow-sm mb-2 rounded"
                            style={{ backgroundColor: "#fff" }}
                          >
                            <div className="me-3">
                              <div className="fw-semibold text-dark">
                                {service.name}
                              </div>
                              <small className="text-muted">
                                {service.type}
                              </small>
                            </div>
                            <span
                              className="badge rounded-pill fs-6"
                              style={{
                                backgroundColor: "#48cae4",
                                color: "#1e293b",
                              }}
                            >
                              ₹{service.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  <div className="fw-bold fs-5 text-dark">Total Price</div>
                  <div className="fw-bold fs-5" style={{ color: "#0077b6" }}>
                    ₹{totalPrice}
                  </div>
                </div>

                <Button
                  className="mt-4 w-100 fw-semibold border-0"
                  style={{
                    background: "linear-gradient(to right, #56cfe1, #a3bffa)",
                    color: "#1e293b",
                  }}
                  onClick={handleMakeOrder}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle me-2"></i>Make Order
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="text-muted text-center py-5">
                <i className="bi bi-info-circle fs-4 mb-2 d-block"></i>
                No services selected yet
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeOrder;
