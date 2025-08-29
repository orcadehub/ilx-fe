import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  CheckCircleFill,
  StarFill,
  LightningFill,
  BarChartFill,
} from 'react-bootstrap-icons';
import { Badge } from 'react-bootstrap';

function Section2() {
  const cardsData = [
    {
      icon: <CheckCircleFill style={{ color: "#36B37E" }} size={24} />,
      title: 'Verified influencers',
      text: 'Only authentic and high-quality creators across top social platforms.',
      bg: '#ECFDF5',
      circleBg: '#D1FAE5',
    },
    {
      icon: <StarFill style={{ color: "#FFCD38" }} size={24} />,
      title: 'Trusted by early adopters',
      text: 'Emerging and growing brands already use our platform to scale their influencer marketing.',
      bg: '#FDF4FF',
      circleBg: '#F3E8FF',
    },
    {
      icon: <LightningFill style={{ color: "#F77062" }} size={24} />,
      title: 'Rated highly by early users',
      text: 'Built for simplicity, with a smooth experience marketers appreciate.',
      bg: '#FFF7ED',
      circleBg: '#FEE2C3',
    },
  ];

  const secondRow = [
    {
      icon: <LightningFill style={{ color: "#6B7280" }} size={24} />,
      title: 'Smarter Matching',
      text: 'AI-powered recommendations help you find the right influencers fast.',
      note: 'Coming Soon',
      bg: '#EFF6FF',
      circleBg: '#DBEAFE',
    },
    {
      icon: <StarFill style={{ color: "#FFCD38" }} size={24} />,
      title: 'All-in-One Dashboard',
      text: 'Handle proposals, chats, and payments without switching tools.',
      bg: '#FAF5FF',
      circleBg: '#EDE9FE',
    },
    {
      icon: <BarChartFill style={{ color: "#3B82F6" }} size={24} />,
      title: 'ROI-driven Analytics',
      text: 'Know what’s working with campaign performance insights.',
      bg: '#F0F9FF',
      circleBg: '#DBEAFE',
    },
  ];

  // Helper for rendering cards
  const renderCard = ({icon, title, text, bg, circleBg, note}, idx) => (
    <div key={idx} className="col-md-4 d-flex justify-content-center">
      <div
        className="card w-100 text-center border-0 px-4 pt-4 pb-3 shadow-sm"
        style={{
          borderRadius: '20px',
          maxWidth: "360px",
          minHeight: "218px",
          boxShadow: "0 4px 24px 0 rgba(38,50,56,.04)",
          transition: 'transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 16px 46px rgba(38,50,56,.12)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(38,50,56,.04)";
        }}
      >
        <div
          style={{
            margin: "0 auto 18px auto",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(59,130,246,0.09)",
          }}
        >
          {icon}
        </div>
        <h5 className="fw-bold mb-2"
          style={{
            color: "#181A20",
            fontSize: "1.18rem"
          }}
        >
          {title}
        </h5>
        <p className="mb-1"
          style={{
            color: "#6B7280",
            fontSize: "1.01rem",
            fontWeight: 500,
            marginBottom: note ? "0.75rem" : 0,
          }}
        >
          {text}
        </p>
        {note && (
          <Badge
            bg=""
            style={{
              color: "#720000ff",
              backgroundColor: "#f5f9c0ff",
              fontWeight: 600,
              fontSize: "0.93rem",
              borderRadius: "20px",
              padding: "6px 18px",
            }}
          >
            {note}
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <section style={{ background: "#F9FAFB" }}>
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5" style={{
          color: '#181A20',
          fontSize: "2.25rem"
        }}>
          Why Brands Choose Us
        </h2>
        <div className="row g-4 justify-content-center">
          {cardsData.map(renderCard)}
        </div>
        <h2 className="text-center fw-bold mt-5 mb-5" style={{
          color: '#181A20',
          fontSize: "2.25rem"
        }}>
          Built for Results
        </h2>
        <div className="row g-4 justify-content-center">
          {secondRow.map(renderCard)}
        </div>
      </div>
    </section>
  );
}

export default Section2;
