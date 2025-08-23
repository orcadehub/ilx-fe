import React from "react";
import { Row } from "react-bootstrap";
import CustomCard from "./CustomCard";

const CustomPackageContent = ({ selected }) => {
  return (
    <Row>
      {(selected.prices.custom || []).map((combo) => (
        <CustomCard key={combo.name} combo={combo} />
      ))}
    </Row>
  );
};

export default CustomPackageContent;