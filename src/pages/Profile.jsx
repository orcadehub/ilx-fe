// src/components/Profile.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import { Collection, GraphUp } from "react-bootstrap-icons";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import BusinessInfo from "../components/profile/BusinessInfo";
import ServicesTab from "../components/profile/ServicesTab";
import DataTab from "../components/profile/DataTab";
import Edit from "./Edit";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

const normalizeUserData = (user) => ({
  ...user,
  business_name: user.business_name || "ABC Company",
  category: user.category || "XYZ Products",
  business_status: user.business_status || "Not Registered",
  service_type: user.service_type || "Online & Offline",
  website: user.website || "www.xyz.com",
  location: user.location || "[Address]",
  price_range: user.price_range || "₹5,000 - 50,000",
  account_status: user.account_status || "Select",
});

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const localUserString = localStorage.getItem("user");
        const localUser = JSON.parse(localUserString);
        if (!localUser || !localUser.email) {
          console.warn("User or email missing in localStorage");
          return;
        }

        const res = await axios.get(
          `${baseURL}/api/user-details/${localUser.email}`
        );
        setUser(normalizeUserData(res.data));
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleMessage = () => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    navigate(`/dashboard/chats/${localUser.id}`);
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

  return (
    <Container
      fluid
      className="p-0"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <ProfileHeader user={user} handleMessage={handleMessage} />
      <Container className="mt-4">
        <Row>
          <Col lg={3} md={12} className="mb-4">
            <BusinessInfo
              user={user}
              bizImages={bizImages}
              setUser={setUser}
              setShowEdit={setShowEdit}
            />
          </Col>
          <Col lg={9} md={12}>
            <Card
              className="shadow-sm border-0 rounded"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <Tabs
                defaultActiveKey="services"
                className="border-0"
                justify
                variant="underline"
              >
                <Tab eventKey="services" title="Services">
                  <ServicesTab />
                </Tab>
                <Tab eventKey="data" title="Data">
                  <DataTab
                    platformData={platformData}
                    pieData={pieData}
                    monthlyOrdersData={monthlyOrdersData}
                  />
                </Tab>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Container>
      {showEdit && (
        <Edit
          user={user}
          onSave={(updatedUser) => {
            setUser(normalizeUserData(updatedUser));
            setShowEdit(false);
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </Container>
  );
}

export default Profile;