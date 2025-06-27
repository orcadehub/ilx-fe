import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Dash.css'

const TopBusinessUsers = () => {
  const navigate = useNavigate();

  const users = [
    { name: 'Fashion Forward', handle: '@fashionforward', orders: 28, img: 'https://picsum.photos/seed/fashion/100' },
    { name: 'Tech Haven', handle: '@techhaven', orders: 24, img: 'https://picsum.photos/seed/tech/100' },
    { name: 'Beauty Essentials', handle: '@beautyessentials', orders: 20, img: 'https://picsum.photos/seed/beauty/100' },
    { name: 'Health First', handle: '@healthfirst', orders: 16, img: 'https://picsum.photos/seed/health/100' },
    { name: 'Fitness Hub', handle: '@fitnesshub', orders: 14, img: 'https://picsum.photos/seed/fitness/100' },
    ];

  return (
    <Card className="shadow-sm border-0 scrollable-equal-height pending-orders-card">
      <Card.Body>
        <h5 className="fw-bold mb-4">
          <i className="bi bi-people me-2" />
          Top Business Users
        </h5>
        <div className="scroll-content">
          {users.map((user, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between mb-1 pb-2 border-bottom cursor-pointer"
              onClick={() => navigate(`/business/${user.handle.replace('@', '')}`)}
            >
              <div className="d-flex align-items-center">
                <img
                  src={user.img}
                  alt={user.name}
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <div>
                  <div className="fw-semibold">{user.name}</div>
                  <div className="text-muted small">{user.handle}</div>
                </div>
              </div>
              <div className="fw-bold">{user.orders} orders</div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TopBusinessUsers;
