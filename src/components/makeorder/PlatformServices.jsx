// src/components/PlatformServices.js
import React from "react";

const PlatformServices = ({
  selectedServicesData,
  handlePlatformChange,
  expandedPlatform,
  setExpandedPlatform,
  selected,
}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 fw-bold">Platform Services</h5>
        <select
          className="form-select w-auto"
          value={expandedPlatform || ""}
          onChange={(e) => {
            handlePlatformChange("reset");
            setExpandedPlatform(e.target.value);
          }}
        >
          <option value="">-- Choose Platform --</option>
          {["facebook", "instagram", "youtube", "twitter"].map(
            (platform) =>
              selected.prices[platform] && (
                <option key={platform} value={platform}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </option>
              )
          )}
        </select>
      </div>

      {expandedPlatform && selected.prices[expandedPlatform] && (
        <div className="rounded-4 shadow-sm border bg-white overflow-hidden">
          <div
            className="px-3 py-3 d-flex align-items-center fw-bold text-white"
            style={{
              backgroundColor:
                expandedPlatform === "instagram"
                  ? "#E1306C"
                  : expandedPlatform === "facebook"
                  ? "#1877F2"
                  : expandedPlatform === "youtube"
                  ? "#FF0000"
                  : expandedPlatform === "twitter"
                  ? "#1DA1F2"
                  : "#37517e",
            }}
          >
            <i
              className={`bi ${
                expandedPlatform === "instagram"
                  ? "bi-instagram"
                  : expandedPlatform === "facebook"
                  ? "bi-facebook"
                  : expandedPlatform === "youtube"
                  ? "bi-youtube"
                  : expandedPlatform === "twitter"
                  ? "bi-twitter"
                  : "bi-globe"
              } me-2`}
              style={{ fontSize: "1.2rem" }}
            ></i>
            {expandedPlatform.charAt(0).toUpperCase() + expandedPlatform.slice(1)}
          </div>
          <div className="px-3 pt-3 pb-2">
            {Object.entries(selected.prices[expandedPlatform])
              .filter(([service]) => service !== "combo")
              .map(([service, price], idx) => (
                <div
                  key={idx}
                  className="d-flex justify-content-between align-items-center py-3 border-bottom"
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`platform-${expandedPlatform}-${service}`}
                      checked={selectedServicesData[expandedPlatform]?.includes(service)}
                      onChange={() =>
                        handlePlatformChange(`${expandedPlatform}-${service}`)
                      }
                    />
                    <label
                      className="form-check-label ms-2 fw-semibold"
                      htmlFor={`platform-${expandedPlatform}-${service}`}
                    >
                      {service}
                    </label>
                  </div>
                  <div className="fw-bold text-primary">₹{price}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlatformServices;