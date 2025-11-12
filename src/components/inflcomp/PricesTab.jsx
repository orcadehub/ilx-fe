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
  convertPrice,
}) => {
  return (
    <div className="px-3">
      {/* Tab Options */}
      <div className="mb-3 d-flex gap-3 !bg-[var(--hover2)] p-1 rounded-xl">
        {["Platform Based",
          // "Combo Package",
          "Custom Package"].map(
          (tab) => (
            <button
              key={tab}
              className={`btn w-100 text-center !font-medium text-14 py-1 border-0 !text-[var(--text)] ${selectedService === tab
                  ? " border-bottom border-2 border-primary !bg-[var(--bg)]"
                  : ""
                }`}
              onClick={() => {
                  setSelectedService(tab);
                  setSelectedPlatformServices({});
                  setSelectedCombos([]);
                  setExpandedPlatform("instagram");
                }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
            // <div
            //   key={tab}
            //   onClick={() => {
            //     setSelectedService(tab);
            //     setSelectedPlatformServices({});
            //     setSelectedCombos([]);
            //     setExpandedPlatform("instagram");
            //   }}
            //   style={{
            //     cursor: "pointer",
            //     paddingBottom: "5px",
            //     borderBottom:
            //       selectedService === tab
            //         ? "2px solid blue"
            //         : "2px solid transparent",
            //     fontWeight:
            //       selectedService === tab ? "bold" : "normal",
            //     color: selectedService === tab ? "blue" : "#000",
            //     transition: "all 0.2s ease-in-out",
            //   }}
            // >
            //   {tab}
            // </div>
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
          convertPrice={convertPrice}
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
        <CustomPackageContent selected={selected} convertPrice={convertPrice} />
      )}

      {/* Book Button */}
      <div className="text-end mt-3">
        <button
          className="btn !bg-[var(--primary)] rounded-xl text-white px-4"
          onClick={handleProceed}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default PricesTab;