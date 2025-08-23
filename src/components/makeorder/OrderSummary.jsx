// src/components/OrderSummary.js
import React, { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const OrderSummary = () => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [affiliatedLinks, setAffiliatedLinks] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [postDateTime, setPostDateTime] = useState("");

  const selected = { /* Mock data, replace with actual state */
    id: "1",
    prices: {
      instagram: { post: "100", story: "50" },
      facebook: { post: "80", story: "40" },
      combos: [{ name: "Combo 1", price: "300" }],
      custom: [{ name: "Custom 1", price: "400" }],
    },
  };

  const allServices = Object.entries(selected.prices)
    .filter(([platform]) => !["combos", "custom"].includes(platform))
    .flatMap(([platform, services]) =>
      Object.entries(services).map(([type, price]) => ({
        id: `${platform}-${type}`,
        name: type,
        platform,
        type: "Platform Based",
        price: Number(price),
      }))
    );
  const allCombos = selected.prices.combos || [];
  const allCustom = selected.prices.custom || [];

  useEffect(() => {
    // Mock initial selection (replace with actual state logic)
    setSelectedServices([
      { name: "post", platform: "instagram", type: "Platform Based", price: 100 },
    ]);
  }, []);

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

  const handleMakeOrder = async () => {
    if (selectedServices.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    const localUser = { id: "user1", fullname: "User1" }; // Mock user
    const token = "mock-token";
    const userId = localUser?.id;
    const influencerId = selected?.id;
    const username = localUser?.fullname;
    const influencerName = "Unknown";

    setIsLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("influencerId", influencerId);
    formData.append("username", username);
    formData.append("influencer_name", influencerName);
    formData.append("type", "Platform Based");
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
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Order placed successfully!");
        setTimeout(() => navigate("/dashboard/orders"), 2000);
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      className="rounded-4 p-4 shadow border-0"
      style={{ background: "linear-gradient(to bottom right, #f8fafc, #e6f0fa)" }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
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
              Platform Based
            </div>
          </div>
          <div className="mb-4">
            <h6 className="fw-semibold text-secondary mb-3">
              <i className="bi bi-box-seam me-2 text-amber"></i>Selected Services
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
                        <div className="fw-semibold text-dark">{service.name}</div>
                        <small className="text-muted">{service.type}</small>
                      </div>
                      <span
                        className="badge rounded-pill fs-6"
                        style={{ backgroundColor: "#48cae4", color: "#1e293b" }}
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
  );
};

export default OrderSummary;