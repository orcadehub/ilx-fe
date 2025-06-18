/Billing.jsx/
import React from 'react';
// import 'animate.css';

function Billing() {
  // Conversion rate (1 USD = 83 INR)
  const usdToInr = 83;

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <div className="bg-dark text-white py-5" style={{ width: '100%' }}>
        <div className="container">
          <h1 className="animate__animated animate__fadeIn">Billing & Subscription</h1>
          <p className="lead animate__animated animate__fadeIn animate__delay-1s">
            Choose the plan that works best for you
          </p>
        </div>
      </div>

      {/* Plans Section */}
      <div className="py-5" style={{ backgroundColor: '#f8f9fa', width: '100%' }}>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {/* Free Plan */}
            <div className="col">
              <div className="card h-100 border-primary animate__animated animate__fadeInLeft animate__fast">
                <div className="card-header bg-primary text-white">
                  <h2 className="h4 mb-0">Free Plan</h2>
                </div>
                <div className="card-body">
                  <p className="text-muted">Basic features for individuals</p>
                  <h3 className="card-title pricing-card-title">
                    ₹0<small className="text-muted fw-light">/month</small>
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li className="mb-2">✓ 5 campaigns per month</li>
                    <li className="mb-2">✓ Basic analytics</li>
                    <li className="mb-2">✓ Email support</li>
                  </ul>
                </div>
                <div className="card-footer bg-transparent">
                  <span className="badge bg-light text-primary">Current Plan</span>
                </div>
              </div>
            </div>

            {/* Standard Plan - Highlighted */}
            <div className="col">
              <div className="card h-100 border-success shadow-lg animate__animated animate__fadeInUp">
                <div className="card-header bg-success text-white position-relative">
                  <h2 className="h4 mb-0">Standard Plan</h2>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate__animated animate__pulse animate__infinite">
                    Popular
                    <span className="visually-hidden">Popular plan</span>
                  </span>
                </div>
                <div className="card-body">
                  <p className="text-muted">Advanced features for growing businesses</p>
                  <h3 className="card-title pricing-card-title">
                    ₹{29 * usdToInr}<small className="text-muted fw-light">/month</small>
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li className="mb-2">✓ 25 campaigns per month</li>
                    <li className="mb-2">✓ Advanced analytics</li>
                    <li className="mb-2">✓ Priority support</li>
                    <li className="mb-2">✓ Custom reporting</li>
                  </ul>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="w-100 btn btn-success btn-lg animate__animated animate__pulse animate__slow animate__infinite">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="col">
              <div className="card h-100 border-warning animate__animated animate__fadeInRight animate__fast">
                <div className="card-header bg-warning text-dark">
                  <h2 className="h4 mb-0">Premium Plan</h2>
                </div>
                <div className="card-body">
                  <p className="text-muted">Enterprise features for large teams</p>
                  <h3 className="card-title pricing-card-title">
                    ₹{99 * usdToInr}<small className="text-muted fw-light">/month</small>
                  </h3>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li className="mb-2">✓ Unlimited campaigns</li>
                    <li className="mb-2">✓ Real-time analytics</li>
                    <li className="mb-2">✓ 24/7 dedicated support</li>
                    <li className="mb-2">✓ Custom integrations</li>
                    <li className="mb-2">✓ White-labeling</li>
                  </ul>
                </div>
                <div className="card-footer bg-transparent">
                  <button className="w-100 btn btn-warning">Upgrade Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="py-5" style={{ width: '100%' }}>
        <div className="container">
          <div className="row mb-5 animate__animated animate__fadeIn">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="h4 mb-4">Payment Methods</h2>
                  <p className="text-muted mb-4">Manage your payment information</p>
                  
                  <div className="d-flex justify-content-between align-items-center p-3 border rounded mb-4">
                    <div>
                      <span className="fw-bold">--- 4242</span>
                      <p className="text-muted mb-0">Expires 12/25</p>
                    </div>
                    <button className="btn btn-sm btn-outline-danger">Remove</button>
                  </div>
                  
                  <button className="btn btn-outline-primary">
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History Section */}
          <div className="row animate__animated animate__fadeIn">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="h4 mb-4">Billing History</h2>
                  <p className="text-muted mb-4">View your recent invoices</p>
                  
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>May 15, 2023</td>
                          <td>₹0.00</td>
                          <td><span className="badge bg-success">Paid</span></td>
                          <td><a href="#" className="text-primary text-decoration-none">Download</a></td>
                        </tr>
                        <tr>
                          <td>Apr 15, 2023</td>
                          <td>₹0.00</td>
                          <td><span className="badge bg-success">Paid</span></td>
                          <td><a href="#" className="text-primary text-decoration-none">Download</a></td>
                        </tr>
                        <tr>
                          <td>Mar 16, 2023</td>
                          <td>₹0.00</td>
                          <td><span className="badge bg-success">Paid</span></td>
                          <td><a href="#" className="text-primary text-decoration-none">Download</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        body {
          overflow-x: hidden;
        }
        .card {
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .btn-success {
          transition: all 0.3s ease;
        }
        .btn-success:hover {
          transform: scale(1.02);
        }
        .bg-primary {
          background-color: #2c3e50 !important;
        }
        .hero-section {
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
        }
      `}</style>
    </div>
  );
}

export default Billing;