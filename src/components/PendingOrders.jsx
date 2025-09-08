import React, { useEffect, useMemo, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import {
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaArrowRight,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const iconForPlatform = (p) => {
  const map = {
    Instagram: <FaInstagram className="text-danger me-1" />,
    YouTube: <FaYoutube className="text-danger me-1" />,
    Twitter: <FaTwitter className="text-info me-1" />,
    Facebook: <FaFacebook className="text-primary me-1" />,
  };
  return map[p] || null;
};

const safeParse = (val, fallback) => {
  try {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") return JSON.parse(val);
    return fallback;
  } catch {
    return fallback;
  }
};

const PendingOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // renamed
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${baseURL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch orders");
        if (alive) setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch {
        if (alive) setOrders([]);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  // Log orders once whenever they change (after setOrders completes render)
  useEffect(() => {
    if (orders.length) {
      console.log("Orders:", orders);
    } else {
      console.log("Orders: []");
    }
  }, [orders]); // logs after state update, not immediately after setOrders [1][2]

  // Filter only pending
  const pending = useMemo(
    () =>
      (orders || []).filter(
        (o) => (o.status || "").toLowerCase() === "pending"
      ),
    [orders]
  );



  const typeColor = (type) => {
    const t = (type || "").toLowerCase();
    if (t.includes("reel") || t.includes("short")) return "#06b6d4";
    if (t.includes("story")) return "#1e40af";
    if (t.includes("video") || t.includes("post")) return "#059669";
    return "#475569";
  };

  return (
    <Card
      className="shadow-sm border-0"
      style={{ backgroundColor: "#fff", borderRadius: "1rem" }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold" style={{ color: "#1e293b" }}>
            🕒 Pending Orders
          </h5>
          <Badge
            bg="light"
            text="dark"
            className="rounded-pill px-3 py-2 shadow-sm"
            style={{
              cursor: "pointer",
              backgroundColor: "#fff",
              color: "#1e293b",
            }}
            onClick={() => navigate("/dashboard/orders")}
          >
            View All <FaArrowRight className="ms-2" size={12} />
          </Badge>
        </div>

        <div style={{ maxHeight: 300, overflowY: "auto" }}>
          <div className="d-flex flex-column">
            <div
              className="d-flex text-muted py-2 px-3"
              style={{
                borderBottom: "1px solid #e5e7eb",
                fontWeight: 500,
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1,
                background: "#fff",
              }}
            >
              <div style={{ flex: 0.5, padding: 8 }}>Order</div>
              <div style={{ flex: 1.5, padding: 8 }}>Influencer</div>
              <div style={{ flex: 1, padding: 8 }}>Platform</div>
              <div style={{ flex: 1.5, padding: 8 }}>Type</div>
              <div style={{ flex: 1, padding: 8 }}>Status</div>
              <div style={{ flex: 0.5, padding: 8, textAlign: "end" }}>
                Action
              </div>
            </div>

            {loading ? (
              <div className="py-4 text-center text-muted">Loading…</div>
            ) : orders.length === 0 ? (
              <div className="py-4 text-center text-muted">
                No pending orders
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="d-flex"
                  onClick={() => navigate(`/orders/${order.id}`)}
                  style={{
                    backgroundColor: "#fff",
                    padding: 8,
                    borderBottom: "1px solid #e5e7eb",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e2e8f0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  <div className="fw-medium" style={{ flex: 0.5, padding: 8 }}>
                    {order.id}
                  </div>
                  <div style={{ flex: 1.5, padding: 8 }}>{order.infname}</div>
                  <div style={{ flex: 1, padding: 8 }}>
                    {order.services[0].platform}
                  </div>
                  <div style={{ flex: 1.5, padding: 8 }}>
                    {order.services[0].name}
                  </div>
                  <div style={{ flex: 1, padding: 8 }}>
                    <Badge
                      className="text-capitalize"
                    
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div style={{ flex: 0.5, padding: 8, textAlign: "end" }}>
                    <FaEye
                      className="text-dark"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/orders/${order.id}`);
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PendingOrders;
