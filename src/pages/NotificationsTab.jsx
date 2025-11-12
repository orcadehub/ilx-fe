import { Switch } from "antd";
import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";

const NotificationsTab = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    browser: true,
  });

  const handleToggle = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", notificationSettings);
    alert("Notification preferences saved!");
  };

  return (
    <Container fluid className="p-4 w-100 !text-[var(--text)] !border !border-[var(--border)] rounded-xl bg-[var(--card)]">
      <h2 className="h4 fw-medium mb-1">
        {/* <i className="bi bi-bell me-2 text-primary"></i> */}
        Notification Preferences
      </h2>
      <p className="text-[var(--mutedText)] mb-4 !mt-0" style={{ fontSize: "0.95rem" }}>
        Choose how you’d like to be notified about updates and alerts.
      </p>

      <Card className="border-0 !bg-[var(--card)] !text-[var(--text)]">
        <Card.Body className="p-0">
          {/* Email Notifications */}
          <div className="d-flex justify-content-between align-items-center py-2">
            <div>
              <h6 className="mb-1 text-sm">Email Notifications</h6>
              <p className="small text-[var(--mutedText)] mb-0">
                Receive notifications via email.
              </p>
            </div>
            <div className="form-check form-switch">
              <Switch defaultChecked value={notificationSettings.email} onChange={() => handleToggle("email")} />
              {/* <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.email}
                onChange={() => handleToggle("email")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer",color: 'var(--text)' }}
              /> */}
            </div>
          </div>

          {/* Push Notifications */}
          <div className="d-flex justify-content-between align-items-center py-2">
            <div>
              <h6 className=" text-sm mb-1">Push Notifications</h6>
              <p className="small text-[var(--mutedText)] mb-0">
                Get instant alerts on your devices.
              </p>
            </div>
            <div className="form-check form-switch">
              <Switch defaultChecked value={notificationSettings.push} onChange={() => handleToggle("push")} />
              {/* <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.push}
                onChange={() => handleToggle("push")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer" }}
              /> */}
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="d-flex justify-content-between align-items-center py-2">
            <div>
              <h6 className="text-sm mb-1">SMS Notifications</h6>
              <p className="small text-[var(--mutedText)] mb-0">
                Receive text messages for critical updates.
              </p>
            </div>
            <div className="form-check form-switch">
              <Switch defaultChecked value={notificationSettings.sms} onChange={() => handleToggle("sms")} />
              {/* <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.sms}
                onChange={() => handleToggle("sms")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer" }}
              /> */}
            </div>
          </div>

          {/* Browser Notifications */}
          <div className="d-flex justify-content-between align-items-center py-2">
            <div>
              <h6 className="text-sm mb-1">
                Browser Notifications
              </h6>
              <p className="small text-[var(--mutedText)] mb-0">
                Show alerts directly in your browser.
              </p>
            </div>
            <div className="form-check form-switch">
              <Switch defaultChecked value={notificationSettings.browser} onChange={() => handleToggle("browser")} />
              {/* <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.browser}
                onChange={() => handleToggle("browser")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer" }}
              /> */}
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-4">
            <Button
              // variant="primary"
              className="px-4 py-2 rounded text-white !border-[var(--border)] !bg-blue-700"
              onClick={handleSave}
            >
              Save Notification Settings
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationsTab;
