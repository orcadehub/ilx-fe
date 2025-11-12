import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Accordion,
  Alert,
  Spinner,
  Modal,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Switch } from "antd";
import { Shield } from "lucide-react";
import config from "../config";
import { toast } from "react-toastify";

export default function SecurityTab() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeoutEnabled: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", variant: "" });
  const [showModal, setShowModal] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [securityLoading, setSecurityLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "newPassword") {
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

  const togglePassword = (field) =>
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", variant: "" });

    if (form.newPassword !== form.confirmNewPassword) {
      setMessage({ text: "New passwords do not match!", variant: "danger" });
      setLoading(false);
      return;
    }

    if (form.newPassword.length < 8) {
      setMessage({
        text: "Password must be at least 8 characters long",
        variant: "danger",
      });
      setLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setMessage({
        text: "Password is too weak. Use uppercase, numbers & special characters.",
        variant: "danger",
      });
      setLoading(false);
      return;
    }

    try {
      const baseURL = import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL;
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${baseURL}/api/dashboard/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }
      
      toast.success('Password updated successfully!');
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
      setPasswordStrength(0);
      setShowModal(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "bg-danger";
      case 2:
        return "bg-warning";
      case 3:
        return "bg-info";
      case 4:
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 1:
        return "Weak";
      case 2:
        return "Moderate";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "Very Weak";
    }
  };

  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
    try {
      const baseURL = import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL;
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${baseURL}/api/dashboard/security-settings`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setSecuritySettings({
          twoFactorEnabled: data.settings.two_factor_enabled,
          sessionTimeoutEnabled: data.settings.session_timeout_enabled,
        });
      }
    } catch (error) {
      console.error('Failed to fetch security settings:', error);
    }
  };

  const handleSecurityChange = async (field, value) => {
    setSecurityLoading(true);
    try {
      const baseURL = import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL;
      const token = localStorage.getItem('token');
      
      const updatedSettings = {
        ...securitySettings,
        [field]: value
      };
      
      const response = await fetch(`${baseURL}/api/dashboard/security-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          twoFactorEnabled: updatedSettings.twoFactorEnabled,
          sessionTimeoutEnabled: updatedSettings.sessionTimeoutEnabled
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setSecuritySettings(updatedSettings);
        toast.success('Security settings updated successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update security settings');
    } finally {
      setSecurityLoading(false);
    }
  };

  return (
    <Container fluid className=" md:py-3 text-[var(--text)]">
      

      {message.text && (
        <Alert
          variant={message.variant}
          className="mb-4"
          dismissible
          onClose={() => setMessage({ text: "", variant: "" })}
        >
          {message.text}
        </Alert>
      )}

      <Card className=" border-0 rounded-4 !bg-[var(--bgPage2)] ">
        <Card.Body className="p-0">
          <div>
            {/* Change Password */}
            <div className="border !border-[var(--border)] p-4 !bg-[var(--card)] rounded-2xl">
            <span className="fw-medium text-2xl text-[var(--text)]">Change Password</span>
            <div>
              <p className="mb-4 text-sm text-[var(--mutedText)]">
                Update your password to keep your account secure.
              </p>
              <Form onSubmit={handleSubmit}>
                {["current", "new", "confirm"].map((f) => {
                  const map = {
                    current: {
                      name: "currentPassword",
                      label: "Current Password",
                      placeholder: "Enter your current password",
                    },
                    new: {
                      name: "newPassword",
                      label: "New Password",
                      placeholder: "Enter a strong new password",
                    },
                    confirm: {
                      name: "confirmNewPassword",
                      label: "Confirm New Password",
                      placeholder: "Re-enter your new password",
                    },
                  };
                  return (
                    <Form.Group className="mb-3" key={f}>
                      <Form.Label className="text-[var(--text)]">
                        {map[f].label}
                      </Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={showPasswords[f] ? "text" : "password"}
                          name={map[f].name}
                          placeholder={map[f].placeholder}
                          value={form[map[f].name]}
                          onChange={handleChange}
                          required
                          className="rounded-start !bg-[var(--bgPage2)] text-[var(--text)]"
                        />
                        <span
                          className="input-group-text bg-[var(--bg)] text-[var(--text)] rounded-end"
                          style={{ cursor: "pointer" }}
                          onClick={() => togglePassword(f)}
                        >
                          <i
                            className={`bi ${showPasswords[f] ? "bi-eye-fill" : "bi-eye-slash-fill"
                              }`}
                          ></i>
                        </span>
                      </div>

                      {f === "new" && form.newPassword && (
                        <div className="mt-2">
                          <div className="d-flex justify-content-between mb-1">
                            <small className="text-[var(--text)]">
                              Strength: {getPasswordStrengthLabel()}
                            </small>
                            <small className="text-[var(--text)]">
                              {form.newPassword.length}/32
                            </small>
                          </div>
                          <div className="progress" style={{ height: "5px" }}>
                            <div
                              className={`progress-bar ${getPasswordStrengthColor()}`}
                              style={{
                                width: `${(passwordStrength / 4) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </Form.Group>
                  );
                })}

                <div className="">
                  <Button
                    type="submit"
                    // variant="primary"
                      className="px-4 py-2 rounded-3 shadow-sm !bg-[var(--primary)]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          role="status"
                          className="me-2"
                        />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
           </div>
           
            {/* Two-Factor Authentication */}
            <div className=" my-3 border !border-[var(--border)] p-4 !bg-[var(--card)] rounded-2xl">
              
              <div>
                <span className="fw-medium text-2xl text-[var(--text)]">Security Settings</span>
                <p className="mb-4 !mt-0 text-sm text-[var(--mutedText)]">
                  Update your password to keep your account secure.
                </p>
              </div>
              <div className="text-[var(--text)] flex! items-center justify-between ">
              <div>
              <span className="fw-medium text-[var(--text)]">
                Two-Factor Authentication
              </span>
              <p className="mb-2 text-12 text-[var(--mutedText)]">
                Add an extra layer of security to your account.
              </p>
              </div>
                <Switch 
                  checked={securitySettings.twoFactorEnabled}
                  onChange={(checked) => handleSecurityChange('twoFactorEnabled', checked)}
                  loading={securityLoading}
                />
              </div>

              <div className="text-[var(--text)] flex! items-center justify-between ">
                <div>
                  <span className="fw-medium text-[var(--text)]">
                    Session Timeout
                  </span>
                  <p className="mb-2 text-12 text-[var(--mutedText)]">
                    Automatically log out after inactivity
                  </p>
                </div>
                <Switch 
                  checked={securitySettings.sessionTimeoutEnabled}
                  onChange={(checked) => handleSecurityChange('sessionTimeoutEnabled', checked)}
                  loading={securityLoading}
                />
              </div>

              <button
                className="flex !justify-center !items-center gap-2 bg-[var(--bgPage2)] !w-full border !border-[var(--border)] py-2 rounded text-[var(--text)] text-14 "
                onClick={() => console.log("Viewing activity")}
              >
                <Shield size={14}  />View Account Activity
              </button>
              {/* <Form.Check
                type="switch"
                id="twoFactor"
                name="twoFactor"
                label="Enable Two-Factor Authentication"
                checked={form.twoFactor}
                onChange={handleChange}
                className="text-[var(--text)] flex! justify-between mb-4 flex-row-reverse "
              /> */}
            </div>
           
         </div>
         
          {/* <Accordion defaultActiveKey="0" flush className="!bg-[var(--bg)] !text-[var(--text)]"> */}
            {/* Change Password */}
            {/* <Accordion.Item eventKey="0" className="!bg-[var(--bg)] !text-[var(--text)]">
              <Accordion.Header className="!bg-[var(--bg)] !text-[var(--text)]">
                <span className="fw-semibold text-[var(--text)]">Change Password</span>
              </Accordion.Header>
              <Accordion.Body className="bg-[var(--bg)] text-[var(--text)]">
                <p className="mb-4 text-[var(--text)]">
                  Update your password to keep your account secure.
                </p>
                <Form onSubmit={handleSubmit}>
                  {["current", "new", "confirm"].map((f) => {
                    const map = {
                      current: {
                        name: "currentPassword",
                        label: "Current Password",
                        placeholder: "Enter your current password",
                      },
                      new: {
                        name: "newPassword",
                        label: "New Password",
                        placeholder: "Enter a strong new password",
                      },
                      confirm: {
                        name: "confirmNewPassword",
                        label: "Confirm New Password",
                        placeholder: "Re-enter your new password",
                      },
                    };
                    return (
                      <Form.Group className="mb-4" key={f}>
                        <Form.Label className="fw-semibold text-[var(--text)]">
                          {map[f].label}
                        </Form.Label>
                        <div className="input-group">
                          <Form.Control
                            type={showPasswords[f] ? "text" : "password"}
                            name={map[f].name}
                            placeholder={map[f].placeholder}
                            value={form[map[f].name]}
                            onChange={handleChange}
                            required
                            className="rounded-start shadow-sm bg-[var(--bg)] text-[var(--text)]"
                          />
                          <span
                            className="input-group-text bg-[var(--bg)] text-[var(--text)] rounded-end"
                            style={{ cursor: "pointer" }}
                            onClick={() => togglePassword(f)}
                          >
                            <i
                              className={`bi ${showPasswords[f] ? "bi-eye-fill" : "bi-eye-slash-fill"
                                }`}
                            ></i>
                          </span>
                        </div>

                        {f === "new" && form.newPassword && (
                          <div className="mt-2">
                            <div className="d-flex justify-content-between mb-1">
                              <small className="text-[var(--text)]">
                                Strength: {getPasswordStrengthLabel()}
                              </small>
                              <small className="text-[var(--text)]">
                                {form.newPassword.length}/32
                              </small>
                            </div>
                            <div className="progress" style={{ height: "5px" }}>
                              <div
                                className={`progress-bar ${getPasswordStrengthColor()}`}
                                style={{
                                  width: `${(passwordStrength / 4) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </Form.Group>
                    );
                  })}

                  <div className="text-end">
                    <Button
                      type="submit"
                      variant="primary"
                      className="px-4 py-2 fw-semibold rounded-3 shadow-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            role="status"
                            className="me-2"
                          />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </div>
                </Form>
              </Accordion.Body>
            </Accordion.Item> */}

            {/* Two-Factor */}
            {/* <Accordion.Item eventKey="1" className="bg-[var(--bg)] text-[var(--text)]">
              <Accordion.Header>
              </Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
            </Accordion.Item> */}

            {/* Session Timeout */}
            {/* <Accordion.Item eventKey="2" className="bg-[var(--bg)] text-[var(--text)]">
              <Accordion.Header>
              </Accordion.Header>
              <Accordion.Body>
                <div>
                <span className="fw-semibold text-[var(--text)]">Session Timeout</span>
                <div>
                <p className="mb-2 text-[var(--text)]">
                  Automatically log out after inactivity.
                </p>
                <Form.Select
                  name="sessionTimeout"
                  value={form.sessionTimeout}
                  onChange={handleChange}
                  className="shadow-sm bg-[var(--bg)] text-[var(--text)]"
                >
                  {[5, 10, 15, 30, 60].map((min) => (
                    <option key={min} value={min}>
                      {min} minutes
                    </option>
                  ))}
                </Form.Select>
                  
               </div>

                </div>
              </Accordion.Body>
            </Accordion.Item> */}

            {/* Activity */}
            {/* <Accordion.Item eventKey="3" className="bg-[var(--bg)] text-[var(--text)]">
              <Accordion.Header>
              </Accordion.Header>
              <Accordion.Body>
                <div>
                <span className="fw-semibold text-[var(--text)]">Account Activity</span>
                  <div>
                <p className="text-[var(--text)]">
                  Check recent logins and active sessions.
                </p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="fw-semibold px-3"
                  onClick={() => console.log("Viewing activity")}
                >
                  View Activity
                </Button>
                  </div>
               </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion> */}

        </Card.Body>
      </Card>

      {/* Success Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Password Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-4">
            <i
              className="bi bi-check-circle-fill text-success mb-3"
              style={{ fontSize: "3rem" }}
            ></i>
            <p>Your password has been successfully updated.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="fw-semibold px-4"
            onClick={() => setShowModal(false)}
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
