import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import config from "../config";
import RoleSelect from "../components/signup/RoleSelect";
import AccountForm from "../components/signup/AccountForm";
import OtpVerify from "../components/signup/OtpVerify";

const palette = {
  page: "#f7f9fc",
  card: "#ffffff",
  ink: "#0b1220",
  muted: "#667085",
  brand: "#5357eb",
  border: "rgba(12, 35, 64, 0.08)",
};

export default function Signup() {
  const [step, setStep] = useState(1); // 1 role, 2 account, 3 otp
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
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  const baseURL = useMemo(
    () => (import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL),
    []
  );

  useEffect(() => {
    if (step === 3 && timer > 0) {
      const id = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(id);
    }
    if (timer === 0) setCanResend(true);
  }, [step, timer]);

  const onChange = (e) => setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSendOtp = async () => {
    const { username, email, phone, password, confirmPassword } = formData;
    if (!username || !email || !phone || !password || !confirmPassword) return toast.error("❌ Please fill all fields.");
    if (password !== confirmPassword) return toast.error("❌ Passwords do not match.");

    try {
      setLoading(true);
      await axios.post(`${baseURL}/api/send-otp`, { email, phone });
      toast.success("📨 OTP sent successfully!");
      setStep(3);
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const { username, email, phone, password } = formData;
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/api/verify-otp`, { email, otp });
      if (!res.data?.success) return toast.error(res.data?.message || "❌ OTP verification failed");

      const signupRes = await axios.post(`${baseURL}/api/signup`, {
        fullname: username,
        email,
        phone,
        password,
        role: userType,
      });

      const user = signupRes.data.user || { fullname: username, email, role: userType };
      toast.success("✅ Signup successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ OTP verification or signup failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!canResend) return;
    try {
      setLoading(true);
      await axios.post(`${baseURL}/api/send-otp`, { email: formData.email, phone: formData.phone });
      toast.success("🔄 OTP re-sent");
      setTimer(60);
      setCanResend(false);
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const loginWithFacebook = (type) => {
    window.location.href = `${baseURL}/api/auth/facebook?userType=${type}`;
  };
  const loginWithGoogle = (type) => {
    window.location.href = `${baseURL}/api/auth/google?userType=${type}`;
  };

  return (
    <Container fluid className="py-5 d-flex align-items-center justify-content-center" >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={9} md={7} lg={5} xl={4}>
          <Card className="p-4 rounded-4 shadow-lg" style={{ background: palette.card, border: `1px solid ${palette.border}` }}>
            <h2 className="text-center fw-bold mb-4" style={{ color: palette.ink }}>
              {step === 1 ? "" : step === 2 ? "Create Account" : "Verify OTP"}
            </h2>

            {step === 1 && <RoleSelect onSelect={(t) => { setUserType(t); setStep(2); }} />}

            {step === 2 && (
              <AccountForm
                formData={formData}
                onChange={onChange}
                onSubmit={handleSendOtp}
                loading={loading}
                onFacebook={() => loginWithFacebook(userType)}
                onGoogle={() => loginWithGoogle(userType)}
              />
            )}

            {step === 3 && (
              <OtpVerify
                otp={otp}
                setOtp={setOtp}
                seconds={timer}
                canResend={canResend}
                onResend={resendOtp}
                onVerify={handleVerifyOtp}
                loading={loading}
              />
            )}

            {step > 1 && (
              <div className="text-center mt-3" style={{ fontSize: "0.9rem", color: palette.muted }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: palette.brand, fontWeight: 700 }}>
                  Login
                </Link>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
