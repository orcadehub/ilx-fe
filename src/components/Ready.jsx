import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Ready() {
  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: '#ffffff', // White background
        color: '#1B263B', // Dark text for contrast
        fontFamily: "'Playfair Display', serif",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2
            className="mb-3"
            style={{
              fontWeight: '700',
              fontSize: '2.75rem',
              letterSpacing: '0.05em',
              textShadow: '1px 1px 4px rgba(255,255,255,0.6)', // light subtle shadow
            }}
          >
            Ready to Transform Your Marketing?
          </h2>
          <p
            className="mb-4"
            style={{
              fontSize: '1.25rem',
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: "'Open Sans', sans-serif",
              color: '#415A77', // softer dark blue
              lineHeight: '1.6',
              textShadow: '0 0 3px rgba(255,255,255,0.7)', // subtle light shadow
            }}
          >
            Join thousands of businesses who have already revolutionized their
            marketing with InfluexKonnect.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn"
              style={{
                backgroundColor: '#1B263B',
                color: '#F5F5F7',
                fontWeight: '600',
                padding: '12px 36px',
                borderRadius: '30px',
                boxShadow: '0 6px 15px rgba(27, 38, 59, 0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#415A77';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(65, 90, 119, 0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#1B263B';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(27, 38, 59, 0.4)';
              }}
            >
              Sign Up Now
            </button>
            <button
              className="btn btn-outline-dark"
              style={{
                padding: '12px 36px',
                borderRadius: '30px',
                fontWeight: '600',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 10px rgba(27, 38, 59, 0.3)',
                color: '#1B263B',
                borderColor: '#1B263B',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(27, 38, 59, 0.15)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(27, 38, 59, 0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(27, 38, 59, 0.3)';
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ready;
