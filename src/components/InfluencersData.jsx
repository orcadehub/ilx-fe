import axios from "axios";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const fallbackInfluencer = {
  id: 0,
  name: "Default Influencer",
  username: "@default_user",
  category: "General",
  profilePic: "https://picsum.photos/200",
  bio: "Default influencer profile",
  location_city: "Mumbai",
  location_state: "Maharashtra",
  data: {
    instagram: { total_followers: 0, posts_count: 0, engagement_rate: 0 },
    facebook: { total_followers: 0, posts_count: 0, engagement_rate: 0 },
    youtube: { total_followers: 0, posts_count: 0, engagement_rate: 0 },
    twitter: { total_followers: 0, posts_count: 0, engagement_rate: 0 },
    totalCampaigns: 0,
    avgLikes: 0,
    avgViews: "0",
    avgReach: "0",
    engagement: "0%",
    avgComments: 0,
    avgShares: 0,
    fakeFollowers: "0%",
  },
  services: {
    platforms: ['instagram', 'facebook', 'youtube', 'twitter'],
    contentTypes: ['Post Image/Video', 'Reels/Shorts', 'Story (Image/Video)', 'Short Video (<10m)', 'Video (>10m)', 'Polls']
  },
  prices: {
    instagram: {
      "Post Image/Video": 0,
      "Reels/Shorts": 0,
      "Story (Image/Video)": 0,
      "Short Video (<10m)": 0,
      "Video (>10m)": 0,
      "Polls": 0
    },
    facebook: {},
    youtube: {},
    twitter: {},
    combos: []
  },
  posts: [],
  wishlist: false
};

const getInfluencersData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, returning fallback data');
      return [fallbackInfluencer];
    }
    
    const response = await axios.get(`${baseURL}/api/influencers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    console.log('✅ Influencers data fetched:', response.data.length, 'influencers');
    return response.data && response.data.length > 0 ? response.data : [fallbackInfluencer];
  } catch (error) {
    console.error("❌ API fetch failed. Returning fallback data.", error);
    return [fallbackInfluencer];
  }
};

export default getInfluencersData;