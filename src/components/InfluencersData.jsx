import axios from "axios";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const fallbackInfluencer = {
  id: 0,
  name: "Default Influencer",
  username: "default_user",
  category: "General",
  profilePic: "https://picsum.photos/200",
  stats: {
    instagram: "0",
    facebook: "0",
    twitter: "0",
    youtube: "0",
  },
  prices: {
    "Post Image/Video": "0₹",
    "Reels/Shorts": "0₹",
    "Story (Image/Video)": "0₹",
    "Short Video (<10m)": "0₹",
    "Video (>10m)": "0₹",
    Polls: "0₹",
  },
  data: {
    totalCampaigns: 0,
    avgLikes: 0,
    avgViews: "0",
    avgReach: "0",
    engagement: "0%",
    avgComments: 0,
    avgShares: 0,
    fakeFollowers: "0%",
  },
  posts: [],
  wishlist: false, // Add fallback wishlist field
};

const getInfluencersData = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token
    const response = await axios.get(`${baseURL}/api/influencers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data || [fallbackInfluencer];
  } catch (error) {
    console.error("❌ API fetch failed. Returning fallback data.", error);
    return [fallbackInfluencer];
  }
};

export default getInfluencersData;