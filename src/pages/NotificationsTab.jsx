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
    <Container fluid className="px-3 px-md-5 py-3 w-100">
      <h2 className="h5 fw-bold text-dark mb-4">
        <i className="bi bi-bell me-2 text-primary"></i>
        Notification Preferences
      </h2>
      <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
        Choose how you’d like to be notified about updates and alerts.
      </p>

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          {/* Email Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h6 className="fw-semibold text-dark mb-1">Email Notifications</h6>
              <p className="small text-muted mb-0">
                Receive notifications via email.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.email}
                onChange={() => handleToggle("email")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Push Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h6 className="fw-semibold text-dark mb-1">Push Notifications</h6>
              <p className="small text-muted mb-0">
                Get instant alerts on your devices.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.push}
                onChange={() => handleToggle("push")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer" }}
              />
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h6 className="fw-semibold text-dark mb-1">SMS Notifications</h6>
              <p className="small text-muted mb-0">
                Receive text messages for critical updates.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.sms}
                onChange={() => handleToggle("sms")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Browser Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 className="fw-semibold text-dark mb-1">
                Browser Notifications
              </h6>
              <p className="small text-muted mb-0">
                Show alerts directly in your browser.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.browser}
                onChange={() => handleToggle("browser")}
                style={{ width: "2.5em", height: "1.3em", cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="text-end mt-4">
            <Button
              variant="primary"
              className="px-4 py-2 rounded-3 fw-semibold shadow-sm"
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
