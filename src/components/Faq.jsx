/*FAQ Component*/
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Faq() {
  const navigate = useNavigate();

  const faqData = [
    {
      question: '📌 How do I get started?',
      answer:
        'Simply sign up for a free account, complete your profile, and start exploring our platform. Our onboarding process will guide you through the basics.',
      button: 'Go to Signup',
      path: '/signup',
    },
    {
      question: '🎁 Is there a free trial?',
      answer:
        'Yes! We offer a 14-day free trial for all new users. You can explore all features and see if our platform is right for you.',
      button: 'Start Free Trial',
      path: '/pricing',
    },
    {
      question: '💸 How does pricing work?',
      answer:
        'We offer flexible pricing plans based on your needs. Check our pricing page for detailed information about features and costs.',
      button: 'View Pricing',
      path: '/pricing',
    },
    {
      question: '🔓 Can I cancel anytime?',
      answer:
        'Absolutely! You can cancel your subscription at any time. No long-term contracts or cancellation fees.',
      button: 'Contact Support',
      path: '/contact',
    },
  ];

  return (
    <div className="py-5" style={{ backgroundColor: '#f8fbff' }}>
      <Container>
        <div className="text-center mb-5">
          <FaQuestionCircle className="text-primary mb-3" size={40} />
          <h2 className="fw-bold">Frequently Asked Questions</h2>
          <p className="text-muted fs-5">
            Find quick answers to common questions about our platform and services.
          </p>
        </div>

        <Row className="g-4">
          {faqData.map((faq, idx) => (
            <Col md={6} key={idx}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <h5 className="fw-bold">{faq.question}</h5>
                  <p className="text-muted mb-4">{faq.answer}</p>
                  <Button
                    variant="outline-primary"
                    className="rounded-pill"
                    onClick={() => navigate(faq.path)}
                  >
                    {faq.button}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Faq;