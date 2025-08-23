import React from "react";
import { Row, Col } from "react-bootstrap";
import EngagementChart from "./EngagementChart";
import PerformanceChart from "./PerformanceChart";

const DataTab = ({ selected }) => {
  // Default stats (aggregate, not per platform)
  const defaultStats = {
    totalCampaigns: "0",
    avgLikes: "0",
    avgViews: "0K",
    avgReach: "0K",
    engagement: "0%",
    avgComments: "0",
    avgShares: "0",
    fakeFollowers: "0%"
  };

  // ✅ Only use stats if it's valid and not platform-specific
  const stats =
    selected?.stats &&
    !Array.isArray(selected.stats) && // prevent arrays
    Object.keys(selected.stats).length > 0
      ? selected.stats
      : defaultStats;

  return (
    <Row className="g-4">
      {Object.entries(stats).map(([label, value]) => (
        <Col xs={6} md={3} key={label}>
          <div className="bg-light border rounded-4 p-3 text-center shadow-sm">
            <div className="fs-5 fw-bold">
              {typeof value === "object"
                ? value?.name || value?.id || JSON.stringify(value)
                : value}
            </div>
            <div className="small text-muted">
              {label
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </div>
          </div>
        </Col>
      ))}

      {/* Area Chart */}
      <Col md={6}>
        <EngagementChart />
      </Col>

      {/* Pie Chart */}
      <Col md={6}>
        <PerformanceChart />
      </Col>
    </Row>
  );
};

export default DataTab;
