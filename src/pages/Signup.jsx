import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

const COLORS = {
  primary: "#007bff",
  success: "#28a745",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  background: "#f8f9fa",
  surface: "#ffffff",
  border: "#ced4da",
  card: "#ffffff",
};

const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const navigate = useNavigate();

  const baseURL =
    import.meta.env.MODE === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  useEffect(() => {
    if (step === 3 && timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setIsResendEnabled(true);
  }, [step, timer]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    const { username, email, phone, password, confirmPassword } = formData;
    if (!username || !email || !phone || !password || !confirmPassword) {
      return toast.error("❌ Please fill all fields.");
    }
    if (password !== confirmPassword) {
      return toast.error("❌ Passwords do not match.");
    }

    try {
      setLoading(true);
      await axios.post(`${baseURL}/api/send-otp`, { email, phone });
      toast.success("📨 OTP sent successfully!");
      setStep(3);
      setTimer(60);
      setIsResendEnabled(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const { username, email, phone, password } = formData;

    try {
      setLoading(true);

      const res = await axios.post(`${baseURL}/api/verify-otp`, { email, otp });

      if (res.data.success) {
        const signupRes = await axios.post(`${baseURL}/api/signup`, {
          fullname: username,
          email,
          phone,
          password,
          role: userType,
        });

        const user = signupRes.data.user || {
          fullname: username,
          email,
          role: userType,
        };

        toast.success("✅ Signup successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/login");
      } else {
        toast.error(res.data.message || "❌ OTP verification failed");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "❌ OTP verification or signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderOtpField = () => (
    <>
      <Form.Group className="mb-3" controlId="otp">
        <Form.Label style={{ fontWeight: "600", color: COLORS.textSecondary }}>
          Enter OTP
        </Form.Label>
        <Form.Control
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Enter OTP"
          style={inputStyle}
        />
      </Form.Group>

      <div className="text-center text-muted mb-3">
        {timer > 0 ? (
          <>⏳ Resend OTP in {timer} sec</>
        ) : (
          <Button variant="link" onClick={sendOtp} disabled={!isResendEnabled}>
            🔄 Resend OTP
          </Button>
        )}
      </div>

      <Button
        onClick={verifyOtp}
        className="w-100 mb-3"
        disabled={loading}
        style={submitBtnStyle(COLORS.success)}
      >
        {loading ? <Spinner animation="border" size="sm" /> : "Verify & Signup"}
      </Button>
    </>
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

  const inputStyle = {
    borderRadius: "10px",
    borderColor: COLORS.border,
    padding: "12px 14px",
    fontSize: "1rem",
    backgroundColor: COLORS.surface,
    fontFamily: "'Open Sans', sans-serif",
    color: COLORS.textPrimary,
  };

  const submitBtnStyle = (bgColor) => ({
    borderRadius: "30px",
    padding: "12px 0",
    backgroundColor: bgColor,
    border: "none",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.1rem",
  });

  const renderUserTypeButtons = () =>
    ["business", "influencer"].map((type) => (
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
    ));

  return (
    <Container
      fluid
      className="py-5 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: COLORS.background }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={5} xl={4}>
          <div
            className="p-4 shadow rounded-4"
            style={{ backgroundColor: COLORS.card }}
          >
            <h2
              className="text-center fw-bold mb-4"
              style={{ color: COLORS.textPrimary }}
            >
              {step === 1
                ? "Choose User Type"
                : step === 2
                ? "Create Account"
                : "Verify OTP"}
            </h2>

            {step === 1 && renderUserTypeButtons()}

            {step === 2 && (
              <Form>
                {renderInputField("username", "Full Name")}
                {renderInputField("email", "Email", "email")}
                {renderInputField("phone", "Phone")}
                {renderInputField("password", "Password", "password")}
                {renderInputField(
                  "confirmPassword",
                  "Confirm Password",
                  "password"
                )}

                <Button
                  type="button"
                  className="w-100 mb-3"
                  onClick={sendOtp}
                  disabled={loading}
                  style={submitBtnStyle(COLORS.primary)}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Send OTP"}
                </Button>
              </Form>
            )}

            {step === 3 && <Form>{renderOtpField()}</Form>}

            {step > 1 && (
              <div
                className="text-center mt-3"
                style={{ fontSize: "0.9rem", color: COLORS.textSecondary }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: COLORS.primary, fontWeight: "600" }}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
