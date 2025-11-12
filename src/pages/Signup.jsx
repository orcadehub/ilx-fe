import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Layout, Card, Typography } from "antd";
import config from "../config";
import RoleSelect from "../components/signup/RoleSelect";
import AccountForm from "../components/signup/AccountForm";
import OtpVerify from "../components/signup/OtpVerify";

const { Content } = Layout;
const { Title } = Typography;

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

      if (signupRes.data.success) {
        const { user, token } = signupRes.data;
        toast.success("✅ Signup successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
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

  const loginWithFacebook = () => {
    window.location.href = `${baseURL}/api/auth/facebook?userType=${userType}`;
  };
  
  const loginWithGoogle = () => {
    window.location.href = `${baseURL}/api/auth/google?userType=${userType}`;
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f7f9fc' }}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <Card 
          style={{ 
            width: '100%', 
            maxWidth: 480, 
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
          }}
          bodyStyle={{ padding: 32 }}
        >
          {step > 1 && (
            <Title level={2} style={{ textAlign: 'center', marginBottom: 32, color: '#0b1220' }}>
              {step === 2 ? "Create Account" : "Verify OTP"}
            </Title>
          )}

          {step === 1 && <RoleSelect onSelect={(t) => { setUserType(t); setStep(2); }} />}

          {step === 2 && (
            <AccountForm
              formData={formData}
              onChange={onChange}
              onSubmit={handleSendOtp}
              loading={loading}
              onFacebook={loginWithFacebook}
              onGoogle={loginWithGoogle}
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
            <div style={{ textAlign: 'center', marginTop: 24, color: '#667085' }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: '#5357eb', fontWeight: 600 }}>
                Login
              </Link>
            </div>
          )}
        </Card>
      </Content>
    </Layout>
  );
}