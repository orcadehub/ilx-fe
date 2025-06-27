import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const COLORS = {
  primary: "#000",
  primaryHover: "#6D28D9",
  primaryActive: "#5B21B6",
  primaryDisabled: "#A78BFA",
  secondary: "#EC4899",
  secondaryHover: "#DB2777",
  secondaryActive: "#BE185D",
  secondaryDisabled: "#F9A8D4",
  background: "#FFFFFF",
  card: "#F8FAFC",
  surface: "#F1F5F9",
  border: "#E2E8F0",
  textPrimary: "#0F172A",
  textSecondary: "#475569",
  muted: "#94A3B8",
  placeholder: "#CBD5E1",
  success: "#10B981",
  error: "#EF4444",
  info: "#3B82F6",
};

const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, phone, password, confirmPassword } = formData;
    if (password !== confirmPassword) return toast.info("Passwords do not match.");

    try {
      await axios.post("http://localhost:4000/api/signup", {
        fullname: username,
        email,
        phone,
        password,
        role: userType,
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  const inputStyle = {
    borderRadius: "10px",
    borderColor: COLORS.border,
    padding: "12px 14px",
    fontSize: "1rem",
    backgroundColor: COLORS.surface,
    fontFamily: "'Open Sans', sans-serif",
    color: COLORS.textPrimary,
  };

  const renderUserTypeButtons = () => (
    ["business", "influencer", "admin"].map((type) => (
      <Button
        key={type}
        variant="outline-info"
        className="w-100 mb-3"
        onClick={() => {
          setUserType(type);
          setStep(2);
        }}
        style={{
          fontWeight: "600",
          borderRadius: "12px",
          padding: "12px",
          borderColor: COLORS.primary,
          color: COLORS.primary,
        }}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)} User
      </Button>
    ))
  );

  const renderInputField = (name, label, type = "text") => (
    <Form.Group className="mb-3" controlId={name} key={name}>
      <Form.Label style={{ fontWeight: "600", color: COLORS.textSecondary }}>
        {label}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
        placeholder={`Enter ${label.toLowerCase()}`}
        style={inputStyle}
      />
    </Form.Group>
  );

  return (
    <Container fluid className="py-5 d-flex align-items-center justify-content-center" style={{ backgroundColor: COLORS.background }}>
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={5} xl={4}>
          <div className="p-4 shadow rounded-4" style={{ backgroundColor: COLORS.card }}>
            <h2 className="text-center fw-bold mb-4" style={{ color: COLORS.textPrimary }}>
              {step === 1 ? "Choose User Type" : "Create Account"}
            </h2>

            {step === 1 ? renderUserTypeButtons() : (
              <>
                <Form onSubmit={handleSubmit}>
                  {renderInputField("username", "FullName")}
                  {renderInputField("email", "Email", "email")}
                  {renderInputField("phone", "Phone")}
                  {renderInputField("password", "Password", "password")}
                  {renderInputField("confirmPassword", "Confirm Password", "password")}

                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    style={{
                      borderRadius: "30px",
                      padding: "12px 0",
                      backgroundColor: COLORS.primary,
                      border: "none",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: "1.1rem",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
                  >
                    Signup
                  </Button>

                  {/* <Button variant="outline-secondary" className="w-100 mb-3" onClick={() => setStep(1)}>
                    ← Back
                  </Button> */}
                </Form>

                <div className="text-center mt-3" style={{ fontSize: "0.9rem", color: COLORS.textSecondary }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: COLORS.primary, fontWeight: "600" }}>Login</Link>
                </div>

                <div className="text-center mt-4 mb-2 text-muted">— or signup with —</div>

                <Row className="g-3">
                  <Col xs={12} sm={6}>
                    <Button
                      href="http://localhost:4000/auth/google"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ ...socialBtnStyle(COLORS.info), color: "#fff" }}
                    >
                      <GoogleIcon style={{ fontSize: 22 }} /> Google
                    </Button>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Button
                      href="http://localhost:4000/auth/facebook"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ ...socialBtnStyle(COLORS.secondary), color: "#fff" }}
                    >
                      <FacebookIcon style={{ fontSize: 22 }} /> Facebook
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const socialBtnStyle = (bg) => ({
  backgroundColor: bg,
  borderRadius: "30px",
  padding: "10px 0",
  fontWeight: "600",
  fontSize: "1rem",
  border: "none",
  boxShadow: `0 5px 10px ${bg}66`,
  fontFamily: "'Open Sans', sans-serif",
  transition: "background-color 0.3s ease",
});

export default Signup;