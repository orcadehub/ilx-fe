/SecurityTab.jsx/
import React, { useState } from 'react';
import { Container, Card, Form, Button, Accordion, Alert, Spinner, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function SecurityTab() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    twoFactor: false,
    sessionTimeout: 15,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', variant: '' });
  const [showModal, setShowModal] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    
    // Calculate password strength when new password changes
    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const togglePassword = field =>
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', variant: '' });

    // Validate form
    if (form.newPassword !== form.confirmNewPassword) {
      setMessage({ text: 'New passwords do not match!', variant: 'danger' });
      setLoading(false);
      return;
    }

    if (form.newPassword.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters long', variant: 'danger' });
      setLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setMessage({ text: 'Password is too weak. Include uppercase letters, numbers, and special characters', variant: 'danger' });
      setLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success response
      setMessage({ text: 'Password updated successfully!', variant: 'success' });
      setForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }));
      setShowModal(true);
    } catch (error) {
      setMessage({ text: 'Failed to update password. Please try again.', variant: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 0: return 'bg-secondary';
      case 1: return 'bg-danger';
      case 2: return 'bg-warning';
      case 3: return 'bg-info';
      case 4: return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  const getPasswordStrengthLabel = () => {
    switch(passwordStrength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Moderate';
      case 3: return 'Strong';
      case 4: return 'Very Strong';
      default: return '';
    }
  };

  return (
    <Container fluid className="px-3 px-md-5 py-3">
      <h2 className="h4 mb-4">Security Settings</h2>
      
      {/* Status Message */}
      {message.text && (
        <Alert variant={message.variant} className="mb-4" dismissible onClose={() => setMessage({ text: '', variant: '' })}>
          {message.text}
        </Alert>
      )}

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Change Password</Accordion.Header>
          <Accordion.Body>
            <p className="text-muted mb-4">Update your password to keep your account secure</p>
            <Form onSubmit={handleSubmit}>
              {['current', 'new', 'confirm'].map((f, idx) => {
                const nameMap = {
                  current: 'currentPassword',
                  new: 'newPassword',
                  confirm: 'confirmNewPassword'
                };
                const labels = {
                  current: 'Current Password',
                  new: 'New Password',
                  confirm: 'Confirm New Password'
                };
                const placeholders = {
                  current: 'Enter your current password',
                  new: 'Enter your new password',
                  confirm: 'Confirm your new password'
                };
                const field = nameMap[f];

                return (
                  <Form.Group controlId={field} className="mb-3" key={f}>
                    <Form.Label className="fw-semibold">{labels[f]}</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPasswords[f] ? 'text' : 'password'}
                        name={field}
                        placeholder={placeholders[f]}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        className={f === 'new' && form.newPassword ? 'border-end-0' : ''}
                      />
                      <span 
                        className="input-group-text" 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => togglePassword(f)}
                      >
                        <i className={`bi ${showPasswords[f] ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                      </span>
                    </div>
                    
                    {/* Password strength indicator for new password */}
                    {f === 'new' && form.newPassword && (
                      <div className="mt-2">
                        <div className="d-flex justify-content-between mb-1">
                          <small>Password Strength: {getPasswordStrengthLabel()}</small>
                          <small>{form.newPassword.length}/32</small>
                        </div>
                        <div className="progress" style={{ height: '4px' }}>
                          <div 
                            className={`progress-bar ${getPasswordStrengthColor()}`} 
                            role="progressbar" 
                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                            aria-valuenow={passwordStrength}
                            aria-valuemin="0"
                            aria-valuemax="4"
                          ></div>
                        </div>
                      </div>
                    )}
                  </Form.Group>
                );
              })}

              <div className="d-flex justify-content-end">
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="mt-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Updating...
                    </>
                  ) : 'Update Password'}
                </Button>
              </div>
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* Other accordion items remain the same */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Two‑Factor Authentication</Accordion.Header>
          <Accordion.Body>
            <p className="mb-2">Add an extra layer of security to your account</p>
            <Form.Check
              type="switch"
              id="twoFactor"
              name="twoFactor"
              label="Enable Two‑Factor Authentication"
              checked={form.twoFactor}
              onChange={handleChange}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Session Timeout</Accordion.Header>
          <Accordion.Body>
            <p className="mb-2">Automatically log out after inactivity</p>
            <Form.Select
              name="sessionTimeout"
              value={form.sessionTimeout}
              onChange={handleChange}
            >
              {[5,10,15,30,60].map(min => (
                <option key={min} value={min}>
                  {min} minutes
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>View Account Activity</Accordion.Header>
          <Accordion.Body>
            <Button variant="link" onClick={() => console.log('Viewing activity')}>
              View recent logins & sessions
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Password Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
            <p className="mt-3">Your password has been successfully updated.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}