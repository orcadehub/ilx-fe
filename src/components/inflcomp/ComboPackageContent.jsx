import React from "react";
import ComboCard from "./ComboCard";

const ComboPackageContent = ({ selected, selectedCombos, handleComboChange }) => {
  return (
    <div className="combo-packages">
      <p className="text-muted">
        Choose a multi-platform promotion package designed by the
        influencer. These bundles include posts across 2 or more
        platforms at a fixed price. Content must be provided by
        the business.
      </p>

      {(selected.prices.combos || []).map((combo) => (
        <ComboCard
          key={combo.name}
          combo={combo}
          isSelected={selectedCombos.includes(combo.name)}
          handleComboChange={handleComboChange}
        />
      ))}
    </div>
  );
};

export default ComboPackageContent;