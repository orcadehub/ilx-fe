import React from "react";
import PlatformBasedContent from "./PlatformBasedContent";
import ComboPackageContent from "./ComboPackageContent";
import CustomPackageContent from "./CustomPackageContent";

const PricesTab = ({
  selected,
  selectedService,
  setSelectedService,
  selectedPlatformServices,
  setSelectedPlatformServices,
  selectedCombos,
  setSelectedCombos,
  expandedPlatform,
  setExpandedPlatform,
  handlePlatformChange,
  handleComboChange,
  handleProceed,
}) => {
  return (
    <div className="border rounded-4 p-4 bg-light shadow-sm">
      {/* Tab Options */}
      <div className="mb-3 d-flex gap-3">
        {["Platform Based", "Combo Package", "Custom Package"].map(
          (tab) => (
            <div
              key={tab}
              onClick={() => {
                setSelectedService(tab);
                setSelectedPlatformServices({});
                setSelectedCombos([]);
                setExpandedPlatform("instagram");
              }}
              style={{
                cursor: "pointer",
                paddingBottom: "5px",
                borderBottom:
                  selectedService === tab
                    ? "2px solid blue"
                    : "2px solid transparent",
                fontWeight:
                  selectedService === tab ? "bold" : "normal",
                color: selectedService === tab ? "blue" : "#000",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {tab}
            </div>
          )
        )}
      </div>

      {/* Platform Based Content */}
      {selectedService === "Platform Based" && (
        <PlatformBasedContent
          selected={selected}
          expandedPlatform={expandedPlatform}
          setExpandedPlatform={setExpandedPlatform}
          selectedPlatformServices={selectedPlatformServices}
          handlePlatformChange={handlePlatformChange}
        />
      )}

      {/* Combo Package Content */}
      {selectedService === "Combo Package" && (
        <ComboPackageContent
          selected={selected}
          selectedCombos={selectedCombos}
          handleComboChange={handleComboChange}
        />
      )}

      {/* Custom Package Content */}
      {selectedService === "Custom Package" && (
        <CustomPackageContent selected={selected} />
      )}

      {/* Book Button */}
      <div className="text-end mt-3">
        <button
          className="btn btn-success rounded-pill px-4 shadow-sm"
          onClick={handleProceed}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default PricesTab;