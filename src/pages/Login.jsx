import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

const Login = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [timer, setTimer] = useState(0);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL =
    import.meta.env.MODE === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  const handleFacebookLogin = (type) => {
    window.location.href = `${baseURL}/api/auth/facebook?userType=${type}`;
  };

  const handleGoogleLogin = (type) => {
    window.location.href = `${baseURL}/api/auth/google?userType=${type}`;
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0) setIsResendEnabled(true);
  }, [timer]);

  const handleLoginFlow = async () => {
    if (!email || !password || !userType)
      return toast.error("All fields are required");

    try {
      setLoading(true);
      // Step 1: Check if 2FA is enabled

      const res = await axios.get(`${baseURL}/api/check-2fa`, {
        params: { email },
      });
      const is2FAEnabled = res.data?.is2FAEnabled;

      if (is2FAEnabled) {
        // Send OTP and go to OTP step
        await axios.post(`${baseURL}/api/send-otp`, { email });
        toast.success("OTP sent to email");
        setStep(3);
        setTimer(60);
        setIsResendEnabled(false);
      } else {
        // No 2FA, login directly
        const loginRes = await axios.post(`${baseURL}/api/login`, {
          email,
          password,
          role: userType,
        });

        localStorage.setItem("token", loginRes.data.token);
        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
        toast.success(loginRes.data.message);
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithOtp = async () => {
    try {
      setLoading(true);
      const verifyRes = await axios.post(`${baseURL}/api/verify-otp`, {
        email,
        otp,
      });
      if (!verifyRes.data.success)
        return toast.error("OTP verification failed");

      const loginRes = await axios.post(`${baseURL}/api/login`, {
        email,
        password,
        role: userType,
      });

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      toast.success(loginRes.data.message);
      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSendOtp = async () => {
    if (!email) return toast.error("Enter your email");
    try {
      setForgotLoading(true);
      await axios.post(`${baseURL}/api/send-otp`, { email });
      toast.success("OTP sent to email");
      setForgotStep(2);
      setTimer(60);
      setIsResendEnabled(false);
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleForgotVerifyOtp = async () => {
    if (!forgotOtp) return toast.error("Enter OTP");
    try {
      setForgotLoading(true);
      const verify = await axios.post(`${baseURL}/api/verify-otp`, {
        email,
        otp: forgotOtp,
      });
      if (!verify.data.success) return toast.error("OTP invalid");
      setForgotStep(3);
    } catch {
      toast.error("OTP verification failed");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPass || !confirmPass) return toast.error("All fields required");
    if (newPass !== confirmPass) return toast.error("Passwords do not match");

    try {
      setForgotLoading(true);
      await axios.post(`${baseURL}/api/reset-password`, {
        email,
        newPassword: newPass,
      });
      toast.success("Password reset successfully");
      setIsForgot(false);
      setStep(1);
      setForgotStep(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setForgotLoading(false);
    }
  };

  const sharedInputStyle = {
    borderRadius: "12px",
    borderColor: "#90caf9",
    padding: "12px 15px",
    fontSize: "1rem",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Open Sans', sans-serif",
    color: "#1B263B",
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center py-5 bg-white"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={5} xl={4}>
          <div className="shadow-lg p-4 rounded-4 bg-white">
            <h2 className="text-center fw-bold mb-4">
              {isForgot
                ? "Forgot Password"
                : step === 1
                ? "Select Role"
                : step === 2
                ? "Login"
                : "Verify OTP"}
            </h2>

            {!isForgot &&
              step === 1 &&
              ["business", "influencer", "admin"].map((type) => (
                <Button
                  key={type}
                  variant="outline-primary"
                  className="w-100 mb-3"
                  onClick={() => {
                    setUserType(type);
                    setStep(2);
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} User
                </Button>
              ))}

            {!isForgot && step === 2 && (
              <>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={sharedInputStyle}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={sharedInputStyle}
                      required
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsForgot(true)}
                    >
                      Forgot Password?
                    </span>
                    <Button onClick={handleLoginFlow} disabled={loading}>
                      {loading ? <Spinner size="sm" /> : "Login"}
                    </Button>
                  </div>
                </Form>
                <div className="text-center text-muted mb-3">OR</div>
                <Button
                  variant="outline-primary"
                  className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleFacebookLogin(userType)}
                >
                  <i className="bi bi-facebook fs-5" /> Login with Facebook
                </Button>

                <Button
                  variant="outline-danger"
                  className="w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => handleGoogleLogin(userType)}
                >
                  <i className="bi bi-google fs-5" /> Login with Google
                </Button>
              </>
            )}

            {!isForgot && step === 3 && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={sharedInputStyle}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  {timer > 0 ? (
                    <span className="text-muted">
                      ⏳ Resend OTP in {timer}s
                    </span>
                  ) : (
                    <Button
                      variant="link"
                      onClick={handleLoginFlow}
                      disabled={!isResendEnabled || otpLoading}
                    >
                      🔁 Resend OTP
                    </Button>
                  )}
                </div>
                <Button
                  onClick={handleLoginWithOtp}
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Verify & Login"}
                </Button>
              </Form>
            )}

            {/* Forgot password section remains unchanged */}
            {isForgot && (
              <Form>
                {/* forgotStep 1 */}
                {forgotStep === 1 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter your email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={sharedInputStyle}
                      />
                    </Form.Group>
                    <Button
                      onClick={handleForgotSendOtp}
                      disabled={forgotLoading}
                      className="w-100"
                    >
                      {forgotLoading ? <Spinner size="sm" /> : "Send OTP"}
                    </Button>
                  </>
                )}
                {/* forgotStep 2 */}
                {forgotStep === 2 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Enter OTP</Form.Label>
                      <Form.Control
                        type="text"
                        value={forgotOtp}
                        onChange={(e) => setForgotOtp(e.target.value)}
                        style={sharedInputStyle}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      {timer > 0 ? (
                        <span className="text-muted">
                          ⏳ Resend OTP in {timer}s
                        </span>
                      ) : (
                        <Button
                          variant="link"
                          onClick={handleForgotSendOtp}
                          disabled={!isResendEnabled || forgotLoading}
                        >
                          🔁 Resend OTP
                        </Button>
                      )}
                    </div>
                    <Button
                      onClick={handleForgotVerifyOtp}
                      disabled={forgotLoading}
                      className="w-100"
                    >
                      {forgotLoading ? <Spinner size="sm" /> : "Verify OTP"}
                    </Button>
                  </>
                )}
                {/* forgotStep 3 */}
                {forgotStep === 3 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        style={sharedInputStyle}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        style={sharedInputStyle}
                      />
                    </Form.Group>
                    <Button
                      onClick={handleResetPassword}
                      className="w-100"
                      disabled={forgotLoading}
                    >
                      {forgotLoading ? <Spinner size="sm" /> : "Reset Password"}
                    </Button>
                  </>
                )}
                <div className="text-center mt-3">
                  <Button
                    variant="link"
                    onClick={() => {
                      setIsForgot(false);
                      setForgotStep(1);
                    }}
                  >
                    ← Back to Login
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
