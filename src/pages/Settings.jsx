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

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div
      className="min-vh-100"
      style={{ background: "#f1f5f9", fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(to right, #605cff, #4a00e0)",
          color: "#fff",
          padding: "20px 0",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col>
              <h5 className="fw-bold mb-1 d-flex align-items-center gap-2 text-light">
                Account Settings
              </h5>
              <small
                className="mb-0 text-light opacity-75"
                style={{ fontSize: "0.95rem" }}
              >
                Manage your info, billing, and security in one place.
              </small>
            </Col>
            <Col className="text-end">
              <Button
                variant="outline-light"
                className="fw-semibold rounded-3"
                onClick={handleLogout}
              >
                <BoxArrowRight className="me-2" /> Sign Out
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Section with Tabs */}
      <Container className="mt-4">
        <Card className="shadow-sm border-0 rounded bg-white">
          <Tabs
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
          </Tabs>
        </Card>
      </Container>
    </div>
  );
};

export default Settings;
