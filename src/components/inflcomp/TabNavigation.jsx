import React from "react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="d-flex mb-4 w-100">
      {["services", "prices", "data"].map((tab) => (
        <button
          key={tab}
          className={`btn w-100 text-center fw-semibold py-2 shadow-sm border-0 ${
            activeTab === tab
              ? " border-bottom border-4 border-primary"
              : "bg-light text-dark"
          }`}
          style={{
            width: "33.33%",
            borderBottom:
              activeTab === tab
                ? "4px solid #0d6efd"
                : "4px solid transparent",
          }}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;