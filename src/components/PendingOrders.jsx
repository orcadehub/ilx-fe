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
import { Clock, Eye, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { pendingOrders } from "../data/topInflencersData";
import NewTable from '../components/NewTable'

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



  const columns = [
    {
      title: (
        <div className="text-14 text-gray-500">
          Order </div>
      ),
      dataIndex: "infname",
      key: "infname",
      width: "20%",
      render: (text) => <span className="capitalize text-12 !font-semibold">{text}</span>,
    },
    {
      title: <div className="text-14 text-gray-500">Influencer</div>,
      dataIndex: "influencer",
      key: "influencer",
      // width: "16%",
      render: (text) => <span className={text !== "N/A" ? "capitalize text-12" : ""}>{text}</span>,
    },
    {
      title: <div className="text-14 text-gray-500">Platform</div>,
      dataIndex: "platform",
      key: "platform",
      // width: "16%",
      render: (platforms) => (
        <div className="flex gap-2 items-center">
          {platforms?.map((platform, idx) => {
            switch (platform.toLowerCase()) {
              case "instagram":
                return <Instagram key={idx} size={15} className="text-pink-500" />;
              case "facebook":
                return <Facebook key={idx} size={15} className="text-blue-600" />;
              case "youtube":
                return <Youtube key={idx} size={15} className="text-red-500" />;
              case "twitter":
                return <Twitter key={idx} size={15} className="text-sky-500" />;
              default:
                return (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                  >
                    {platform}
                  </span>
                );
            }
          })}
        </div>
      ), 
    },
    {
      title: <div className="text-14 text-gray-500">Type</div>,
      dataIndex: "type",
      key: "type",
      render: (types) => {
        const typeColors = {
          reel: "bg-purple-100 text-purple-700",
          video: "bg-red-100 text-red-700",
          post: "bg-blue-100 text-blue-700",
          story: "bg-green-100 text-green-700",
        };

        return (
          <div className="flex gap-2 flex-wrap">
            {Array.isArray(types) &&
              types.map((text, index) => {
                const classes = typeColors[text?.toLowerCase()] || "bg-gray-100 text-gray-700";
                return (
                  <span
                    key={index}
                    className={`capitalize text-[10px] font-semibold  px-[5px] py-[1px] rounded-md  ${classes}`}
                  >
                    {text}
                  </span>
                );
              })}
          </div>
        );
      },
    },
    {
      title: <div className="text-14 text-gray-500">Status</div>,
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const statusColors = {
          active: "bg-green-100 text-green-700",
          pending: "bg-yellow-100 text-yellow-700",
          completed: "bg-blue-100 text-blue-700",
          cancelled: "bg-red-100 text-red-700",
        };

        const classes =
          statusColors[text?.toLowerCase()] || "bg-gray-100 text-gray-700";

        return (
          <span
            className={`capitalize text-[10px] font-semibold  px-[5px] py-[1px] rounded-md ${classes}`}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: <div className="text-14 text-center text-gray-500">Action</div>,
      dataIndex: "shortlistStatus",
      key: "shortlistStatus",
      width: "5%",
      align: "center",
      render: () =>
        <div className='flex justify-center items-center'>
          <Eye size={12} />  </div>
      ,
    },
   
  ];

  const dataSource = pending.slice(0, 5).map((order) => ({
    key: order.id,
    infname: `Order #${order.id}`,
    influencer: order.influencer_name || 'N/A',
    platform: [order.platform || 'Unknown'],
    type: [order.content_type || order.order_type || 'Unknown'],
    status: order.status || 'pending',
    orderDate: order.created_at
  }));

  return (
    <Card
      className=" border !border-[var(--border)] !bg-[var(--card)] !text-[var(--text)] h-full!"
      // style={{ backgroundColor: "#fff", borderRadius: "1rem" }}
    >
      <Card.Body>
        <div className="flex !justify-between !items-center mb-4">
          <div className="!text-[16px] flex !justify-center !items-center"
            // style={{ color: "#1e293b" }}
          >
            <Clock size='16' className="text-blue mr-2 " /> Pending Orders
          </div>
          <button
            className="!text-[12px] flex items-center hover:text-blue"
            // style={{
            //   cursor: "pointer",
            //   backgroundColor: "#fff",
            //   color: "#1e293b",
            // }}
            onClick={() => navigate("/dashboard/orders")}
          >
            View All <FaArrowRight className="ml-1" size={12} />
          </button>
        </div>

        <div className='h-full max-h-[300px] overflow-y-auto'
          // style={{ maxHeight: 300, overflowY: "auto" }}
        >
          <div className="d-flex flex-column">
            {/* <div
              className="d-flex text-muted py-2 px-3 text-14"
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
            </div> */}

            {loading ? (
              <div className="py-4 text-center text-muted">Loading…</div>
            ) : pending.length === 0 ? (
              <div className="py-4 text-center text-muted">
                No pending orders
              </div>
            ) : (
              <NewTable columns={columns} dataSource={dataSource} />
                  // <span>hii</span>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PendingOrders;
