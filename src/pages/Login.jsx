import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import config from "../config";
import RoleSelect from "../components/login/RoleSelect";
import CredentialsForm from "../components/login/CredentialsForm";
import OtpForm from "../components/login/OtpForm";
import ForgotFlow from "../components/login/ForgotFlow";

const palette = {
  ink: "#0b1220",
  muted: "#64748b",
  glow: "#90caf9",
  brand: "#5357eb",
  brandDark: "#3a3ed4",
  panel: "#ffffff",
  page: "#ffffff",
  border: "rgba(12, 35, 64, 0.08)",
};

export default function Login() {
  const [step, setStep] = useState(1); // 1 role, 2 creds, 3 otp
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [resendEnabled, setResendEnabled] = useState(false);

  // Forgot
  const [isForgot, setIsForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // Loading flags
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const navigate = useNavigate();

  const baseURL = useMemo(
    () =>
      import.meta.env.MODE === "development"
        ? config.LOCAL_BASE_URL
        : config.BASE_URL,
    []
  );

  // OTP resend timer
  useEffect(() => {
    if (timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
    if (timer === 0) setResendEnabled(true);
  }, [timer]);

  // API helpers
  const check2FA = async () => {
    const res = await axios.get(`${baseURL}/api/check-2fa`, {
      params: { email },
    });
    return !!res.data?.is2FAEnabled;
  };

  const sendOtp = async () => {
    await axios.post(`${baseURL}/api/send-otp`, { email });
  };

  const verifyOtp = async (code) => {
    const res = await axios.post(`${baseURL}/api/verify-otp`, {
      email,
      otp: code,
    });
    return !!res.data?.success;
  };

  const loginDirect = async () => {
    const res = await axios.post(`${baseURL}/api/login`, {
      email,
      password,
      role: userType,
    });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    toast.success(res.data.message);
    navigate("/dashboard");
    window.location.reload();
  };

  // Main flow
  const handleLoginFlow = async () => {
    if (!email || !password || !userType)
      return toast.error("All fields are required");
    try {
      setLoading(true);
      const is2fa = await check2FA();
      if (is2fa) {
        await sendOtp();
        toast.success("OTP sent to email");
        setStep(3);
        setTimer(60);
        setResendEnabled(false);
      } else {
        await loginDirect();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndLogin = async () => {
    try {
      setLoading(true);
      const ok = await verifyOtp(otp);
      if (!ok) return toast.error("OTP verification failed");
      await loginDirect();
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!resendEnabled) return;
    try {
      setOtpLoading(true);
      await sendOtp();
      setTimer(60);
      setResendEnabled(false);
      toast.success("OTP re-sent");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  // Forgot password flow
  const handleForgotSendOtp = async () => {
    if (!email) return toast.error("Enter your email");
    try {
      setForgotLoading(true);
      await sendOtp();
      toast.success("OTP sent to email");
      setForgotStep(2);
      setTimer(60);
      setResendEnabled(false);
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
      const ok = await verifyOtp(forgotOtp);
      if (!ok) return toast.error("OTP invalid");
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
      setForgotStep(1);
      setStep(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center py-5"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={9} md={7} lg={5} xl={4}>
          <Card
            className="shadow-lg p-4 rounded-4"
            style={{
              background: palette.panel,
              border: `1px solid ${palette.border}`,
              boxShadow: "0 14px 42px rgba(38,50,56,.08)",
            }}
          >
            <h2
              className="text-center fw-bold mb-4"
              style={{ color: palette.ink }}
            >
              {isForgot
                ? "Forgot Password"
                : step === 1
                ? ""
                : step === 2
                ? "Login"
                : "Verify OTP"}
            </h2>

            {!isForgot && step === 1 && (
              <RoleSelect
                onSelect={(t) => {
                  setUserType(t);
                  setStep(2);
                }}
              />
            )}

            {!isForgot && step === 2 && (
              <CredentialsForm
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                onForgot={() => setIsForgot(true)}
                onLogin={handleLoginFlow}
                loading={loading}
                userType={userType}
                onLoginWithFacebook={(t) =>
                  (window.location.href = `${baseURL}/api/auth/facebook?userType=${t}`)
                }
                onLoginWithGoogle={(t) =>
                  (window.location.href = `${baseURL}/api/auth/google?userType=${t}`)
                }
                palette={palette}
              />
            )}

            {!isForgot && step === 3 && (
              <OtpForm
                otp={otp}
                setOtp={setOtp}
                seconds={timer}
                canResend={resendEnabled}
                onResend={handleResendOtp}
                resendLoading={otpLoading}
                onVerify={handleVerifyAndLogin}
                verifyLoading={loading}
                palette={palette}
              />
            )}

            {isForgot && (
              <ForgotFlow
                step={forgotStep}
                email={email}
                setEmail={setEmail}
                forgotOtp={forgotOtp}
                setForgotOtp={setForgotOtp}
                newPass={newPass}
                setNewPass={setNewPass}
                confirmPass={confirmPass}
                setConfirmPass={setConfirmPass}
                seconds={timer}
                canResend={resendEnabled}
                onSendOtp={handleForgotSendOtp}
                onResend={handleForgotSendOtp}
                onVerifyOtp={handleForgotVerifyOtp}
                onReset={handleResetPassword}
                loading={forgotLoading}
                onBack={() => {
                  setIsForgot(false);
                  setForgotStep(1);
                }}
                palette={palette}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
