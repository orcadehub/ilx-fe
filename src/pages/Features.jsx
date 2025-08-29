import React from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import Explore from "../components/Explore";
import Ready from "../components/Ready";
import InfluencerFeatureHero from "../components/home/InfluencerFeatureHero";
import FeatureCards from "../components/home/FeatureCards";

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PublicIcon from '@mui/icons-material/Public';

const featuresData = [
  {
    icon: <VerifiedUserIcon style={{ color: "#4a90e2" }} />,
    title: "Influencer Discovery",
    points: [
      "Find the perfect influencers for your brand.",
      "Real-time data updates.",
      "Global reach.",
    ],
    bg: "#F0F9FF",
  },
  {
    icon: <BarChartIcon style={{ color: "#4a90e2" }} />,
    title: "Audience Analytics",
    points: [
      "Deep insights into influencer audiences.",
      "Engagement tracking.",
      "Growth trends.",
    ],
    bg: "#FEF9C3",
  },
  {
    icon: <SecurityIcon style={{ color: "#4a90e2" }} />,
    title: "Fake Follower Detection",
    points: [
      "AI-powered fake follower detection.",
      "Authenticity scores.",
      "Quality assurance.",
    ],
    bg: "#ECFDF5",
  },
  {
    icon: <TrackChangesIcon style={{ color: "#4a90e2" }} />,
    title: "Campaign Tracking",
    points: [
      "Monitor campaigns in real-time.",
      "Cross-platform tracking.",
      "Custom reports.",
    ],
    bg: "#FFF7ED",
  },
  {
    icon: <AssessmentIcon style={{ color: "#4a90e2" }} />,
    title: "ROI Measurement",
    points: [
      "Calculate influencer ROI.",
      "Conversion tracking.",
      "Performance benchmarks.",
    ],
    bg: "#F3F4F6",
  },
  {
    icon: <GroupWorkIcon style={{ color: "#4a90e2" }} />,
    title: "Campaign Management",
    points: [
      "Streamline your marketing workflow.",
      "Content approval flows.",
      "Automated payments.",
    ],
    bg: "#FDF4FF",
  },
  {
    icon: <TrendingUpIcon style={{ color: "#4a90e2" }} />,
    title: "Content Performance",
    points: [
      "Track content performance.",
      "Engagement metrics.",
      "Optimization insights.",
    ],
    bg: "#EFF6FF",
  },
  {
    icon: <PublicIcon style={{ color: "#4a90e2" }} />,
    title: "Global Network",
    points: [
      "Worldwide network of verified influencers.",
      "Verified profiles.",
      "Diverse niches.",
    ],
    bg: "#FAFAF9",
  },
];


const Features = () => {
  return (
    <section
      style={{
        background: "linear-gradient(to right, #f7f7f7, #f0f0f0)",
        padding: "0",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <InfluencerFeatureHero
        headlineLine1="Powerful Features for"
        headlineLine2="Influencer Marketing"
        description="Discover everything you need to run successful influencer marketing campaigns, from discovery to ROI measurement."
        primaryButtonLabel="Start Free Trial"
        secondaryButtonLabel="Schedule Demo"
        onPrimaryClick={() => {
          /* start trial function */
        }}
        onSecondaryClick={() => {
          /* schedule demo function */
        }}
      />
      <FeatureCards featuresData={featuresData} />
      <Explore />
      <Ready />
    </section>
  );
};

export default Features;
