import React, { useState } from 'react';

import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import NotificationsTab from './NotificationsTab';
import SocialTab from './SocialTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'security':
        return <SecurityTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'social':
        return <SocialTab />;
      default:
        return <ProfileTab />;
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const getTabColor = (tabName) => {
    const colors = {
      profile: { base: '#4a6bff', hover: '#6a8cff', active: '#2a4bdf' },
      security: { base: '#ff6b6b', hover: '#ff8b8b', active: '#df4b4b' },
      notifications: { base: '#6bceff', hover: '#8befff', active: '#4baedf' },
      social: { base: '#a162e8', hover: '#c182ff', active: '#8142c8' }
    };
    return colors[tabName] || colors.profile;
  };

  return (
    <div className="min-vh-100" style={{ background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h4 className="fw-bold mb-0 text-dark">
          <i className="bi bi-gear-fill me-2 text-primary"></i>
          Account Settings
        </h4>
        <button
          className="btn"
          onClick={handleLogout}
          onMouseEnter={() => setHoverLogout(true)}
          onMouseLeave={() => setHoverLogout(false)}
          style={{
            background: hoverLogout ? 'linear-gradient(135deg, #ff4757, #ff6b81)' : 'transparent',
            border: `2px solid ${hoverLogout ? '#ff4757' : '#ff6b81'}`,
            color: hoverLogout ? '#fff' : '#ff6b81',
            padding: '6px 14px',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            boxShadow: hoverLogout ? '0 4px 10px rgba(255, 107, 129, 0.3)' : 'none'
          }}
        >
          <i className={`bi bi-box-arrow-right me-2 ${hoverLogout ? 'text-white' : ''}`}></i>
          Sign Out
        </button>
      </div>

      {/* Main Content */}
      <div className="container py-4">
        <div className="rounded-4 bg-white shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-bottom px-4 pt-3 pb-2 bg-light">
            <ul className="nav nav-tabs border-0">
              {['profile', 'security', 'notifications', 'social'].map((tab) => {
                const color = getTabColor(tab);
                const isActive = activeTab === tab;
                const isHovered = hoveredTab === tab;

                return (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link border-0 fw-semibold px-4 py-2 ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                      onMouseEnter={() => setHoveredTab(tab)}
                      onMouseLeave={() => setHoveredTab(null)}
                      style={{
                        color: isActive ? color.active : (isHovered ? color.hover : '#6c757d'),
                        background: isActive ? `rgba(${hexToRgb(color.base)}, 0.1)` : 'transparent',
                        borderBottom: isActive ? `3px solid ${color.active}` : 'none',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        borderRadius: '0',
                      }}
                    >
                      <i className={`bi bi-${
                        tab === 'profile' ? 'person' :
                        tab === 'security' ? 'shield-lock' :
                        tab === 'notifications' ? 'bell' : 'share'
                      } me-2`}></i>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {isHovered && !isActive && (
                        <span style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '2px',
                          background: `linear-gradient(90deg, ${color.hover}, ${color.base})`,
                          transform: 'scaleX(0.8)',
                          opacity: 0.7
                        }}></span>
                      )}
                      {isActive && (
                        <span style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '3px',
                          background: `linear-gradient(90deg, ${color.base}, ${color.active})`,
                          animation: 'underlineExpand 0.4s ease-out forwards'
                        }}></span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="p-4" style={{ maxHeight: 'calc(100vh - 240px)', overflowY: 'auto' }}>
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx="true">{`
        @keyframes underlineExpand {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }
      `}</style>
    </div>
  );
};

// Utility to convert HEX to RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

export default Settings;
