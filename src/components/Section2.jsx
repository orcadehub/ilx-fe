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
      icon: <CheckCircleFill className="text-success display-5 mb-3" />,
      title: 'Verified Influencers',
      text: 'Only authentic and high-quality creators across top social platforms.',
      bg: '#ECFDF5',
    },
    {
      icon: <StarFill className="text-warning display-5 mb-3" />,
      title: 'Trusted by Early Adopters',
      text: 'Emerging and growing brands already use our platform to scale their influencer marketing.',
      bg: '#FDF4FF',
    },
    {
      icon: <LightningFill className="text-danger display-5 mb-3" />,
      title: 'Rated Highly by Users',
      text: 'Built for simplicity, with a smooth experience marketers appreciate.',
      bg: '#FFF7ED',
    },
  ];

  const secondRow = [
    {
      icon: <LightningFill className="text-secondary display-5 mb-3" />,
      title: 'Smarter Matching',
      text: 'AI-powered recommendations help you find the right influencers fast.',
      note: 'Coming Soon',
      bg: '#EFF6FF',
    },
    {
      icon: <StarFill className="text-warning display-5 mb-3" />,
      title: 'All-in-One Dashboard',
      text: 'Handle proposals, chats, and payments without switching tools.',
      bg: '#FAF5FF',
    },
    {
      icon: <BarChartFill className="text-primary display-5 mb-3" />,
      title: 'ROI-Driven Analytics',
      text: 'Know what’s working with campaign performance insights.',
      bg: '#F0F9FF',
    },
  ];

  return (
    <section style={{ backgroundColor: '#f9fafb' }}> {/* Light grayish bg */}
      <div className="container py-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {/* Section Title 1 */}
        <h2 className="text-center fw-bold display-5 mb-5" style={{ color: '#1F2937' }}>
          Why Brands Choose Us
        </h2>

        {/* Row 1 */}
        <div className="row g-4 justify-content-center">
          {cardsData.map((item, idx) => (
            <div key={idx} className="col-md-4 d-flex">
              <div
                className="card w-100 text-center border-0 p-4 shadow-sm"
                style={{
                  backgroundColor: item.bg,
                  borderRadius: '16px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.06)';
                }}
              >
                {item.icon}
                <h5 className="fw-bold mb-3" style={{ color: '#111827' }}>
                  {item.title}
                </h5>
                <p className="text-muted mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Title 2 */}
        <h2 className="text-center fw-bold display-5 mt-5 mb-5" style={{ color: '#1F2937' }}>
          Built for Results
        </h2>

        {/* Row 2 */}
        <div className="row g-4 justify-content-center">
          {secondRow.map((item, idx) => (
            <div key={idx} className="col-md-4 d-flex">
              <div
                className="card w-100 text-center border-0 p-4 shadow-sm"
                style={{
                  backgroundColor: item.bg,
                  borderRadius: '16px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.06)';
                }}
              >
                {item.icon}
                <h5 className="fw-bold mb-3" style={{ color: '#111827' }}>
                  {item.title}
                </h5>
                <p className="text-muted mb-1">{item.text}</p>
                {item.note && (
                  <Badge bg="light" text="dark" className="mt-2">
                    {item.note}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Section2;
