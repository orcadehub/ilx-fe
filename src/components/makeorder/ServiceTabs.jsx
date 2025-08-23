// src/components/ServiceTabs.js
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import PlatformServices from "./PlatformServices";
import ComboCustomServices from "./ComboCustomServices";

const ServiceTabs = () => {
  const [selectedService, setSelectedService] = useState("Platform Based");
  const [expandedPlatform, setExpandedPlatform] = useState("instagram");
  const [selectedServicesData, setSelectedServicesData] = useState({});
  const [selectedComboData, setSelectedComboData] = useState([]);
  const [selectedCustomData, setSelectedCustomData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const selected = { /* Mock data, replace with actual state */
    prices: {
      instagram: { post: "100", story: "50" },
      facebook: { post: "80", story: "40" },
      youtube: { post: "200", story: "150" },
      twitter: { post: "70", story: "30" },
      combos: [{ name: "Combo 1", price: "300" }],
      custom: [{ name: "Custom 1", price: "400" }],
    },
  };

  const allServices = Object.entries(selected.prices)
    .filter(([platform]) => !["combos", "custom"].includes(platform))
    .flatMap(([platform, services]) =>
      Object.entries(services).map(([type, price]) => ({
        id: `${platform}-${type}`,
        name: type,
        platform,
        type: "Platform Based",
        price: Number(price),
      }))
    );
  const allCombos = selected.prices.combos || [];
  const allCustom = selected.prices.custom || [];

  useEffect(() => {
    const services = [];
    Object.entries(selectedServicesData).forEach(([platform, names]) => {
      names.forEach((name) => {
        const found = allServices.find(
          (s) => s.platform === platform && s.name === name
        );
        if (found) services.push({ ...found, type: "Platform Based" });
      });
    });

    const comboServices = selectedComboData
      .map((name) => allCombos.find((c) => c.name === name))
      .filter(Boolean)
      .map((combo) => ({
        name: combo.name,
        platform: "Combo",
        type: "Combo Package",
        price: Number(combo.price),
      }));

    const customServices = selectedCustomData
      .map((name) => allCustom.find((c) => c.name === name))
      .filter(Boolean)
      .map((custom) => ({
        name: custom.name,
        platform: "Custom",
        type: "Custom Package",
        price: Number(custom.price),
      }));

    setSelectedServices([...services, ...comboServices, ...customServices]);
  }, [selectedServicesData, selectedComboData, selectedCustomData]);

  const handlePlatformChange = (key) => {
    if (key === "reset") {
      setSelectedServicesData({});
      setSelectedServices([]);
      return;
    }

    const dashIndex = key.indexOf("-");
    const platform = key.substring(0, dashIndex);
    const service = key.substring(dashIndex + 1);

    setSelectedServicesData((prev) => {
      const updated = { ...prev };
      const currentServices = updated[platform] || [];

      if (currentServices.includes(service)) {
        const filtered = currentServices.filter((s) => s !== service);
        if (filtered.length > 0) updated[platform] = filtered;
        else delete updated[platform];
      } else {
        updated[platform] = [...currentServices, service];
      }
      return updated;
    });

    setSelectedServices((prev) =>
      prev.filter((s) => !(s.platform === platform && s.name === service))
    );
  };

  const handleComboChange = (name, type) => {
    const setData = type === "Combo Package" ? setSelectedComboData : setSelectedCustomData;
    const data = type === "Combo Package" ? selectedComboData : selectedCustomData;

    setData((prev) => {
      if (data.includes(name)) return prev.filter((n) => n !== name);
      return [...prev, name];
    });

    setSelectedServices((prev) => {
      if (data.includes(name)) return prev.filter((s) => !(s.name === name && s.type === type));
      const item = (type === "Combo Package" ? allCombos : allCustom).find((c) => c.name === name);
      if (item) return [...prev, { name: item.name, platform: type === "Combo Package" ? "Combo" : "Custom", type, price: Number(item.price) }];
      return prev;
    });
  };

  return (
    <Card className="rounded-4 p-4 bg-light shadow-sm">
      <div className="mb-3 d-flex gap-3">
        {["Platform Based", "Combo Package", "Custom Package"].map((tab) => (
          <div className="form-check" key={tab}>
            <input
              className="form-check-input"
              type="radio"
              name="serviceTypeTab"
              id={`tab-${tab}`}
              checked={selectedService === tab}
              onChange={() => {
                setSelectedService(tab);
                setSelectedServicesData({});
                setSelectedComboData([]);
                setSelectedCustomData([]);
                setSelectedServices([]);
                setExpandedPlatform("instagram");
              }}
            />
            <label
              className="form-check-label ms-2"
              htmlFor={`tab-${tab}`}
              style={{ cursor: "pointer", color: "#1e293b" }}
            >
              {tab}
            </label>
          </div>
        ))}
      </div>

      {selectedService === "Platform Based" && (
        <PlatformServices
          selectedServicesData={selectedServicesData}
          handlePlatformChange={handlePlatformChange}
          expandedPlatform={expandedPlatform}
          setExpandedPlatform={setExpandedPlatform}
          selected={selected}
        />
      )}

      {(selectedService === "Combo Package" || selectedService === "Custom Package") && (
        <ComboCustomServices
          selectedService={selectedService}
          selectedComboData={selectedComboData}
          selectedCustomData={selectedCustomData}
          handleComboChange={handleComboChange}
          allCombos={allCombos}
          allCustom={allCustom}
        />
      )}
    </Card>
  );
};

export default ServiceTabs;