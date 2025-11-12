import React from "react";
import { Row } from "react-bootstrap";
import CustomCard from "./CustomCard";

const CustomPackageContent = ({ selected, convertPrice }) => {
  const combos = selected?.prices?.combos || [];
  
  return (
    <Row>
      {combos.length > 0 ? (
        combos.map((combo, index) => (
          <CustomCard key={combo.name || index} combo={combo} convertPrice={convertPrice} />
        ))
      ) : (
        <div className="text-center text-muted py-4">
          No custom packages available
        </div>
      )}
    </Row>
  );
};

export default CustomPackageContent;