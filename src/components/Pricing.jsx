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
  },
];

function Pricing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/payment');
  };

  return (
    <div style={{ backgroundColor: '#f9fcff', padding: '60px 20px' }}>
      <Container fluid>
        <h2 className="fw-bold mb-3 text-center mb-2">Transparent Pricing Plan</h2>
        <p className="text-muted text-center mb-5">
          Choose the plan that fits your business needs. No hidden fees, cancel anytime.
        </p>
        <Row className="g-4">
          {plans.map((plan, idx) => (
            <Col md={6} lg={3} key={idx}>
              <Card
                className="h-100 shadow-sm border-0 text-start"
                style={{
                  borderRadius: '20px',
                  backgroundColor: '#ffffffcc',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Body className="d-flex flex-column">
                  <h5 className="fw-bold">{plan.title}</h5>
                  <h3 className="fw-bold">
                    {plan.price}{' '}
                    <small className="text-muted fs-6">{plan.period}</small>
                  </h3>
                  <p className="text-muted">{plan.description}</p>
                  <ul className="list-unstyled mt-3 mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2">
                        <FaCheckCircle className="me-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Button
                      variant={plan.variant === 'primary' ? 'primary' : 'outline-primary'}
                      className="w-100 fw-bold"
                      style={{ borderRadius: '10px' }}
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
    </div>
  );
}

export default Pricing;
