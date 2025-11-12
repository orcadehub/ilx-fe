import React from "react";
import { Radio } from "antd";

const PlatformBasedContent = ({
  selected,
  expandedPlatform,
  setExpandedPlatform,
  selectedPlatformServices,
  handlePlatformChange,
  convertPrice,
}) => {
  // Handle platform change and reset selected services
  const handlePlatformSelect = (newPlatform) => {
    handlePlatformChange("reset"); // Clear all previous selections
    setExpandedPlatform(newPlatform); // Set new platform
  };

  // Handle radio button selection - ensures only one selection at a time
  const handleRadioChange = (value) => {
    handlePlatformChange("reset"); // Clear all previous selections first
    handlePlatformChange(value); // Then set the new selection
  };

  // Format price to handle zero or undefined cases
  const formatPrice = (price) => {
    if (price === 0 || price === undefined || price === null) {
      return convertPrice ? convertPrice(49) : "₹49";
    }
    return convertPrice ? convertPrice(Number(price)) : `₹${Number(price).toLocaleString("en-IN")}`;
  };

  return (
    <>
      <style>{`
        .ant-radio-wrapper {
          color: var(--text) !important;
        }
        .ant-radio-wrapper span {
          color: var(--text) !important;
        }
        .ant-radio-checked .ant-radio-inner {
          border-color: var(--primary) !important;
          background-color: var(--primary) !important;
        }
        .ant-radio:hover .ant-radio-inner {
          border-color: var(--primary) !important;
        }
      `}</style>
      {/* Header row */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 font-semibold !text-[16px]">Platform Services</h5>
        <select
          className="form-select w-auto !bg-[var(--bgPage)] !text-[var(--text)] border !border-[var(--border)]"
          value={expandedPlatform || "ChoosePlatform"}
          onChange={(e) => handlePlatformSelect(e.target.value)}
        >
          <option value="ChoosePlatform">Choose Platform</option>
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

      {/* Services for selected platform or all platforms */}
      {(expandedPlatform === "ChoosePlatform" || expandedPlatform) && (
        <>
          {expandedPlatform === "ChoosePlatform" ? (
            // Show all services from all platforms in one box
            <div className="rounded-xl overflow-hidden border !border-[var(--border)]">
              {/* All Services header */}
              <div className="px-3 py-3 d-flex align-items-center !font-semibold !text-[16px] text-[var(--text)]">
                {/* <i className="bi bi-grid-3x3-gap me-2"></i> */}
                All Platform Services
              </div>

              {/* Flattened service list from all platforms */}
              <div className="px-3 pt-3 pb-2">
                <Radio.Group
                  value={(() => {
                    // Find the currently selected service across all platforms
                    for (const platform of ["facebook", "instagram", "youtube", "twitter"]) {
                      const services = selectedPlatformServices[platform];
                      if (services && services.length > 0) {
                        return `${platform}-${services[0]}`;
                      }
                    }
                    return null;
                  })()}
                  onChange={(e) => handleRadioChange(e.target.value)}
                  className="w-100"
                >
                  {["facebook", "instagram", "youtube", "twitter"]
                    .filter(platform => selected.prices[platform])
                    .flatMap(platform =>
                      Object.entries(selected.prices[platform])
                        .filter(([service]) => service !== "combos")
                        .map(([service, price]) => ({
                          platform,
                          service,
                          price,
                          displayName: ` ${service}`,

                        }))
                    )
                    .map((item, idx) => (
                      <div
                        key={`${item.platform}-${item.service}-${idx}`}
                        className="d-flex justify-content-between align-items-center py-2 border-bottom !border-[var(--border)]"
                      >
                        <div className="d-flex align-items-center">
                          <i className={`bi ${item.platformIcon} me-2 text-14`}></i>
                          <Radio
                            value={`${item.platform}-${item.service}`}
                            className="!text-[var(--text)]"
                            style={{ fontSize: 14 }}
                          >
                            {item.displayName}
                          </Radio>
                        </div>
                        <div className="text-14 !font-medium text-primary">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    ))}
                </Radio.Group>
              </div>
            </div>
          ) : (
            // Show single platform when specific platform is selected
            selected.prices[expandedPlatform] && (
              <div className="rounded-xl overflow-hidden border !border-[var(--border)]">
                {/* Platform header with icon */}
                <div className="px-3 py-3 d-flex align-items-center !font-semibold !text-[16px] text-[var(--text)]">
                  <i
                    className={`bi ${expandedPlatform === "instagram"
                      ? "bi-instagram"
                      : expandedPlatform === "facebook"
                        ? "bi-facebook"
                        : expandedPlatform === "youtube"
                          ? "bi-youtube"
                          : expandedPlatform === "twitter"
                            ? "bi-twitter"
                            : "bi-globe"
                      } me-2`}
                  ></i>
                  {expandedPlatform.charAt(0).toUpperCase() + expandedPlatform.slice(1)}
                </div>

                {/* Service list */}
                <div className="px-3 pt-3 pb-2">
                  <Radio.Group
                    value={selectedPlatformServices[expandedPlatform]?.[0] ? `${expandedPlatform}-${selectedPlatformServices[expandedPlatform][0]}` : null}
                    onChange={(e) => handleRadioChange(e.target.value)}
                    className="w-100"
                  >
                    {Object.entries(selected.prices[expandedPlatform])
                      .filter(([service]) => service !== "combos")
                      .map(([service, price], idx) => (
                        <div
                          key={idx}
                          className="d-flex justify-content-between align-items-center py-2 border-bottom !border-[var(--border)]"
                        >
                          <div>
                            <Radio
                              value={`${expandedPlatform}-${service}`}
                              className="!text-[var(--text)]"
                              style={{ fontSize: 14 }}
                            >
                              {service}
                            </Radio>
                          </div>
                          <div className="text-14 !font-medium text-primary">
                            {formatPrice(price)}
                          </div>
                        </div>
                      ))}
                  </Radio.Group>
                </div>
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default PlatformBasedContent;