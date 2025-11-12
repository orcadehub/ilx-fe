import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import BusinessInfo from "../components/profile/BusinessInfo";
import ServicesTab from "../components/profile/ServicesTab";
import DataTab from "../components/profile/DataTab";
import Edit from "./Edit";
import TabsButton from '../components/TabsButton'
import GalleryTab from "../components/profile/GalleryTab";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const normalizeUserData = (user) => {
  // console.log("Normalizing user data:", user); // Log raw API response
  return {
    ...user,
    id: user?.id || null,
    business_name: user?.business_name || "ABC Company",
    category: user?.category || "XYZ Products",
    business_status: user?.business_status || "Not Registered",
    service_type: user?.service_type || "Online & Offline",
    website: user?.website || "www.xyz.com",
    location: user?.location || "[Address]",
    price_range: user?.price_range || "₹5,000 - 50,000",
    account_status: user?.account_status || "Select",
    prices: user?.prices || {
      facebook: {},
      instagram: {},
      youtube: {},
      twitter: {},
      combos: [],
      custom: [],
    }, // Ensure prices is always defined
    data: user?.data || {
      facebook: { total_followers: 0 },
      instagram: { total_followers: 0 },
      youtube: { total_followers: 0 },
      twitter: { total_followers: 0 },
    }, // Ensure data is always defined
  };
};

function Profile() {
  const navigate = useNavigate();
  const { id: routeId } = useParams(); // id from URL param
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [activeKey, setActiveKey] = useState('services');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const numericId = Number(routeId);
      if (!routeId || isNaN(numericId) || numericId <= 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/dashboard/user/${numericId}`);
        
        // Check if this is the logged-in user's profile
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        // console.log('Full logged in user:', loggedInUser);
        // console.log('Logged in user ID:', loggedInUser.id, 'Profile ID:', numericId);
        setIsOwnProfile(loggedInUser.id && Number(loggedInUser.id) === Number(numericId));
        
        const userData = { ...res.data.user, ...res.data.profile };
        setUser(normalizeUserData(userData));
      } catch (err) {
        console.error("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [routeId]);

  const handleMessage = () => {
    if (routeId) {
      navigate(`/dashboard/chats/${routeId}`);
    }
  };

  const bizImages = [
    "https://picsum.photos/seed/biz1/200/150",
    "https://picsum.photos/seed/biz2/200/150",
    "https://picsum.photos/seed/biz3/200/150",
    "https://picsum.photos/seed/biz4/200/150",
    "https://picsum.photos/seed/biz5/200/150",
    "https://picsum.photos/seed/biz6/200/150",
  ];

  const platformData = [
    { name: "Facebook", orders: 160, icon: "Facebook" },
    { name: "Instagram", orders: 120, icon: "Instagram" },
    { name: "YouTube", orders: 80, icon: "Youtube" },
    { name: "Twitter", orders: 100, icon: "Twitter" },
  ];

  const pieData = [
    { name: "Links Generated", value: 60 },
    { name: "Clicks Received", value: 40 },
  ];

  const monthlyOrdersData = [
    { month: "Jan", orders: 30 },
    { month: "Feb", orders: 45 },
    { month: "Mar", orders: 60 },
    { month: "Apr", orders: 75 },
    { month: "May", orders: 90 },
    { month: "Jun", orders: 75 },
    { month: "Jul", orders: 60 },
    { month: "Aug", orders: 45 },
    { month: "Sep", orders: 60 },
    { month: "Oct", orders: 75 },
    { month: "Nov", orders: 90 },
    { month: "Dec", orders: 100 },
  ];

  const data = [
    { key: 'services', label: 'Services' },
    { key: 'data', label: 'Data' },
    { key: 'gallery', label: 'Gallery' }, 
  ];

  // console.log("Rendering Profile with user:", user); // Log user state

  if (loading) {
    return (
      <Container fluid className="p-3 xl:!px-20 !bg-[var(--bgPage2)]" style={{ minHeight: "100vh" }}>
        <div className="border !border-[var(--border)] rounded-2xl !bg-[var(--card)] p-4">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-300 rounded mb-4"></div>
            <div className="flex gap-4">
              <div className="w-1/3">
                <div className="h-64 bg-gray-300 rounded"></div>
              </div>
              <div className="w-2/3">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-48 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-3 xl:!px-20 !bg-[var(--bgPage2)]"
      style={{  minHeight: "100vh" }}>
      <div className="border !border-[var(--border)] rounded-2xl !bg-[var(--card)]">
        <ProfileHeader user={user} handleMessage={handleMessage} />
        <Container className="mt-4">
          <Row>
            <Col lg={4} md={12} className="mb-4">
              <BusinessInfo user={user} bizImages={bizImages} setUser={setUser} setShowEdit={setShowEdit} isOwnProfile={isOwnProfile} />
            </Col>
            <Col lg={8} md={12}>
              <Card className=" rounded !bg-[var(--card)] border-0">
                <div className="!h-full w-[100%]">
                  <TabsButton activeKey={activeKey} data={data} setActiveKey={setActiveKey}  />
                  {activeKey == 'services' && <ServicesTab user={user} />}
                  {activeKey == 'data' && <DataTab
                    platformData={platformData}
                    pieData={pieData}
                    monthlyOrdersData={monthlyOrdersData}
                  />}
                  {activeKey == 'gallery' && <GalleryTab user={user} />}
                </div>
              </Card>
            </Col>
          </Row>
        </Container>

      </div>

      {showEdit && (
        <Edit
          user={user}
          onSave={(updatedData) => {
            // Update user state with form data immediately
            const updatedUser = { ...user, ...updatedData };
            setUser(normalizeUserData(updatedUser));
            setShowEdit(false);
          }}
          onClose={() => {
            setShowEdit(false);
          }}
        />
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Container>
  );
}

export default Profile;