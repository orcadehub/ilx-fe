import React, { useRef } from "react";
import { Button, Spinner } from "react-bootstrap";

function OtpInputs({ value, onChange, length = 6 }) {
  const refs = useRef([...Array(length)].map(() => React.createRef()));
  const handle = (i, v) => {
    const next = (value.substring(0, i) + v.replace(/\D/g, "") + value.substring(i + 1)).slice(0, length);
    onChange(next);
    if (v && i < length - 1) refs.current[i + 1].current?.focus();
  };
  const backspace = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1].current?.focus();
  };
  return (
    <div className="d-flex gap-2 justify-content-center mb-3">
      {[...Array(length)].map((_, i) => (
        <input
          key={i}
          ref={refs.current[i]}
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => backspace(i, e)}
          aria-label={`OTP Digit ${i + 1}`}
          style={{ width: 44, height: 50, textAlign: "center", fontSize: "1.25rem", borderRadius: 10, border: "1.5px solid #90caf9", background: "#f7f8fc" }}
        />
      ))}
    </div>
  );
}

export default function OtpVerify({ otp, setOtp, seconds, canResend, onResend, onVerify, loading }) {
  return (
    <>
      <label className="form-label">Enter OTP</label>
      <OtpInputs value={otp} onChange={setOtp} length={6} />
      <div className="text-center text-muted mb-3">
        {seconds > 0 ? <>⏳ Resend OTP in {seconds} sec</> : (
          <Button variant="link" onClick={onResend} disabled={!canResend || loading}>🔄 Resend OTP</Button>
        )}
      </div>
      <Button onClick={onVerify} className="w-100 mb-2" disabled={loading || otp.length < 6} style={{ borderRadius: 30, padding: "12px 0", backgroundColor: "#28a745", border: "none", color: "#fff", fontWeight: 700 }}>
        {loading ? <Spinner animation="border" size="sm" /> : "Verify & Signup"}
      </Button>
    </>
  );
}
