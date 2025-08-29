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
import Ready from "../components/Ready";
import InfluencerFeatureHero from "../components/home/InfluencerFeatureHero";
import Prices from "../components/home/Prices";

function Price() {
  const navigate = useNavigate();
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
    <div>
      <InfluencerFeatureHero
        headlineLine1="Simple, Transparent Pricing"
        headlineLine2="Plans"
        description="Choose the perfect plan for your business. Start with a free trial and scale as you grow."
        primaryButtonLabel="Start Free Trail"
        secondaryButtonLabel="Contact Sales"
        onPrimaryClick={() => {
          // Add your navigation or logic for Get Started button here
          console.log("Get Started clicked");
        }}
        onSecondaryClick={() => {
          // Add your navigation or logic for Sign In button here
          console.log("Sign In clicked");
        }}
      />

      <Container>
        <Prices/>

        <div className="text-center mt-5">
          <FaHeadset className="text-primary mb-3" size={36} />
          <h4 className="fw-bold">Still Have Questions?</h4>
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
      </Container>

      <Section2 />
      <Faq />
      <Ready />

      {/* Custom Styles */}
      <style jsx="true">{`
        .plan-card {
          border-radius: 1rem;
          background-color: #ffffff;
          transition: all 0.3s ease;
          position: relative;
          border: 1px solid #e0e0e0;
        }

        .plan-card:hover,
        .plan-card.selected-plan {
          transform: translateY(-8px);
          box-shadow: 0 16px 24px rgba(0, 0, 0, 0.08);
          border: 2px solid #bfa046;
        }

        .most-popular-badge {
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 1rem 1rem 0 0;
          font-size: 0.85rem;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .plan-card h4 {
          font-size: 1.3rem;
        }

        .plan-card h2 {
          font-size: 2.4rem;
          color: #333;
        }

        .plan-card ul {
          padding-left: 0;
        }

        .plan-card li {
          font-size: 0.95rem;
        }

        .btn {
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .plan-card:hover,
          .plan-card.selected-plan {
            transform: none;
            border: 1px solid #bfa046;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
}

export default Price;
