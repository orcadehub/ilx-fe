import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CheckCircleFill, StarFill, LightningFill, BarChartFill } from 'react-bootstrap-icons';

function Section2() {
  const cardsData = [
    {
      icon: <CheckCircleFill className="text-success display-5 mb-3" />,
      title: 'Verified Influencers',
      text: 'Only authentic and high-quality creators across top social platforms.',
    },
    {
      icon: <StarFill className="text-warning display-5 mb-3" />,
      title: 'Trusted by Early Adopters',
      text: 'Emerging and growing brands already use our platform to scale their influencer marketing.',
    },
    {
      icon: <LightningFill className="text-danger display-5 mb-3" />,
      title: 'Rated Highly by Early Users',
      text: 'Built for simplicity, with a smooth experience marketers appreciate.',
    },
  ];

  const secondRow = [
    {
      icon: <LightningFill className="text-secondary display-5 mb-3" />,
      title: 'Smarter Matching',
      text: 'AI-powered recommendations help you find the right influencers fast.',
      note: 'Coming Soon',
    },
    {
      icon: <StarFill className="text-warning display-5 mb-3" />,
      title: 'All-in-One Dashboard',
      text: 'Handle proposals, chats, and payments without switching tools.',
    },
    {
      icon: <BarChartFill className="text-primary display-5 mb-3" />,
      title: 'ROI-Driven Analytics',
      text: "Know what's working with detailed campaign performance insights.",
    },
  ];

  return (
    <div className="container py-5" style={{ fontFamily: "'Playfair Display', serif" }}>
      {/* Section 1 */}
      <h2 className="text-center fw-bold display-5 mb-5 text-dark">
        Why Brands Choose Us
      </h2>
      <div className="row g-4 justify-content-center">
        {cardsData.map((item, idx) => (
          <div key={idx} className="col-md-4 d-flex">
            <div className="card w-100 shadow-sm text-center p-4 border-0 hover-translate">
              {item.icon}
              <h5 className="fw-bold mb-3">{item.title}</h5>
              <p className="text-muted mb-0" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Section 2 */}
      <h2 className="text-center fw-bold display-5 mt-5 mb-5 text-dark">
        Built for Result
      </h2>
      <div className="row g-4 justify-content-center">
        {secondRow.map((item, idx) => (
          <div key={idx} className="col-md-4 d-flex">
            <div className="card w-100 shadow-sm text-center p-4 border-0 hover-translate">
              {item.icon}
              <h5 className="fw-bold mb-3">{item.title}</h5>
              <p className="text-muted mb-1" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                {item.text}
              </p>
              {item.note && (
                <small className="text-muted" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {item.note}
                </small>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section2;
