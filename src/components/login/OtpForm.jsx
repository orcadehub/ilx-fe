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
          style={{
            width: 44, height: 50, textAlign: "center", fontSize: "1.25rem",
            borderRadius: 10, border: "1.5px solid #90caf9", background: "#f7f8fc",
          }}
        />
      ))}
    </div>
  );
}

export default function OtpForm({
  otp, setOtp, seconds, canResend, onResend, resendLoading,
  onVerify, verifyLoading, palette
}) {
  return (
    <div>
      <label className="form-label">Enter OTP</label>
      <OtpInputs value={otp} onChange={setOtp} length={6} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        {seconds > 0 ? (
          <span className="text-muted">⏳ Resend OTP in {seconds}s</span>
        ) : (
          <Button variant="link" onClick={onResend} disabled={!canResend || resendLoading}>
            {resendLoading ? <Spinner size="sm" /> : "🔁 Resend OTP"}
          </Button>
        )}
      </div>
      <Button
        className="w-100"
        onClick={onVerify}
        disabled={verifyLoading || otp.length < 6}
        style={{ background: palette.brand, borderColor: palette.brand }}
      >
        {verifyLoading ? <Spinner size="sm" /> : "Verify & Login"}
      </Button>
    </div>
  );
}
