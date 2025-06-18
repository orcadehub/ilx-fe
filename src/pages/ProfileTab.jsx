/ProfileTab.jsx/
// ProfileTab.jsx

import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

export default function ProfileTab() {
  const [profile, setProfile] = useState({
    fullName: 'user123',
    email: 'user123@gmail.com',
    accountType: 'Business',
  });
  const [draft, setDraft] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = e =>
    setDraft(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEdit = () => setIsEditing(true);
  const handleSubmit = e => {
    e.preventDefault();
    setProfile(draft);
    setIsEditing(false);
    console.log('Profile updated:', draft);
    // Add API call here
  };

  return (
    <Container fluid className="px-3 px-md-5 py-3 w-100">
      <h2 className="h4 mb-4">Account Settings</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="h5 mb-3">Profile Information</h3>
          <p className="text-muted mb-4">
            Update your account profile information
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Full Name</Form.Label>
              {isEditing ? (
                <Form.Control
                  name="fullName"
                  value={draft.fullName}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div
                  className="p-3 bg-light rounded"
                  style={{ cursor: 'pointer' }}
                  onClick={handleEdit}
                >
                  {profile.fullName}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Email</Form.Label>
              {isEditing ? (
                <Form.Control
                  type="email"
                  name="email"
                  value={draft.email}
                  onChange={handleChange}
                  required
                />
              ) : (
                <div
                  className="p-3 bg-light rounded"
                  style={{ cursor: 'pointer' }}
                  onClick={handleEdit}
                >
                  {profile.email}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Account Type</Form.Label>
              <div className="p-3 bg-light rounded">
                {profile.accountType}
              </div>
            </Form.Group>

            <div className="text-end">
              <Button type="submit" variant="primary">
                Update Profile
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}