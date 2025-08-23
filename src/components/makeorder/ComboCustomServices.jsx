// src/components/ComboCustomServices.js
import React from "react";

const ComboCustomServices = ({
  selectedService,
  selectedComboData,
  selectedCustomData,
  handleComboChange,
  allCombos,
  allCustom,
}) => {
  const items = selectedService === "Combo Package" ? allCombos : allCustom;
  const selectedData = selectedService === "Combo Package" ? selectedComboData : selectedCustomData;

  return (
    <div className="row">
      {items.map((item) => {
        const isSelected = selectedData.includes(item.name);

        return (
          <div key={item.name} className="col-12 col-md-6 col-lg-4 mb-4">
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
  );
};

export default ComboCustomServices;