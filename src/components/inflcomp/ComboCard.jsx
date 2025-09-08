import React from "react";

const ComboCard = ({ combo, isSelected, handleComboChange }) => {
  // Helper for platform badge with icon + color
  const getPlatformBadge = (platform) => {
    const iconMap = {
      Instagram: { icon: "bi-instagram", color: "#E1306C" },
      Facebook: { icon: "bi-facebook", color: "#1877F2" },
      Youtube: { icon: "bi-youtube", color: "#FF0000" },
      Twitter: { icon: "bi-twitter", color: "#1DA1F2" },
    };
    const { icon, color } = iconMap[platform] || {
      icon: "bi-globe",
      color: "#6c757d",
    };
    return (
      <span
        className="badge rounded-pill bg-light border d-flex align-items-center gap-1"
        style={{ color }}
      >
        <i className={`bi ${icon}`}></i>
        {platform}
      </span>
    );
  };

  // Format price to handle zero or undefined cases
  const formatPrice = (price) => {
    if (price === 0 || price === undefined || price === null) {
      return "Not specified";
    }
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // Infer platforms from services if combo.platforms is not provided
  const inferPlatforms = (services) => {
    const platformMap = {
      "Post Image/Video": ["Instagram", "Facebook", "Twitter"],
      "Reels/Shorts": ["Instagram", "Facebook"],
      "Story (Image/Video)": ["Instagram", "Facebook"],
      "Short Video (<10m)": ["Youtube"],
      "Video (>10m)": ["Youtube"],
      Polls: ["Twitter", "Facebook"],
      "Visit and Promote at Your Business": ["Instagram", "Facebook", "Youtube"],
    };

    const platforms = new Set();
    services.forEach((service) => {
      const servicePlatforms = platformMap[service] || [];
      servicePlatforms.forEach((platform) => platforms.add(platform));
    });
    return Array.from(platforms);
  };

  // Use combo.platforms if available, otherwise infer from services
  const platforms = combo.platforms?.length > 0 ? combo.platforms : inferPlatforms(combo.services || []);

  return (
    <div
      className={`p-3 mb-3 rounded-4 border ${isSelected ? "border-primary border-2" : "border-light"}`}
      style={{ cursor: "pointer", backgroundColor: "#fff" }}
      onClick={() => handleComboChange(combo.name)}
    >
      {/* Top row: Checkbox + Title + Price */}
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex align-items-start gap-2">
          <input
            type="checkbox"
            name="comboSelect"
            checked={isSelected}
            onChange={() => handleComboChange(combo.name)}
            style={{ marginTop: "4px" }}
          />
          <div>
            <h5 className="fw-bold m-0">
              {combo.name}{" "}
              <i
                className="bi bi-info-circle text-muted"
                style={{ fontSize: "0.9rem" }}
              ></i>
            </h5>
            <p className="text-muted small mb-2">
              {combo.description || "A multi-platform promotion package."}
            </p>
          </div>
        </div>
        <div className="fw-bold text-primary fs-5">
          {formatPrice(combo.price)}
        </div>
      </div>

      {/* Platforms (left) & Includes (right) in a row */}
      <div className="d-flex justify-content-between align-items-start flex-wrap mt-2">
        {/* Platforms */}
        {platforms.length > 0 && (
          <div>
            <div className="text-muted small fw-semibold mb-1">Platforms:</div>
            <div className="d-flex flex-wrap gap-2">
              {platforms.map((platform, i) => (
                <React.Fragment key={i}>{getPlatformBadge(platform)}</React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Includes */}
        {combo.services?.length > 0 && (
          <div>
            <div className="text-muted small fw-semibold mb-1">Includes</div>
            <div className="d-flex flex-wrap gap-2">
              {combo.services.map((service, idx) => (
                <span
                  key={idx}
                  className="badge rounded-pill bg-light border"
                  style={{ color: "#000" }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComboCard;