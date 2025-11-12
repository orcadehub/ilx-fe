import React from "react";

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="d-flex mb-4 w-100 md:px-3 !gap-2">
      <div className="flex w-100  p-1 !gap-2 rounded-xl !bg-[var(--hover2)]">
      {["services", "prices", "data"].map((tab) => (
        <button
          key={tab}
          className={`btn w-100 text-center !font-medium text-14 py-1 border-0 !text-[var(--text)] ${
            activeTab === tab
            ? " border-bottom border-2 border-primary !bg-[var(--bg)]"
              : ""
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}

      </div>
    </div>
  );
};

export default TabNavigation;