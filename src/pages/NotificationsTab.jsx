/NotificationsTab.jsx/
import React, { useState } from 'react';

const NotificationsTab = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    browser: true
  });

  const handleToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = () => {
    // Add your save logic here (API call, etc.)
    console.log('Saving settings:', notificationSettings);
    alert('Notification preferences saved!');
  };

  return (
    <div className="container p-4">
      <h2 className="mb-3">Notification Preferences</h2>
      <p className="text-muted mb-4">Choose how you want to be notified</p>

      <div className="card shadow-sm">
        <div className="card-body">
          {/* Email Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h5 className="mb-1">Email Notifications</h5>
              <p className="text-muted small mb-0">Receive notifications via email</p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.email}
                onChange={() => handleToggle('email')}
                style={{ width: '2.5em', height: '1.5em' }}
              />
            </div>
          </div>

          {/* Push Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h5 className="mb-1">Push Notifications</h5>
              <p className="text-muted small mb-0">Receive push notifications on your devices</p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.push}
                onChange={() => handleToggle('push')}
                style={{ width: '2.5em', height: '1.5em' }}
              />
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <h5 className="mb-1">SMS Notifications</h5>
              <p className="text-muted small mb-0">Receive text messages for important updates</p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.sms}
                onChange={() => handleToggle('sms')}
                style={{ width: '2.5em', height: '1.5em' }}
              />
            </div>
          </div>

          {/* Browser Notifications */}
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <h5 className="mb-1">Browser Notifications</h5>
              <p className="text-muted small mb-0">Show notifications in your browser</p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={notificationSettings.browser}
                onChange={() => handleToggle('browser')}
                style={{ width: '2.5em', height: '1.5em' }}
              />
            </div>
          </div>

          <button 
            className="btn btn-primary w-100 mt-4 py-2"
            onClick={handleSave}
          >
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;