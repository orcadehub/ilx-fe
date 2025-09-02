import React from "react";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";

const fieldWrap = {
  position: "relative",
};

const leftIcon = {
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  color: "#7c8aa5",
  fontSize: 18,
  pointerEvents: "none",
};

const inputStyle = {
  borderRadius: 12,
  border: "1.6px solid #e5e7eb",
  backgroundColor: "#f7f8fc",
  color: "#1B263B",
  padding: "12px 14px 12px 42px", // extra left padding for the icon
};

const submitBtn = {
  borderRadius: 14,
  padding: "12px 14px",
  backgroundColor: "#5357eb",
  border: "none",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.05rem",
};

export default function AccountForm({
  formData,
  onChange,
  onSubmit,
  loading,
  onFacebook,
  onGoogle,
}) {
  const Field = ({ name, label, type = "text", icon, placeholder }) => (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label className="fw-semibold">{label}</Form.Label>
      <div style={fieldWrap}>
        <i className={icon} style={leftIcon} />
        <Form.Control
          type={type}
          name={name}
          value={formData[name]}
          onChange={onChange}
          required
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          style={inputStyle}
        />
      </div>
    </Form.Group>
  );

  return (
    <>
      <Form>
        <Field name="username" label="Full Name" icon="bi bi-person" placeholder="Jane Doe" />
        <Field name="email" label="Email" type="email" icon="bi bi-envelope" placeholder="name@company.com" />
        <Field name="phone" label="Phone" type="tel" icon="bi bi-telephone" placeholder="+1 555 123 4567" />
        <Field name="password" label="Password" type="password" icon="bi bi-lock" placeholder="Create a strong password" />
        <Form.Text className="text-muted d-block mb-2">
          Use at least 8 characters, with letters and numbers.
        </Form.Text>
        <Field name="confirmPassword" label="Confirm Password" type="password" icon="bi bi-shield-check" placeholder="Re‑enter password" />

        <Button
          type="button"
          className="w-100 mb-3"
          onClick={onSubmit}
          disabled={loading}
          style={submitBtn}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3a3ed4")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5357eb")}
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Send OTP"}
        </Button>
      </Form>

      <div className="d-flex align-items-center my-3">
        <div style={{ height: 1, background: "#e5e7eb", flex: 1 }} />
        <span className="text-muted px-3 fw-semibold">OR</span>
        <div style={{ height: 1, background: "#e5e7eb", flex: 1 }} />
      </div>

      <Row className="g-2 my-1">
        <Col xs={12} md={6}>
          <Button
            variant="outline-primary"
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={onFacebook}
            style={{ borderRadius: 12, padding: "10px 16px", fontWeight: 600, borderWidth: 2 }}
          >
            <i className="bi bi-facebook fs-5" />
            Facebook
          </Button>
        </Col>
        <Col xs={12} md={6}>
          <Button
            variant="outline-danger"
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={onGoogle}
            style={{ borderRadius: 12, padding: "10px 16px", fontWeight: 600, borderWidth: 2 }}
          >
            <i className="bi bi-google fs-5" />
            Google
          </Button>
        </Col>
      </Row>
    </>
  );
}
