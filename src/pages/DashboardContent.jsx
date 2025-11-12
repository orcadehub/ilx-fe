import React, { useState, useEffect } from "react";
// React-Bootstrap removed in favor of Tailwind-only layout
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaArrowRight,
  FaBullseye,
  FaRupeeSign,
  FaShoppingCart,
  FaChartPie,
  FaUserFriends,
  FaImage,
  FaVideo,
  FaFilm,
  FaUserTie,
  FaUsers,
  FaHeadset,
  FaHandshake,
  FaMoneyCheckAlt,
  FaHourglassHalf,
  FaTasks,
} from "react-icons/fa";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
// framer-motion removed to simplify and satisfy linter; animations omitted
import PendingOrders from "../components/PendingOrders";
import TopBusinessUsers from "../components/TopBusinessUsers";
import AdminBusinUsers from "../components/AdminBusinUsers";
import fetchMetrics from "../components/dashboard/metrics"; // artifact_id: 257e42c5-69b0-4b09-951b-0c74c0e7edd6
import TopInfluencerUsers from "../components/TopInfluencerUsers";
import { ChartNoAxesColumn, Info, Plus } from 'lucide-react';
import { Tooltip } from "antd";
import TopPerformedOrders from "../components/TopPerformedOrders";
import TopInfluencersByOrders from "../components/TopInfluencersByOrders";
import TopBusinessUsersByOrders from "../components/TopBusinessUsersByOrders";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const role = user?.role || "business";

const staticTop = [
  {
    title: "Summer Collection",
    platform: [
      <FaInstagram className="mr-1" style={{ color: "#c13584" }} />,
      <FaInstagram style={{ color: "#c13584" }} />,
    ],
    type: [
      <span className="mr-1 inline-flex items-center rounded-full bg-cyan-500/15 px-2 py-0.5 text-xs font-medium text-cyan-600">reel</span>,
      <span className="inline-flex items-center rounded-full bg-blue-800/10 px-2 py-0.5 text-xs font-medium text-blue-800">story</span>,
    ],
    value: "92%",
    link: "/orders/summer-collection",
  },
  {
    title: "Product Launch",
    platform: [
      <FaYoutube style={{ color: "#b2071d" }} />,
    ],
    type: [
      <span className="inline-flex items-center rounded-full bg-amber-600/15 px-2 py-0.5 text-xs font-medium text-amber-700">video</span>,
    ],
    value: "89%",
    link: "/orders/product-launch",
  },
  {
    title: "Brand Promotion",
    platform: [
      <FaInstagram className="mr-1" style={{ color: "#c13584" }} />,
      <FaTiktok style={{ color: "#1e293b" }} />,
    ],
    type: [
      <span className="mr-1 inline-flex items-center rounded-full bg-emerald-600/15 px-2 py-0.5 text-xs font-medium text-emerald-700">post</span>,
      <span className="inline-flex items-center rounded-full bg-cyan-500/15 px-2 py-0.5 text-xs font-medium text-cyan-600">reel</span>,
    ],
    value: "85%",
    link: "/orders/brand-promotion",
  },
  {
    title: "Tutorial Series",
    platform: [
      <FaYoutube className="mr-1" style={{ color: "#b2071d" }} />,
      <FaTiktok style={{ color: "#1e293b" }} />,
    ],
    type: [
      <span className="mr-1 inline-flex items-center rounded-full bg-amber-600/15 px-2 py-0.5 text-xs font-medium text-amber-700">video</span>,
      <span className="inline-flex items-center rounded-full bg-cyan-500/15 px-2 py-0.5 text-xs font-medium text-cyan-600">short</span>,
    ],
    value: "82%",
    link: "/orders/tutorial-series",
  },
  {
    title: "Brand Partnership",
    platform: [
      <FaFacebook style={{ color: "#4267b2" }} />,
    ],
    type: [
      <span className="inline-flex items-center rounded-full bg-emerald-600/15 px-2 py-0.5 text-xs font-medium text-emerald-700">post</span>,
    ],
    value: "75%",
    link: "/orders/brand-partnership",
  },
];

const staticUsers = [
  {
    name: "Fashion Forward",
    handle: "@fashionforward",
    orders: 28,
    img: "https://picsum.photos/seed/fashion/100",
  },
  {
    name: "Tech Haven",
    handle: "@techhaven",
    orders: 24,
    img: "https://picsum.photos/seed/tech/100",
  },
  {
    name: "Beauty Essentials",
    handle: "@beautyessentials",
    orders: 20,
    img: "https://picsum.photos/seed/beauty/100",
  },
  {
    name: "Health First",
    handle: "@healthfirst",
    orders: 16,
    img: "https://picsum.photos/seed/health/100",
  },
  {
    name: "Fitness Hub",
    handle: "@fitnesshub",
    orders: 14,
    img: "https://picsum.photos/seed/fitness/100",
  },
];

// Placeholder for future API calls
const fetchTopOrders = async () => {
  // Simulate API call (replace with actual API later)
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticTop), 1000);
  });
};

