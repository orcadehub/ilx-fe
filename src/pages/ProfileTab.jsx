import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
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
      // Hypothetical API endpoint to update user profile
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

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();

      // Update localStorage with new user data
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...updatedUser,
          accountType: profile.accountType, // Preserve accountType if not updated
        })
      );

      // Update state
      setProfile(draft);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      console.log("Profile updated:", draft);
    } catch (err) {
      setError(err.message);
      console.error("Error updating profile:", err);
    }
  };

  return (
    <Container fluid className="px-3 px-md-5 py-3 w-100">
      <h2 className="h5 fw-bold text-dark mb-4">
        <i className="bi bi-person me-2 text-primary"></i>
        Account Settings
      </h2>

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Body className="p-4">
          <h3 className="h6 fw-bold text-secondary mb-2">
            Profile Information
          </h3>
          <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
            Update your account profile information.
          </p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark">
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
                  className="p-3 bg-light rounded shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={handleEdit}
                >
                  {profile.fullName}
                </div>
              )}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark">Email</Form.Label>
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
                  className="p-3 bg-light rounded shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={handleEdit}
                >
                  {profile.email}
                </div>
              )}
            </Form.Group>

            {/* Account Type */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-dark">
                Account Type
              </Form.Label>
              <div className="p-3 bg-light rounded shadow-sm">
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
