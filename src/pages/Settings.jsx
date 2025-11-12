import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Tabs, Tab } from "react-bootstrap";
import {
  PersonFill,
  ShieldLockFill,
  BellFill,
  ShareFill,
  BoxArrowRight,
} from "react-bootstrap-icons";

import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";
import SocialTab from "./SocialTab";
import { Bell, Lock, LogOut, Share2, User } from "lucide-react";
import TabsButton from "../components/TabsButton";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    console.log("User logged out");
  };

  const data = [
    {
      key: "profile", label: "Profile", icon: <User size={14} />, component: <ProfileTab />
    },
    {
      key: "security", label: "Security", icon: <Lock size={14} />, component: <SecurityTab />
    },
    {
      key: "notifications", label: "Notifications", icon: <Bell size={14} />, component: <NotificationsTab />
    },
    {
      key: "social", label: "Social", icon: <Share2 size={14} />, component: <SocialTab />
    },
  ]

  return (
    <div
      className="min-vh-100 !bg-[var(--bgPage2)] !text-[var(--text)] p-1 xl:p-4"
      // style={{ background: "#f1f5f9", fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <div
        className=""
        // style={{
        //   background: "linear-gradient(to right, #605cff, #4a00e0)",
        //   color: "#fff",
        //   padding: "20px 0",
        //   borderBottomLeftRadius: 20,
        //   borderBottomRightRadius: 20,
        // }}
      >
        <Container>
          <div className="!flex items-center justify-between">
            <div>
              <h5 className="fw-bold !text-[25px] mb-0 d-flex align-items-center gap-2">
                Account Settings
              </h5>
              {/* <small
                className="mb-0 opacity-75"
                style={{ fontSize: "0.95rem" }}
              >
                Manage your info, billing, and security in one place.
              </small> */}
            </div>
            <div className="text-end">
              <Button
                // variant="outline-light"
                className="rounded !flex items-center justify-between border !border-[var(--border)] !bg-red-500 !text-white"
                onClick={handleLogout}
              >
                <LogOut size={16} className="me-2" /> Logout
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Section with Tabs */}
      <Container className="mt-4">
        <Card className="border-0 rounded !bg-[var(--bgPage2)]">
          <TabsButton activeKey={activeTab} setActiveKey={setActiveTab} data={data} wfit={true}  />
          <div className="border-0 rounded-2xl">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "social" && <SocialTab />}
          </div>
          
          {/* <Tabs
            id="settings-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            justify
            variant="underline"
            className="px-3 pt-2"
          >
            <Tab
              eventKey="profile"
              title={
                <>
                  <PersonFill /> Profile
                </>
              }
            >
              <div className="p-4">{<ProfileTab />}</div>
            </Tab>
            <Tab
              eventKey="security"
              title={
                <>
                  <ShieldLockFill /> Security
                </>
              }
            >
              <div className="p-4">{<SecurityTab />}</div>
            </Tab>
            <Tab
              eventKey="notifications"
              title={
                <>
                  <BellFill /> Notifications
                </>
              }
            >
              <div className="p-4">{<NotificationsTab />}</div>
            </Tab>
            <Tab
              eventKey="social"
              title={
                <>
                  <ShareFill /> Social
                </>
              }
            >
              <div className="p-4">{<SocialTab />}</div>
            </Tab>
          </Tabs> */}
        </Card>
      </Container>
    </div>
  );
};

export default Settings;
