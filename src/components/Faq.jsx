/* FAQ Component (matches screenshot) */
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';

function Faq() {
  const faqData = [
    {
      question: 'How do I get started?',
      answer:
        'Simply sign up for a free account, complete your profile, and start exploring our platform. Our onboarding process will guide you through the basics.',
    },
    {
      question: 'Is there a free trial?',
      answer:
        'Yes! We offer a 14-day free trial for all new users. You can explore all features and see if our platform is right for you.',
    },
    {
      question: 'How does pricing work?',
      answer:
        'We offer flexible pricing plans based on your needs. Check our pricing page for detailed information about features and costs.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Absolutely! You can cancel your subscription at any time. No long-term contracts or cancellation fees.',
    },
  ];

  // Styles to mirror screenshot
  const wrap = { backgroundColor: '#f3f8ff', padding: '56px 12px' };
  const headWrap = { maxWidth: 860, margin: '0 auto 28px' };
  const h2Style = {
    fontWeight: 800,
    color: '#0b1220',
    fontSize: '2.2rem',
    textAlign: 'center',
    marginBottom: 8,
  };
  const subStyle = {
    color: '#64748b',
    fontSize: '1.06rem',
    textAlign: 'center',
    margin: 0,
  };
  const card = {
    border: '1px solid #e6e9f4',
    borderRadius: 16,
    boxShadow: '0 8px 26px rgba(17,24,39,.06)',
    backgroundColor: '#fff',
  };
  const qStyle = {
    fontWeight: 700,
    color: '#0f172a',
    fontSize: '1.12rem',
    marginBottom: 10,
  };
  const aStyle = {
    color: '#667085',
    margin: 0,
    lineHeight: 1.6,
    fontSize: '1rem',
  };

  return (
    <div style={wrap}>
      <Container>
        <div style={headWrap} className="text-center">
          <FaQuestionCircle size={36} className="mb-2" style={{ color: '#5357eb' }} />
          <h2 style={h2Style}>Frequently Asked Questions</h2>
          <p style={subStyle}>
            Find quick answers to common questions about our platform and services.
          </p>
        </div>

        {/* 2-column grid like screenshot (stacks on small) */}
        <Row className="g-4 justify-content-center">
          {faqData.map((faq, idx) => (
            <Col key={idx} md={6}>
              <Card style={card} className="h-100">
                <Card.Body className="p-4">
                  <h5 style={qStyle}>{faq.question}</h5>
                  <p style={aStyle}>{faq.answer}</p>
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
