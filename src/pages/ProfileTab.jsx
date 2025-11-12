import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import config from "../config";
import { toast } from "react-toastify";

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
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingOTP, setSendingOTP] = useState(false);

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

    // If email changed, show OTP modal and send OTP
    if (draft.email !== profile.email) {
      setShowOTPModal(true);
      setSendingOTP(true);
      await sendOTP();
      setSendingOTP(false);
    } else {
      // Only fullname update
      await updateUserInfo();
    }
  };

  const sendOTP = async () => {
    try {
      const response = await fetch(`${baseURL}/api/dashboard/send-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: draft.email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to send OTP");
      
      setOtpSent(true);
      toast.success("OTP sent to your new email address");
    } catch (err) {
      toast.error(err.message);
      setShowOTPModal(false);
    }
  };

  const updateUserInfo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/api/dashboard/update-user-info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname: draft.fullName,
          email: draft.email !== profile.email ? draft.email : undefined,
          otp: draft.email !== profile.email ? otp : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...storedUser,
        fullname: draft.fullName,
        email: draft.email,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setProfile(draft);
      setIsEditing(false);
      setShowOTPModal(false);
      setOtp("");
      setOtpSent(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="px-3 border !border-[var(--border)] !bg-[var(--card)] px-md-5 py-3 w-100 !text-[var(--text)] rounded-2xl">
      {/* Section Title */}
      <h3 className=" mb-1">
        {/* <i className="bi bi-person-circle me-2 text-primary"></i> */}
        Profile Information
      </h3>
      <p className="text-[var(--mutedText)] mb-4 !mt-0" style={{ fontSize: "0.95rem" }}>
        Update your account profile information
      </p>

      <Card className="border-0  !bg-[var(--card)] p-1 ">
        <Card.Body className="p-0">
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

          <Form onSubmit={handleSubmit} className="text-[var(--text)] !bg-[var(--card)]">
            {/* Full Name */}
            <Form.Group className="mb-2">
              <Form.Label className="small">
                Full Name
              </Form.Label>
              {isEditing ? (
                <Form.Control
                  name="fullName"
                  value={draft.fullName}
                  onChange={handleChange}
                  required
                  className="!h-[35px] !bg-[var(--bgPage2)] text-14 !px-3"
                />
              ) : (
                <div
                    className="!px-3 flex items-center !h-[35px] rounded-3 border !border-[var(--border)] fw-medium  !bg-[var(--bgPage2)] text-14"
                  style={{ cursor: "pointer" }}
                  onClick={handleEdit}
                >
                  {profile.fullName}
                </div>
              )}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-2">
              <Form.Label className="small">
                Email
              </Form.Label>
              {isEditing ? (
                <Form.Control
                  type="email"
                  name="email"
                  value={draft.email}
                  onChange={handleChange}
                  required
                  className="!h-[35px]  !bg-[var(--bgPage2)] text-14"
                />
              ) : (
                <div
                    className="px-3 flex items-center !bg-[var(--bgPage2)] h-[35px] rounded-3 border !border-[var(--border)] fw-medium text-14"
                  style={{ cursor: "pointer" }}
                  onClick={handleEdit}
                >
                  {profile.email}
                </div>
              )}
            </Form.Group>

            {/* Account Type */}
            <Form.Group className="mb-2">
              <Form.Label className="small">
                Account Type
              </Form.Label>
              <div className="px-3 !text-[var(--mutedText)]  !bg-[var(--bgPage2)] text-14 flex capitalize items-center h-[35px]  rounded-3 border !border-[var(--border)] fw-medium">
                {profile.accountType}
              </div>
            </Form.Group>

            {/* Submit Button */}
            {isEditing && (
              <div className="">
                <Button
                  type="submit"
                  // variant="primary"
                  className="px-4 py-2 !bg-[var(--primary)] rounded-3 text-14"
                >
                 Update Profile
                </Button>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* OTP Modal */}
      <Modal show={showOTPModal} onHide={() => setShowOTPModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verify New Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {sendingOTP ? (
            <div className="text-center py-3">
              <Spinner animation="border" size="sm" className="me-2" />
              Sending OTP to <strong>{draft.email}</strong>...
            </div>
          ) : (
            <>
              <p>We've sent an OTP to <strong>{draft.email}</strong></p>
              <Form.Group>
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowOTPModal(false);
              setOtp("");
              setOtpSent(false);
              setSendingOTP(false);
            }}
            disabled={sendingOTP || loading}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={updateUserInfo}
            disabled={loading || !otp || sendingOTP}
          >
            {loading ? (
              <><Spinner size="sm" className="me-2" />Verifying...</>
            ) : (
              "Verify & Update"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