const fetchTopUsers = async () => {
  // Simulate API call (replace with actual API later)
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticUsers), 1000);
  });
};

// animations removed

function DashboardContent() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [top, setTop] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingTop, setLoadingTop] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const token = localStorage.getItem("token") || "your_jwt_token";

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingMetrics(true);
        const fetchedMetrics = await fetchMetrics(token);
        setMetrics(fetchedMetrics);
      } catch (err) {
        console.error("Error fetching metrics:", err.message);
      } finally {
        setLoadingMetrics(false);
      }

      try {
        setLoadingTop(true);
        const fetchedTop = await fetchTopOrders();
        setTop(fetchedTop);
      } catch (err) {
        console.error("Error fetching top orders:", err.message);
      } finally {
        setLoadingTop(false);
      }

      try {
        setLoadingUsers(true);
        const fetchedUsers = await fetchTopUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error fetching top users:", err.message);
      } finally {
        setLoadingUsers(false);
      }
    };

    getData();
  }, [token]);

  return (
    <div
      className="py-4 px-3 md:px-20 overflow-x-hidden"
      style={{ minHeight: "100vh", backgroundColor: "var(--bgPage2)" }}
    >
      <div className="!w-full">
        {/* header hero */}
        <div>
          <div
            className="flex flex-col md:flex-row  md:justify-between items-center mb-3 md:mb-2"
          >
            <div className='md:!flex-1 text-left md:!text-left !w-full'>
              <h4 className="fw-semibold mb-1 !text-[var(--text)]"
              >
                {role === "admin"
                  ? "Admin Dashboard"
                  : role === "influencer"
                    ? "Influencer Dashboard"
                    : "Business Dashboard"}
              </h4>
              <p
                className=" text-14 !font-normal !text-[var(--mutedText)]"
              >
                Monitor performance, orders, influencers, and more.
              </p>
            </div>
            <div className='md:!flex-1 md:!flex  justify-end text-center md:!text-right hidden '>
              <button
                className="flex items-center !rounded-lg py-2 px-3 text-white bg-blue-700 hover:bg-blue-600 transition"
                onClick={() => navigate("/dashboard/influencers")}
                style={{ fontSize: '14px' }}
              >
                <Plus className='mx-2' size='14' />  Find Influencers
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        {loadingMetrics && metrics.length === 0 ? (
          <div className="px-3 mb-3">
            <div className="flex justify-center items-center min-h-[120px]">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              <span className="ml-3 text-slate-600">Loading metrics...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-3 xl:gap-4 mb-4">
            {metrics.length > 0 ? (
              metrics.map((card) => (
                <div
                  key={card.title}
                  onClick={() => navigate(card.path)}
                  className="hover:shadow-lg border  !border-[var(--border)] !bg-[var(--card)] cursor-pointer rounded-xl  md:p-4 flex flex-col justify-between p-3"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-14 text-[var(--mutedText)] font-normal">
                      <span>{card.title}</span>
                      {card.infoText && (
                        <Tooltip
                          placement="top"
                          title={card.infoText}
                          color="geekblue"
                        >
                          <Info size={14} className="ml-1 cursor-pointer flex-shrink-0" />
                        </Tooltip>
                      )}
                    </div>
                    <div className="text-blue flex items-center">{card.icon}</div>
                  </div>

                  {/* Value */}
                  <h5
                    className={`!font-bold !text-[25px] ${(() => {
                        let val = card?.value;
                        if (typeof val === "string" && val.includes("/")) {
                          const [num, den] = val.split("/").map(Number);
                          val = den === 0 ? 0 : (num / den) * 100;
                        } else {
                          val = Number(val) || 0; 
                        }

                        if (val <= 40 && card.infoText) return "!text-yellow-600";
                      if (val <= 70 && card.infoText) return "!text-orange-500";
                      if (val >= 71 && val<=100 && card.infoText) return "!text-green-500";
                        return "text-[var(--text)]";
                      })()
                      }`}
                  >
                    {card.value.includes("/") || card.value.includes("₹") ? (
                      card.value
                    ) : (
                      <CountUp
                        start={0}
                        end={parseInt(card.value, 10) || 0}
                        duration={2}
                        separator=","
                      />
                    )}
                  </h5>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-[var(--mutedText)]">
                No metrics available
              </p>
            )}
          </div>

        )}

        {/* Top Content Section */}
        {role !== "admin" && (
          <div className="mb-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top Performed Orders */}
            <TopPerformedOrders loadingTop={loadingTop} />
            

            {/* Top Influencers by Orders */}
            <TopInfluencersByOrders />
          </div>
        )}

        {role !== "admin" && (
          <div
            className="flex flex-col gap-4 mb-3 py-3 rounded"
            // style={{ backgroundColor: "var(--primary-color)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <PendingOrders />
              </div>
              <div>
                <TopBusinessUsersByOrders />
              </div>
            </div>
          </div>
        )}

        {role === "admin" && (
          <div className="mb-4 px-4 py-3 rounded shadow-sm bg-white">
            <AdminBusinUsers />
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardContent;