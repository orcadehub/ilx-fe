import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const plans = [
  {
    title: 'Basic',
    price: '$49',
    period: 'per month',
    description: 'Perfect for small businesses just getting started with influencer marketing.',
    features: [
      'Access to 1,000+ influencers',
      '5 campaign requests per month',
      'Basic analytics',
      'Email support',
    ],
    button: 'Get Started',
    variant: 'light',
    bgColor: '#F9FAFB',
  },
  {
    title: 'Pro',
    price: '$99',
    period: 'per month',
    description: 'Ideal for growing businesses ready to scale their influencer marketing.',
    features: [
      'Access to 5,000+ influencers',
      '20 campaign requests per month',
      'Advanced analytics',
      'Priority email support',
      'Campaign management tools',
    ],
    button: 'Get Started',
    variant: 'primary',
    bgColor: '#EAF4FF',
  },
  {
    title: 'Advanced',
    price: '$199',
    period: 'per month',
    description: 'For established businesses with serious influencer marketing needs.',
    features: [
      'Access to all influencers',
      'Unlimited campaign requests',
      'Comprehensive analytics',
      '24/7 phone support',
      'Dedicated account manager',
      'Custom reporting',
    ],
    button: 'Get Started',
    variant: 'light',
    bgColor: '#F3F4F6',
  },
  {
    title: 'Custom',
    price: 'Contact Us',
    period: '',
    description: 'Tailored solutions for enterprise clients with specific requirements.',
    features: [
      'Custom influencer selection',
      'Bespoke campaign strategies',
      'White-label options',
      'API access',
      'Multi-user accounts',
      'Enterprise-level support',
    ],
    button: 'Contact Sales',
    variant: 'light',
    bgColor: '#F0F9FF',
  },
];

function Pricing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/payment');
  };

  return (
    <section style={{ backgroundColor: '#F9FCFF', padding: '80px 20px', fontFamily: 'Poppins, sans-serif' }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 text-dark">Transparent Pricing Plan</h2>
          <p className="text-muted fs-5">Choose the plan that fits your business needs. No hidden fees, cancel anytime.</p>
        </div>
        <Row className="g-4">
          {plans.map((plan, idx) => (
            <Col md={6} lg={3} key={idx}>
              <Card
                className="h-100 shadow-sm border-0"
                style={{
                  borderRadius: '20px',
                  backgroundColor: plan.bgColor,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                <Card.Body className="d-flex flex-column p-4">
                  <h5 className="fw-semibold mb-2 text-primary">{plan.title}</h5>
                  <h3 className="fw-bold mb-1" style={{ color: '#111827' }}>
                    {plan.price} <small className="text-muted fs-6">{plan.period}</small>
                  </h3>
                  <p className="text-muted mb-4" style={{ minHeight: '60px' }}>{plan.description}</p>
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2 d-flex align-items-start">
                        <FaCheckCircle className="me-2 text-success mt-1" />
                        <span style={{ fontSize: '0.95rem', color: '#374151' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button
                      variant={plan.variant === 'primary' ? 'primary' : 'outline-primary'}
                      className="w-100 fw-semibold"
                      style={{ borderRadius: '10px', padding: '10px 0' }}
                      onClick={handleClick}
                    >
                      {plan.button}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Pricing;
