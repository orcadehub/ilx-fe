/SocialTab.jsx/
import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Twitter } from 'react-bootstrap-icons';

const SocialTab = () => {
  const [socialProfiles, setSocialProfiles] = useState({
    instagram: 'https://instagram.com/user123',
    facebook: '',
    youtube: 'https://youtube.com/user123',
    twitter: ''
  });
  const [editing, setEditing] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleEdit = (platform) => setEditing(platform);
  const handleCancel = () => setEditing(null);

  const handleSave = (platform) => {
    setEditing(null);
    // API save logic would go here
    console.log(`${platform} URL saved`);
  };

  const handleChange = (e, platform) => {
    setSocialProfiles(prev => ({
      ...prev,
      [platform]: e.target.value
    }));
  };

  return (
    <div className="container p-4">
      <div className="card shadow-sm" style={{
        border: 'none',
        borderRadius: '12px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
      }}>
        <div className="card-body">
          <h2 className="h5 mb-3 d-flex align-items-center" style={{
            color: '#2c3e50',
            fontWeight: '600',
            fontFamily: "'Playfair Display', serif"
          }}>
            <i className="bi bi-share me-2" style={{ color: '#9c7c5e' }}></i>
            Social Media Profiles
          </h2>
          <p className="text-muted small mb-4" style={{ letterSpacing: '0.5px' }}>
            Connect your social media accounts to enhance your profile
          </p>

          {/* Instagram */}
          <div className="d-flex align-items-center py-3 border-bottom" style={{
            borderColor: 'rgba(0, 0, 0, 0.05)'
          }}>
            <Instagram className="text-danger me-3" size={22} style={{
              filter: 'drop-shadow(0 2px 4px rgba(225, 48, 108, 0.2))'
            }} />
            {editing === 'instagram' ? (
              <div className="d-flex flex-grow-1 gap-2">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  value={socialProfiles.instagram}
                  onChange={(e) => handleChange(e, 'instagram')}
                  placeholder="https://instagram.com/username"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px'
                  }}
                />
                <button 
                  className="btn btn-sm btn-success d-flex align-items-center justify-content-center"
                  onClick={() => handleSave('instagram')}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                  }}
                >
                  <i className="bi bi-check"></i>
                </button>
                <button 
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
                  onClick={handleCancel}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ) : (
              <div className="d-flex flex-grow-1 align-items-center">
                <span className={socialProfiles.instagram ? '' : 'text-muted'} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem'
                }}>
                  {socialProfiles.instagram || 'Not connected'}
                </span>
                <button 
                  className="btn btn-sm ms-auto"
                  onClick={() => handleEdit('instagram')}
                  onMouseEnter={() => setHoveredButton('instagram')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    background: hoveredButton === 'instagram' 
                      ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' 
                      : 'transparent',
                    color: hoveredButton === 'instagram' ? 'white' : '#d4af37',
                    border: `1px solid ${hoveredButton === 'instagram' ? '#dc3545' : '#d4af37'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: hoveredButton === 'instagram' 
                      ? '0 4px 15px rgba(220, 53, 69, 0.3)' 
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className={`bi bi-pencil ${hoveredButton === 'instagram' ? 'text-white' : ''}`}></i>
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>

          {/* Facebook */}
          <div className="d-flex align-items-center py-3 border-bottom" style={{
            borderColor: 'rgba(0, 0, 0, 0.05)'
          }}>
            <Facebook className="text-primary me-3" size={22} style={{
              filter: 'drop-shadow(0 2px 4px rgba(24, 119, 242, 0.2))'
            }} />
            {editing === 'facebook' ? (
              <div className="d-flex flex-grow-1 gap-2">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  value={socialProfiles.facebook}
                  onChange={(e) => handleChange(e, 'facebook')}
                  placeholder="https://facebook.com/username"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px'
                  }}
                />
                <button 
                  className="btn btn-sm btn-success d-flex align-items-center justify-content-center"
                  onClick={() => handleSave('facebook')}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                  }}
                >
                  <i className="bi bi-check"></i>
                </button>
                <button 
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
                  onClick={handleCancel}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ) : (
              <div className="d-flex flex-grow-1 align-items-center">
                <span className={socialProfiles.facebook ? '' : 'text-muted'} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem'
                }}>
                  {socialProfiles.facebook || 'Not connected'}
                </span>
                <button 
                  className="btn btn-sm ms-auto"
                  onClick={() => handleEdit('facebook')}
                  onMouseEnter={() => setHoveredButton('facebook')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    background: hoveredButton === 'facebook' 
                      ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' 
                      : 'transparent',
                    color: hoveredButton === 'facebook' ? 'white' : '#d4af37',
                    border: `1px solid ${hoveredButton === 'facebook' ? '#dc3545' : '#d4af37'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: hoveredButton === 'facebook' 
                      ? '0 4px 15px rgba(220, 53, 69, 0.3)' 
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className={`bi bi-pencil ${hoveredButton === 'facebook' ? 'text-white' : ''}`}></i>
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>

          {/* YouTube */}
          <div className="d-flex align-items-center py-3 border-bottom" style={{
            borderColor: 'rgba(0, 0, 0, 0.05)'
          }}>
            <Youtube className="text-danger me-3" size={22} style={{
              filter: 'drop-shadow(0 2px 4px rgba(255, 0, 0, 0.2))'
            }} />
            {editing === 'youtube' ? (
              <div className="d-flex flex-grow-1 gap-2">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  value={socialProfiles.youtube}
                  onChange={(e) => handleChange(e, 'youtube')}
                  placeholder="https://youtube.com/username"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px'
                  }}
                />
                <button 
                  className="btn btn-sm btn-success d-flex align-items-center justify-content-center"
                  onClick={() => handleSave('youtube')}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                  }}
                >
                  <i className="bi bi-check"></i>
                </button>
                <button 
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
                  onClick={handleCancel}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ) : (
              <div className="d-flex flex-grow-1 align-items-center">
                <span className={socialProfiles.youtube ? '' : 'text-muted'} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem'
                }}>
                  {socialProfiles.youtube || 'Not connected'}
                </span>
                <button 
                  className="btn btn-sm ms-auto"
                  onClick={() => handleEdit('youtube')}
                  onMouseEnter={() => setHoveredButton('youtube')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    background: hoveredButton === 'youtube' 
                      ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' 
                      : 'transparent',
                    color: hoveredButton === 'youtube' ? 'white' : '#d4af37',
                    border: `1px solid ${hoveredButton === 'youtube' ? '#dc3545' : '#d4af37'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: hoveredButton === 'youtube' 
                      ? '0 4px 15px rgba(220, 53, 69, 0.3)' 
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className={`bi bi-pencil ${hoveredButton === 'youtube' ? 'text-white' : ''}`}></i>
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>

          {/* Twitter */}
          <div className="d-flex align-items-center py-3">
            <Twitter className="text-info me-3" size={22} style={{
              filter: 'drop-shadow(0 2px 4px rgba(29, 161, 242, 0.2))'
            }} />
            {editing === 'twitter' ? (
              <div className="d-flex flex-grow-1 gap-2">
                <input
                  type="url"
                  className="form-control form-control-sm"
                  value={socialProfiles.twitter}
                  onChange={(e) => handleChange(e, 'twitter')}
                  placeholder="https://twitter.com/username"
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px'
                  }}
                />
                <button 
                  className="btn btn-sm btn-success d-flex align-items-center justify-content-center"
                  onClick={() => handleSave('twitter')}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                  }}
                >
                  <i className="bi bi-check"></i>
                </button>
                <button 
                  className="btn btn-sm btn-outline-secondary d-flex align-items-center justify-content-center"
                  onClick={handleCancel}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <i className="bi bi-x"></i>
                </button>
              </div>
            ) : (
              <div className="d-flex flex-grow-1 align-items-center">
                <span className={socialProfiles.twitter ? '' : 'text-muted'} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem'
                }}>
                  {socialProfiles.twitter || 'Not connected'}
                </span>
                <button 
                  className="btn btn-sm ms-auto"
                  onClick={() => handleEdit('twitter')}
                  onMouseEnter={() => setHoveredButton('twitter')}
                  onMouseLeave={() => setHoveredButton(null)}
                  style={{
                    background: hoveredButton === 'twitter' 
                      ? 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)' 
                      : 'transparent',
                    color: hoveredButton === 'twitter' ? 'white' : '#d4af37',
                    border: `1px solid ${hoveredButton === 'twitter' ? '#dc3545' : '#d4af37'}`,
                    borderRadius: '6px',
                    padding: '6px 12px',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: hoveredButton === 'twitter' 
                      ? '0 4px 15px rgba(220, 53, 69, 0.3)' 
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className={`bi bi-pencil ${hoveredButton === 'twitter' ? 'text-white' : ''}`}></i>
                  <span>Edit</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialTab;