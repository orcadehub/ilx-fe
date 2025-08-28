import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import config from "../config";

export default function ProfileTab() {
  const baseURL =
    import.meta.env.MODE === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    accountType: "Business",
  });
  const [draft, setDraft] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const initialProfile = {
        fullName: userData.fullname || "user123",
        email: userData.email || "user123@gmail.com",
        accountType: userData.role || "Business",
      };
      setProfile(initialProfile);
      setDraft(initialProfile);
    }
  }, []);

  const handleChange = (e) =>
    setDraft((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEdit = () => setIsEditing(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: draft.fullName,
          email: draft.email,
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...updatedUser,
          accountType: profile.accountType,
        })
      );

      setProfile(draft);
      setIsEditing(false);
      setSuccess("✅ Profile updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container fluid className="px-3 px-md-5 py-3 w-100">
      {/* Section Title */}
      <h2 className="fw-bold text-dark mb-3">
        <i className="bi bi-person-circle me-2 text-primary"></i>
        Profile
      </h2>
      <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
        Manage your personal information and account details.
      </p>

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          {error && (
            <Alert variant="danger" className="rounded-3 py-2">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="rounded-3 py-2">
              {success}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark small">
                Full Name
              </Form.Label>
              {isEditing ? (
                <Form.Control
                  name="fullName"
                  value={draft.fullName}
                  onChange={handleChange}
                  required
                  className="shadow-sm"
                />
              ) : (
                <div
                  className="p-3 bg-light rounded-3 border text-dark fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={handleEdit}
                >
                  {profile.fullName}
                </div>
              )}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark small">
                Email
              </Form.Label>
              {isEditing ? (
                <Form.Control
                  type="email"
                  name="email"
                  value={draft.email}
                  onChange={handleChange}
                  required
                  className="shadow-sm"
                />
              ) : (
                <div
                  className="p-3 bg-light rounded-3 border text-dark fw-medium"
                  style={{ cursor: "pointer" }}
                  onClick={handleEdit}
                >
                  {profile.email}
                </div>
              )}
            </Form.Group>

            {/* Account Type */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark small">
                Account Type
              </Form.Label>
              <div className="p-3 bg-light rounded-3 border text-dark fw-medium">
                {profile.accountType}
              </div>
            </Form.Group>

            {/* Submit Button */}
            {isEditing && (
              <div className="text-end">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-4 py-2 rounded-3 fw-semibold shadow-sm"
                >
                  Save Changes
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
