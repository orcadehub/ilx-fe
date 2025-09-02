import React from "react";
import { Form, Button, Spinner } from "react-bootstrap";

export default function CredentialsForm({
  email,
  password,
  setEmail,
  setPassword,
  onForgot,
  onLogin,
  loading,
  userType,
  onLoginWithFacebook,
  onLoginWithGoogle,
  palette,
}) {
  const inputWrap = { position: "relative" };
  const iconLeft = {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#7c8aa5",
    fontSize: 18,
  };
  const inputStyle = {
    borderRadius: 12,
    border: "1.6px solid #e5e7eb",
    padding: "12px 14px 12px 40px",
    fontSize: "1rem",
    backgroundColor: "#f7f8fc",
    color: "#1B263B",
  };
  const brandBtn = {
    background: palette.brand,
    borderColor: palette.brand,
    borderRadius: 12,
    padding: "10px 18px",
    fontWeight: 700,
  };
  const outlineBtn = (variantBorder) => ({
    borderRadius: 12,
    padding: "10px 16px",
    fontWeight: 600,
    borderWidth: 2,
  });

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Email</Form.Label>
          <div style={inputWrap}>
            <i className="bi bi-envelope" style={iconLeft} />
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="name@company.com"
              required
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Password</Form.Label>
          <div style={inputWrap}>
            <i className="bi bi-lock" style={iconLeft} />
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />
          </div>
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Check type="checkbox" id="remember" label="Remember me" />
          <span
            className="text-primary"
            style={{ cursor: "pointer", fontWeight: 600 }}
            onClick={onForgot}
          >
            Forgot password?
          </span>
        </div>

        <Button
          className="w-100 mb-2"
          onClick={onLogin}
          disabled={loading}
          style={brandBtn}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3a3ed4")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = palette.brand)
          }
        >
          {loading ? <Spinner size="sm" /> : "Sign in"}
        </Button>
      </Form>

      {userType !== "admin" && (
        <>
          <div className="d-flex align-items-center my-3">
            <div style={{ height: 1, background: "#e5e7eb", flex: 1 }} />
            <span className="text-muted px-3 fw-semibold">OR</span>
            <div style={{ height: 1, background: "#e5e7eb", flex: 1 }} />
          </div>

          <div className="row g-2 my-2">
            <div className="col-12 col-md-6">
              <Button
                variant="outline-primary"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => onLoginWithFacebook(userType)}
                style={{
                  borderRadius: 12,
                  padding: "10px 16px",
                  fontWeight: 600,
                  borderWidth: 2,
                }}
              >
                <i className="bi bi-facebook fs-5" />
                Facebook
              </Button>
            </div>
            <div className="col-12 col-md-6">
              <Button
                variant="outline-danger"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => onLoginWithGoogle(userType)}
                style={{
                  borderRadius: 12,
                  padding: "10px 16px",
                  fontWeight: 600,
                  borderWidth: 2,
                }}
              >
                <i className="bi bi-google fs-5" />
                Google
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
