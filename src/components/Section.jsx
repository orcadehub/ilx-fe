import React from 'react';
import pic1 from '../assets/pic1.jpg';

function Section() {
  return (
    <section className="w-100 py-5 bg-white px-4">
      <div className="container-fluid px-0">
        <div className="row align-items-center justify-content-between gx-5">

          {/* Text Section */}
          <div className="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
            <h1 className="fw-bold display-5 mb-4 text-dark lh-sm">
              Supercharge Your Brand’s<br />Growth with the Right Influencers
            </h1>
            <p className="text-secondary mb-4 fs-5 mx-auto mx-lg-0" style={{ maxWidth: '520px' }}>
              Our platform helps emerging brands discover influencers, manage campaigns,
              and track performance — all in one place.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
              <a href="#" className="btn btn-primary btn-lg px-5 rounded-pill fw-semibold shadow">
                Get Started →
              </a>
              <a href="#" className="btn btn-outline-secondary btn-lg px-5 rounded-pill fw-semibold">
                Sign In
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 text-center position-relative">
            <div className="rounded-4 overflow-hidden shadow d-inline-block">
              <img src={pic1} alt="Influencers" className="img-fluid rounded-4" />
            </div>

            {/* Floating Card */}
            <div className="position-absolute d-flex align-items-center p-3 rounded-3 shadow-sm bg-light border"
              style={{ bottom: '20px', right: '20px', minWidth: '260px', zIndex: 10 }}>
              <div className="fs-3 text-primary me-3 user-select-none">
                👤👤👤
              </div>
              <div className="text-start lh-sm">
                <div className="fw-semibold text-primary" style={{ fontSize: '1.15rem' }}>
                  Join 2500+ brands
                </div>
                <div className="text-muted small fw-medium">
                  using our platform
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Section;
