import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";

export default function ForgotFlow({
  step, email, setEmail, forgotOtp, setForgotOtp,
  newPass, setNewPass, confirmPass, setConfirmPass,
  seconds, canResend, onSendOtp, onResend, onVerifyOtp, onReset,
  loading, onBack, palette
}) {
  const inputStyle = {
    borderRadius: 12, borderColor: "#90caf9", padding: "12px 15px",
    fontSize: "1rem", backgroundColor: "#f9f9f9", color: "#1B263B",
  };

  return (
    <Form>
      {step === 1 && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Enter your email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </Form.Group>
          <Button onClick={onSendOtp} disabled={loading} className="w-100" style={{ background: palette?.brand, borderColor: palette?.brand }}>
            {loading ? <Spinner size="sm" /> : "Send OTP"}
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control type="text" value={forgotOtp} onChange={(e) => setForgotOtp(e.target.value)} style={inputStyle} />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {seconds > 0 ? (
              <span className="text-muted">⏳ Resend OTP in {seconds}s</span>
            ) : (
              <Button variant="link" onClick={onResend} disabled={!canResend || loading}>
                🔁 Resend OTP
              </Button>
            )}
          </div>
          <Button onClick={onVerifyOtp} disabled={loading} className="w-100" style={{ background: palette?.brand, borderColor: palette?.brand }}>
            {loading ? <Spinner size="sm" /> : "Verify OTP"}
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} style={inputStyle} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} style={inputStyle} />
          </Form.Group>
          <Button onClick={onReset} className="w-100" disabled={loading} style={{ background: palette?.brand, borderColor: palette?.brand }}>
            {loading ? <Spinner size="sm" /> : "Reset Password"}
          </Button>
        </>
      )}

      <div className="text-center mt-3">
        <Button variant="link" onClick={onBack}>← Back to Login</Button>
      </div>
    </Form>
  );
}
