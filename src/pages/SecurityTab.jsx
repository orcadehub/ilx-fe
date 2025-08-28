import React, { useState } from "react";
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

export default function SecurityTab() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    twoFactor: false,
    sessionTimeout: 15,
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage({ text: "Password updated successfully!", variant: "success" });
      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
      setShowModal(true);
    } catch (error) {
      setMessage({
        text: "Failed to update password. Please try again.",
        variant: "danger",
      });
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

  return (
    <Container fluid className="px-3 px-md-5 py-3">
      <h2 className="h4 fw-bold text-dark mb-4">
        <i className="bi bi-shield-lock-fill text-primary me-2"></i>
        Security Settings
      </h2>

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

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <Accordion defaultActiveKey="0" flush>
            {/* Change Password */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-semibold">Change Password</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className="text-muted mb-4">
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
                        <Form.Label className="fw-semibold">
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
                            className="rounded-start shadow-sm"
                          />
                          <span
                            className="input-group-text bg-light rounded-end"
                            style={{ cursor: "pointer" }}
                            onClick={() => togglePassword(f)}
                          >
                            <i
                              className={`bi ${
                                showPasswords[f]
                                  ? "bi-eye-fill"
                                  : "bi-eye-slash-fill"
                              }`}
                            ></i>
                          </span>
                        </div>

                        {f === "new" && form.newPassword && (
                          <div className="mt-2">
                            <div className="d-flex justify-content-between mb-1">
                              <small>
                                Strength: {getPasswordStrengthLabel()}
                              </small>
                              <small>{form.newPassword.length}/32</small>
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
            </Accordion.Item>

            {/* Two-Factor */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className="fw-semibold">
                  Two-Factor Authentication
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <p className="text-muted mb-2">
                  Add an extra layer of security to your account.
                </p>
                <Form.Check
                  type="switch"
                  id="twoFactor"
                  name="twoFactor"
                  label="Enable Two-Factor Authentication"
                  checked={form.twoFactor}
                  onChange={handleChange}
                />
              </Accordion.Body>
            </Accordion.Item>

            {/* Session Timeout */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className="fw-semibold">Session Timeout</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className="text-muted mb-2">
                  Automatically log out after inactivity.
                </p>
                <Form.Select
                  name="sessionTimeout"
                  value={form.sessionTimeout}
                  onChange={handleChange}
                  className="shadow-sm"
                >
                  {[5, 10, 15, 30, 60].map((min) => (
                    <option key={min} value={min}>
                      {min} minutes
                    </option>
                  ))}
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>

            {/* Activity */}
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span className="fw-semibold">Account Activity</span>
              </Accordion.Header>
              <Accordion.Body>
                <p className="text-muted">
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
