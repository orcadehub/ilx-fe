import React from "react";

const CustomCard = ({ combo }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
      <div className="card h-100 shadow-sm rounded-4 border-0 w-100">
        <div className="card-body p-4 d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-semibold mb-2">{combo.name}</h5>
            <p className="text-muted small mb-3">
              {combo.description ||
                "No description available."}
            </p>

            {combo.platforms?.length > 0 && (
              <>
                <div className="text-muted small fw-semibold">
                  Platforms:
                </div>
                <div className="d-flex flex-wrap gap-2 mt-1 mb-3">
                  {combo.platforms.map((platform, i) => (
                    <span
                      key={i}
                      className="badge bg-light text-dark border border-1"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </>
            )}

            {combo.services?.length > 0 && (
              <>
                <div className="text-muted small fw-semibold">
                  Includes:
                </div>
                <div className="d-flex flex-wrap gap-2 mt-1 mb-3">
                  {combo.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="badge bg-secondary-subtle text-dark border border-secondary"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="d-flex justify-content-end">
            <span className="badge bg-primary-subtle text-primary fs-6 px-3 py-2 rounded-pill">
              ₹{combo.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;