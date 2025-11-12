import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-[var(--bgPage2)] text-[var(--text)]">
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="text-[var(--mutedText)] mb-4">The page you're looking for doesn't exist.</p>
      <button 
        className="btn btn-primary px-4 py-2"
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;