import { FaBullseye, FaRupeeSign, FaShoppingCart, FaChartPie, FaUserFriends, FaImage, FaVideo, FaFilm, FaUserTie, FaUsers, FaHeadset, FaHandshake, FaMoneyCheckAlt, FaHourglassHalf, FaTasks } from "react-icons/fa";
import config from "../../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const fetchMetrics = async (token) => {
  try {
    // Get role from localStorage, default to "business"
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.role || "business";

    // Initialize metrics based on role
    let metrics = (() => {
      if (role === "admin") {
        return [
          {
            title: "Total Influencers",
            value: "0",
            icon: <FaUserFriends className="text-info fs-3" style={{ color: "#06b6d4" }} />,
            path: "/influencers",
          },
          {
            title: "Business Users",
            value: "0",
            icon: <FaUserTie className="text-primary fs-3" style={{ color: "#1e40af" }} />,
            path: "/business-users",
          },
          {
            title: "Team Members",
            value: "0",
            icon: <FaUsers className="text-warning fs-3" style={{ color: "#d97706" }} />,
            path: "/team",
          },
          {
            title: "Active Support Tickets",
            value: "0",
            icon: <FaHeadset className="text-danger fs-3" style={{ color: "#dc2626" }} />,
            path: "/support",
          },
          {
            title: "Total Campaigns",
            value: "0",
            icon: <FaHandshake className="text-success fs-3" style={{ color: "#059669" }} />,
            path: "/campaigns",
          },
          {
            title: "Total Transactions",
            value: "0",
            icon: <FaMoneyCheckAlt className="text-secondary fs-3" style={{ color: "#475569" }} />,
            path: "/transactions",
          },
          {
            title: "Pending Withdrawals",
            value: "0",
            icon: <FaHourglassHalf className="text-danger fs-3" style={{ color: "#dc2626" }} />,
            path: "/withdrawals",
          },
          {
            title: "Service Orders",
            value: "0",
            icon: <FaTasks className="text-primary fs-3" style={{ color: "#1e40af" }} />,
            path: "/service-orders",
          },
        ];
      }

      const isInfluencer = role === "influencer";

      return [
        !isInfluencer && {
          title: "Campaign Impact Score",
          value: "10/100",
          icon: <FaBullseye className="text-danger fs-3" style={{ color: "#dc2626" }} />,
          path: "/impact-score",
        },
        isInfluencer && {
          title: "Earnings",
          value: "₹0",
          icon: <FaRupeeSign className="text-success fs-3" style={{ color: "#059669" }} />,
          path: "/earnings",
        },
        {
          title: "Total Orders",
          value: "0",
          icon: <FaShoppingCart className="text-primary fs-3" style={{ color: "#1e40af" }} />,
          path: "/orders",
        },
        {
          title: "Active/Total Campaigns",
          value: "0/0",
          icon: <FaChartPie className="text-success fs-3" style={{ color: "#059669" }} />,
          path: "/campaigns",
        },
        {
          title: "Connected Influencers",
          value: "0",
          icon: <FaUserFriends className="text-info fs-3" style={{ color: "#06b6d4" }} />,
          path: "/influencers",
        },
        {
          title: "Total Posts",
          value: "0",
          icon: <FaImage className="text-warning fs-3" style={{ color: "#d97706" }} />,
          path: "/posts",
        },
        {
          title: "Reels",
          value: "0",
          icon: <FaVideo className="text-secondary fs-3" style={{ color: "#475569" }} />,
          path: "/reels",
        },
        {
          title: "Videos",
          value: "0",
          icon: <FaFilm className="text-primary fs-3" style={{ color: "#1e40af" }} />,
          path: "/videos",
        },
        {
          title: "Stories",
          value: "0",
          icon: <FaVideo className="text-danger fs-3" style={{ color: "#dc2626" }} />,
          path: "/shorts",
        },
      ].filter(Boolean);
    })();

    // Fetch metrics from API
    const endpoint = role === "admin" ? "/api/metrics/admin" : `/api/metrics/${user?.id || ''}`;
    const response = await fetch(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch metrics for ${role}:`, response.statusText);
      return metrics; // Return default metrics on failure
    }

    const data = await response.json();

    // Update metrics based on role
    if (role === "admin") {
      metrics = [
        {
          title: "Total Influencers",
          value: data.total_influencers || "0",
          icon: <FaUserFriends className="text-info fs-3" style={{ color: "#06b6d4" }} />,
          path: "/influencers",
        },
        {
          title: "Business Users",
          value: data.business_users || "0",
          icon: <FaUserTie className="text-primary fs-3" style={{ color: "#1e40af" }} />,
          path: "/business-users",
        },
        {
          title: "Team Members",
          value: data.team_members || "0",
          icon: <FaUsers className="text-warning fs-3" style={{ color: "#d97706" }} />,
          path: "/team",
        },
        {
          title: "Active Support Tickets",
          value: data.active_support_tickets || "0",
          icon: <FaHeadset className="text-danger fs-3" style={{ color: "#dc2626" }} />,
          path: "/support",
        },
        {
          title: "Total Campaigns",
          value: data.total_campaigns || "0",
          icon: <FaHandshake className="text-success fs-3" style={{ color: "#059669" }} />,
          path: "/campaigns",
        },
        {
          title: "Total Transactions",
          value: data.total_transactions || "0",
          icon: <FaMoneyCheckAlt className="text-secondary fs-3" style={{ color: "#475569" }} />,
          path: "/transactions",
        },
        {
          title: "Pending Withdrawals",
          value: data.pending_withdrawals || "0",
          icon: <FaHourglassHalf className="text-danger fs-3" style={{ color: "#dc2626" }} />,
          path: "/withdrawals",
        },
        {
          title: "Service Orders",
          value: data.service_orders || "0",
          icon: <FaTasks className="text-primary fs-3" style={{ color: "#1e40af" }} />,
          path: "/service-orders",
        },
      ];
    } else {
      const isInfluencer = role === "influencer";
      metrics = [
        !isInfluencer && {
          title: "Campaign Impact Score",
          value: "10/100",
          icon: <FaBullseye className="text-danger fs-3" style={{ color: "#dc2626" }} />,
          path: "/impact-score",
        },
        isInfluencer && {
          title: "Earnings",
          value: data.earnings || "₹0",
          icon: <FaRupeeSign className="text-success fs-3" style={{ color: "#059669" }} />,
          path: "/earnings",
        },
        {
          title: "Total Orders",
          value: data.total_orders || "0",
          icon: <FaShoppingCart className="text-primary fs-3" style={{ color: "#1e40af" }} />,
          path: "/orders",
        },
        {
          title: "Active/Total Campaigns",
          value: data.active_campaigns || "0/0",
          icon: <FaChartPie className="text-success fs-3" style={{ color: "#059669" }} />,
          path: "/campaigns",
        },
        {
          title: "Connected Influencers",
          value: data.connected_influencers || "0",
          icon: <FaUserFriends className="text-info fs-3" style={{ color: "#06b6d4" }} />,
          path: "/influencers",
        },
        {
          title: "Total Posts",
          value: data.total_posts || "0",
          icon: <FaImage className="text-warning fs-3" style={{ color: "#d97706" }} />,
          path: "/posts",
        },
        {
          title: "Reels",
          value: data.reels || "0",
          icon: <FaVideo className="text-secondary fs-3" style={{ color: "#475569" }} />,
          path: "/reels",
        },
        {
          title: "Videos",
          value: data.videos || "0",
          icon: <FaFilm className="text-primary fs-3" style={{ color: "#1e40af" }} />,
          path: "/videos",
        },
        {
          title: "Stories",
          value: data.stories || "0",
          icon: <FaVideo className="text-danger fs-3" style={{ color: "#dc2626" }} />,
          path: "/shorts",
        },
      ].filter(Boolean);
    }

    return metrics;
  } catch (err) {
    console.error("Error in fetchMetrics:", err.message);
    // Return default metrics on error
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user?.role || "business";
    const isInfluencer = role === "influencer";
    return role === "admin"
      ? [
          {
            title: "Total Influencers",
            value: "0",
            icon: <FaUserFriends className="text-info fs-3" style={{ color: "#06b6d4" }} />,
            path: "/influencers",
          },
          {
            title: "Business Users",
            value: "0",
            icon: <FaUserTie className="text-primary fs-3" style={{ color: "#1e40af" }} />,
            path: "/business-users",
          },
          {
            title: "Team Members",
            value: "0",
            icon: <FaUsers className="text-warning fs-3" style={{ color: "#d97706" }} />,
            path: "/team",
          },
          {
            title: "Active Support Tickets",
            value: "0",
            icon: <FaHeadset className="text-danger fs-3" style={{ color: "#dc2626" }} />,
            path: "/support",
          },
          {
            title: "Total Campaigns",
            value: "0",
            icon: <FaHandshake className="text-success fs-3" style={{ color: "#059669" }} />,
            path: "/campaigns",
          },
          {
            title: "Total Transactions",
            value: "0",
            icon: <FaMoneyCheckAlt className="text-secondary fs-3" style={{ color: "#475569" }} />,
            path: "/transactions",
          },
          {
            title: "Pending Withdrawals",
            value: "0",
            icon: <FaHourglassHalf className="text-danger fs-3" style={{ color: "#dc2626" }} />,
            path: "/withdrawals",
          },
          {
            title: "Service Orders",
            value: "0",
            icon: <FaTasks className="text-primary fs-3" style={{ color: "#1e40af" }} />,
            path: "/service-orders",
          },
        ]
      : [
          !isInfluencer && {
            title: "Campaign Impact Score",
            value: "10/100",
            icon: <FaBullseye className="text-danger fs-3" style={{ color: "#dc2626" }} />,
            path: "/impact-score",
          },
          isInfluencer && {
            title: "Earnings",
            value: "₹0",
            icon: <FaRupeeSign className="text-success fs-3" style={{ color: "#059669" }} />,
            path: "/earnings",
          },
          {
            title: "Total Orders",
            value: "0",
            icon: <FaShoppingCart className="text-primary fs-3" style={{ color: "#1e40af" }} />,
            path: "/orders",
          },
          {
            title: "Active/Total Campaigns",
            value: "0/0",
            icon: <FaChartPie className="text-success fs-3" style={{ color: "#059669" }} />,
            path: "/campaigns",
          },
          {
            title: "Connected Influencers",
            value: "0",
            icon: <FaUserFriends className="text-info fs-3" style={{ color: "#06b6d4" }} />,
            path: "/influencers",
          },
          {
            title: "Total Posts",
            value: "0",
            icon: <FaImage className="text-warning fs-3" style={{ color: "#d97706" }} />,
            path: "/posts",
          },
          {
            title: "Reels",
            value: "0",
            icon: <FaVideo className="text-secondary fs-3" style={{ color: "#475569" }} />,
            path: "/reels",
          },
          {
            title: "Videos",
            value: "0",
            icon: <FaFilm className="text-primary fs-3" style={{ color: "#1e40af" }} />,
            path: "/videos",
          },
          {
            title: "Stories",
            value: "0",
            icon: <FaVideo className="text-danger fs-3" style={{ color: "#dc2626" }} />,
            path: "/shorts",
          },
        ].filter(Boolean);
  }
};

export default fetchMetrics;