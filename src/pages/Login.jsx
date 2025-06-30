import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import config from '../config';
const Login = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const baseURL =
    import.meta.env.MODE === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post(`${baseURL}/api/login`, {
        "email":userInput,
        password,
        "role":userType
      });

      const { token, user, message } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(message);
      navigate('/dashboard');
    } catch (err) {
      const error = err.response?.data?.error || 'Something went wrong';
      setErrorMsg(error);
      console.error(error);
    }
  };

  const sharedInputStyle = {
    borderRadius: '12px',
    borderColor: '#90caf9',
    padding: '12px 15px',
    fontSize: '1rem',
    backgroundColor: '#f9f9f9',
    fontFamily: "'Open Sans', sans-serif",
    color: '#1B263B',
  };

  const socialBtnStyle = (bg, hover) => ({
    backgroundColor: bg,
    borderRadius: '30px',
    padding: '10px 0',
    fontWeight: '600',
    fontSize: '1rem',
    border: 'none',
    color: '#fff',
    boxShadow: `0 5px 10px ${bg}66`,
    fontFamily: "'Open Sans', sans-serif",
    transition: 'background-color 0.3s ease',
  });

  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-center py-5 bg-white">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={5} xl={4}>
          <div className="shadow-lg p-4 rounded-4" style={{ background: '#fff', fontFamily: "'Playfair Display', serif", color: '#1B263B' }}>
            <h2 className="text-center fw-bold mb-4">{step === 1 ? 'Select Role' : 'Login to Account'}</h2>

            {step === 1 ? (
              ['business', 'influencer', 'admin'].map((type) => (
                <Button
                  key={type}
                  variant="outline-primary"
                  className="w-100 mb-3 text-dark"
                  onClick={() => {
                    setUserType(type);
                    setStep(2);
                  }}
                  style={{ fontWeight: '600', borderRadius: '12px', padding: '12px' }}
                  onMouseEnter={(e) => (e.currentTarget.classList.add('text-light'))}
                  onMouseLeave={(e) => (e.currentTarget.classList.remove('text-light'))}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} User
                </Button>
              ))
            ) : (
              <>
                {errorMsg && (
                  <div className="alert alert-danger text-center py-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {errorMsg}
                  </div>
                )}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4" controlId="formUser">
                    <Form.Label style={{ fontWeight: '600', color: '#415A77', fontFamily: "'Open Sans', sans-serif" }}>
                      Username / Email / Phone
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Enter email "
                      required
                      style={sharedInputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label style={{ fontWeight: '600', color: '#415A77', fontFamily: "'Open Sans', sans-serif" }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      style={sharedInputStyle}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-center mb-3">
                    {/* <Button
                      variant="secondary"
                      onClick={() => setStep(1)}
                      style={{ borderRadius: '20px', padding: '6px 16px', fontFamily: "'Open Sans', sans-serif" }}
                    >
                      ← Back
                    </Button> */}

                    <Button
                      variant="primary"
                      type="submit"
                      style={{ borderRadius: '30px', padding: '10px 20px', fontWeight: '700', backgroundColor: '#1B263B', border: 'none', fontFamily: "'Playfair Display', serif",width:'100%' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#415A77')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1B263B')}
                    >
                      Login
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-3" style={{ fontSize: '0.9rem', color: '#415A77', fontFamily: "'Open Sans', sans-serif" }}>
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ color: '#2575fc', fontWeight: '600', textDecoration: 'none' }}>
                    Signup
                  </Link>
                </div>

                <div className="text-center mt-4 mb-2 text-muted" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  — or login with —
                </div>

                <Row className="g-3">
                  <Col xs={12} sm={6}>
                    <Button
                      href="http://localhost:4000/auth/google"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      style={socialBtnStyle('#db4437', '#c33d2f')}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c33d2f')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#db4437')}
                    >
                      <GoogleIcon style={{ fontSize: 22 }} /> Google
                    </Button>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Button
                      href="http://localhost:4000/auth/facebook"
                      className="w-100 d-flex align-items-center justify-content-center gap-2"
                      style={socialBtnStyle('#1877f2', '#1565c0')}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1565c0')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1877f2')}
                    >
                      <FacebookIcon style={{ fontSize: 22 }} /> Facebook
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;