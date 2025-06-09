/*Contact page*/
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Faq from '../components/Faq';


//css
const styles = {
  contactHero: {
    backgroundColor: '#f8fafc',
  },
  iconWrapper: {
    fontSize: '2rem',
    color: '#4f46e5',
  },
  contactInfo: {
    backgroundColor: '#4f46e5',
    color: 'white',
  },
  socialBtn: {
    width: '45px',
    height: '45px',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    height: '300px',
    backgroundColor: '#e2e8f0',
  },
  mapLabel: {
    backgroundColor: '#fff',
    borderRadius: '50px',
    padding: '0.5rem 1.5rem',
    fontWeight: 500,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  }
};


function Contact() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  return (
    
    <div className="contact-page">
      {/* Hero Section */}
      <div className="text-center py-5" style={styles.contactHero}>
        <Container>
          <h1 className="display-4 fw-bold mb-3">Get in Touch</h1>
          <p className="lead mb-4">We'd love to hear from you! Reach out to us with any questions or inquiries.</p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" size="lg" className="px-4 py-2 rounded-pill">
              <FaPaperPlane className="me-2" /> Send Message
            </Button>
            <Button variant="outline-dark" size="lg" className="px-4 py-2 rounded-pill">
              <FaPhone className="me-2" /> Call Us
            </Button>
          </div>
        </Container>
      </div>

      <Container className="my-5 py-4">
        {/* Contact Cards */}
        {/* <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 contact-card shadow-lg border-0">
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={styles.iconWrapper}>
                  <FaEnvelope className="contact-icon" />
                </div>
                <Card.Title className="fs-3 fw-bold mb-3">Email Us</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Have questions? Send us an email and we'll get back to you as soon as possible.
                </Card.Text>
                <Button variant="primary" className="rounded-pill px-4">
                  contact@example.com
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100 contact-card shadow-lg border-0">
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={styles.iconWrapper}>
                  <FaPhone className="contact-icon" />
                </div>
                <Card.Title className="fs-3 fw-bold mb-3">Call Us</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Need to talk to someone? Call our support team during business hours.
                </Card.Text>
                <Button variant="primary" className="rounded-pill px-4">
                  +1 (555) 123-4567
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100 contact-card shadow-lg border-0">
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={styles.iconWrapper}>
                  <FaMapMarkerAlt className="contact-icon" />
                </div>
                <Card.Title className="fs-3 fw-bold mb-3">Visit Us</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Come see us at our headquarters. We'd love to show you around our facilities.
                </Card.Text>
                <Button variant="primary" className="rounded-pill px-4">
                  123 Innovation Street
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}

        {/* Contact Form and Info */}
        <Row className="g-5 align-items-center">
          <Col lg={6}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <h2 className="fw-bold mb-4">Send Us a Message</h2>
                
                {formStatus === 'success' && (
                  <Alert variant="success" className="mb-4">
                    <span className="fw-bold">Message Sent Successfully!</span> We'll get back to you within 24 hours.
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col md={6} className="mb-3 mb-md-0">
                      <Form.Group controlId="formName">
                        <Form.Label className="fw-medium">Your Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required 
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label className="fw-medium">Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required 
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label className="fw-medium">Subject</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required 
                      size="lg"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label className="fw-medium">Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message here..."
                      required 
                      size="lg"
                    />
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-3 fw-bold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending Message...</>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" /> 
                        Send Message
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={6}>
            <div className="p-4 p-md-5 rounded-4" style={styles.contactInfo}>
              <h2 className="fw-bold mb-4 text-white">Contact Information</h2>
              
              <div className="mb-5">
                <h3 className="text-white mb-3 fs-4">Our Office</h3>
                <p className="text-light mb-0">
                  <FaMapMarkerAlt className="me-2 fs-5" />
                  123 Innovation Street, Tech City, TC 12345
                </p>
              </div>
              
              <div className="mb-5">
                <h3 className="text-white mb-3 fs-4">Business Hours</h3>
                <p className="text-light mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-light mb-0">Saturday - Sunday: Closed</p>
              </div>
              
              <div>
                <h3 className="text-white mb-3 fs-4">Connect With Us</h3>
                <div className="d-flex gap-3">
                  <Button variant="light" className="rounded-circle" style={styles.socialBtn}>
                    <FaLinkedin className="fs-5" />
                  </Button>
                  <Button variant="light" className="rounded-circle" style={styles.socialBtn}>
                    <FaTwitter className="fs-5" />
                  </Button>
                  <Button variant="light" className="rounded-circle" style={styles.socialBtn}>
                    <FaFacebook className="fs-5" />
                  </Button>
                  <Button  variant="light" className="rounded-circle" style={styles.socialBtn}>
                    <FaInstagram className="fs-5" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-5">
                <h3 className="text-white mb-3 fs-4">Need Immediate Help?</h3>
                <Button variant="outline-light" className="w-100 py-3 fw-bold">
                  <FaPhone className="me-2" /> Call Support: +1 (555) 123-4567
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        
       
      </Container>

      {/*FAQ*/}
      <Faq/>
      
     
    </div>
  );
}

export default Contact;