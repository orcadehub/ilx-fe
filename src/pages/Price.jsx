import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import {
  FaCheckCircle,
  FaRocket,
  FaGem,
  FaCrown,
  FaHeadset,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Faq from "../components/Faq";
import Section2 from "../components/Section2";
import Ready from '../components/Ready'

function Price() {
  const navigate = useNavigate();
  // Set default selected plan index (Professional is index 1)
  const [selectedPlan, setSelectedPlan] = useState(1);

  const plans = [
    {
      title: "Starter",
      icon: <FaRocket size={28} className="text-primary" />,
      price: "$29",
      period: "per month",
      features: [
        "Up to 5 influencer searches per month",
        "Basic campaign analytics",
        "Email support",
        "Access to micro-influencers",
        "Campaign templates",
      ],
      limitations: [
        "No advanced filtering",
        "Limited to 1 active campaign",
        "No dedicated account manager",
      ],
      path: "/signup",
    },
    {
      title: "Professional",
      icon: <FaGem size={28} className="text-success" />,
      price: "$79",
      period: "per month",
      features: [
        "Up to 20 influencer searches per month",
        "Advanced campaign analytics",
        "Priority email and chat support",
        "Access to mid-tier and micro-influencers",
        "Custom campaign templates",
        "Team collaboration tools",
      ],
      limitations: ["Limited to 5 active campaigns"],
      path: "/signup",
    },
    {
      title: "Enterprise",
      icon: <FaCrown size={28} className="text-warning" />,
      price: "Contact Us",
      period: "",
      features: [
        "Unlimited influencer searches",
        "Dedicated account manager",
        "White-label campaign management",
        "API access for integrations",
        "24/7 premium support",
        "Custom analytics & reporting",
      ],
      limitations: [],
      path: "/contact",
    },
  ];

  return (
    <div
      className="py-5"
      style={{ backgroundColor: "#f7fafc", width: "100vw" }}
    >
      <Container fluid>
        <div className="px-3 px-md-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-5">Our Pricing Plans</h2>
            <p className="text-muted fs-5">
              Transparent pricing with no hidden fees. Choose the plan that fits
              your business needs.
            </p>
          </div>

          <Row className="g-4 justify-content-center">
            {plans.map((plan, idx) => {
              const isSelected = selectedPlan === idx;
              return (
                <Col key={idx} xs={12} md={6} lg={4}>
                  <Card
                    className={`h-100 shadow-sm border-0 text-center position-relative plan-card
                      ${isSelected ? "selected-plan" : ""}
                    `}
                    onClick={() => setSelectedPlan(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setSelectedPlan(idx);
                    }}
                  >
                    {plan.title === "Professional" && (
                      <Badge
                        bg="warning"
                        text="dark"
                        className="most-popular-badge px-3 py-2 fw-semibold position-absolute"
                      >
                        Most Popular
                      </Badge>
                    )}
                    <Card.Body className="p-4 d-flex flex-column">
                      <div className="mb-3 mx-auto">{plan.icon}</div>
                      <h4 className="fw-bold">{plan.title}</h4>
                      <h2 className="my-3 fw-bold">{plan.price}</h2>
                      <p className="text-muted">{plan.period}</p>

                      <ul className="list-unstyled text-start mb-3 flex-grow-1">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="mb-2 d-flex align-items-center"
                          >
                            <FaCheckCircle className="text-success me-2" />{" "}
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {plan.limitations.length > 0 && (
                        <>
                          <h6 className="text-danger fw-semibold mb-2">
                            Limitations:
                          </h6>
                          <ul className="list-unstyled text-start mb-3">
                            {plan.limitations.map((limit, i) => (
                              <li key={i} className="mb-1 small">
                                — {limit}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <Button
                        variant={isSelected ? "success" : "outline-primary"}
                        className="rounded-pill w-100 fw-bold py-2 mt-auto"
                        onClick={() => navigate(plan.path)}
                      >
                        {plan.price === "Contact Us"
                          ? "Contact Sales"
                          : "Get Started"}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <div className="text-center mt-5">
            <FaHeadset className="text-primary mb-3" size={36} />
            <h4 className="fw-bold mb-2">Still Have Questions?</h4>
            <p className="text-muted mb-3">
              Our team is here to help you make the right choice.
            </p>
            <Button
              variant="outline-dark"
              className="rounded-pill px-4"
              onClick={() => navigate("/contact")}
            >
              📞 Contact Us
            </Button>
          </div>
        </div>
      </Container>
      <Section2 />

      <Faq />
      <Ready/>

      {/* Custom CSS */}
      <style jsx="true">{`
        .plan-card {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 1rem;
        }
        .plan-card:hover,
        .plan-card.selected-plan {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
          border: 2px solid #bfa046;
        }
        .most-popular-badge {
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 1rem 1rem 0 0;
          font-size: 0.9rem;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
          .plan-card:hover,
          .plan-card.selected-plan {
            transform: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border: 1px solid #bfa046;
          }
          .most-popular-badge {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}

export default Price;
