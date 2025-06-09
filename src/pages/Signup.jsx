import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return toast.info("Passwords do not match.");
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          username,
          email,
          phone,
          password,
        }
      );

      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ backgroundColor: "#ffffff", paddingTop: "50px", paddingBottom: "50px" }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={5} xl={4}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
              padding: "40px 30px",
              fontFamily: "'Playfair Display', serif",
              color: "#1B263B",
            }}
          >
            <h2
              className="mb-4 text-center fw-bold"
              style={{
                fontWeight: "700",
                letterSpacing: "0.05em",
                color: "#1B263B",
              }}
            >
              Create Account
            </h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#415A77",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  style={{
                    borderRadius: "12px",
                    borderColor: "#90caf9",
                    padding: "12px 15px",
                    fontSize: "1rem",
                    backgroundColor: "#f9f9f9",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#1B263B",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#415A77",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  style={{
                    borderRadius: "12px",
                    borderColor: "#90caf9",
                    padding: "12px 15px",
                    fontSize: "1rem",
                    backgroundColor: "#f9f9f9",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#1B263B",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPhone">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#415A77",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  Phone
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  required
                  style={{
                    borderRadius: "12px",
                    borderColor: "#90caf9",
                    padding: "12px 15px",
                    fontSize: "1rem",
                    backgroundColor: "#f9f9f9",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#1B263B",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#415A77",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  style={{
                    borderRadius: "12px",
                    borderColor: "#90caf9",
                    padding: "12px 15px",
                    fontSize: "1rem",
                    backgroundColor: "#f9f9f9",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#1B263B",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formConfirmPassword">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#415A77",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                >
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  style={{
                    borderRadius: "12px",
                    borderColor: "#90caf9",
                    padding: "12px 15px",
                    fontSize: "1rem",
                    backgroundColor: "#f9f9f9",
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#1B263B",
                  }}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{
                  borderRadius: "30px",
                  padding: "12px 0",
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  backgroundColor: "#1B263B",
                  boxShadow: "0 6px 15px rgba(27, 38, 59, 0.3)",
                  border: "none",
                  fontFamily: "'Playfair Display', serif",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#415A77")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B263B")}
              >
                Signup
              </Button>
            </Form>

            <div
              className="text-center mt-3"
              style={{
                fontSize: "0.9rem",
                color: "#415A77",
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#2575fc",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </div>

            <div
              className="text-center mt-5 mb-3"
              style={{
                color: "#757575",
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              — or signup with —
            </div>

            <Row className="g-3">
              <Col xs={12} sm={6}>
                <Button
                  href="http://localhost:4000/auth/google"
                  className="w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#db4437",
                    borderRadius: "30px",
                    padding: "10px 0",
                    fontWeight: "600",
                    fontSize: "1rem",
                    border: "none",
                    color: "#fff",
                    boxShadow: "0 5px 10px rgba(219, 68, 55, 0.4)",
                    fontFamily: "'Open Sans', sans-serif",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c33d2f")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#db4437")}
                >
                  <GoogleIcon style={{ fontSize: 22 }} />
                  Google
                </Button>
              </Col>
              <Col xs={12} sm={6}>
                <Button
                  href="http://localhost:4000/auth/facebook"
                  className="w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#1877f2",
                    borderRadius: "30px",
                    padding: "10px 0",
                    fontWeight: "600",
                    fontSize: "1rem",
                    border: "none",
                    color: "#fff",
                    boxShadow: "0 5px 10px rgba(24, 119, 242, 0.4)",
                    fontFamily: "'Open Sans', sans-serif",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1565c0")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1877f2")}
                >
                  <FacebookIcon style={{ fontSize: 22 }} />
                  Facebook
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
