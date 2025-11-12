import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import config from '../config';

const baseURL = import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL;

const TopBusinessUsersByOrders = () => {
  const [topBusinessUsers, setTopBusinessUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBusinessUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseURL}/api/top-business-users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setTopBusinessUsers(data.slice(0, 5)); // Top 5
      } catch (error) {
        console.error('Error fetching top business users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBusinessUsers();
  }, []);

  if (loading) {
    return (
      <Card className="!bg-[var(--card)] !border-[var(--border)] h-100">
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="!bg-[var(--card)] !border-[var(--border)] h-100">
      <Card.Header className="!bg-[var(--card)] !border-[var(--border)]">
        <h6 className="mb-0 fw-bold !text-[var(--text)]">Top Business Users by Orders</h6>
      </Card.Header>
      <Card.Body className="p-0">
        {topBusinessUsers.length === 0 ? (
          <div className="text-center py-4 !text-[var(--mutedText)]">
            No data available
          </div>
        ) : (
          topBusinessUsers.map((user, index) => (
            <div key={user.id} className="d-flex align-items-center p-3 border-bottom !border-[var(--border)]">

              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3" 
                   style={{ width: '40px', height: '40px' }}>
                <span className="text-white fw-bold">{user.fullname?.charAt(0) || 'U'}</span>
              </div>
              <div className="flex-grow-1">
                <div className="fw-medium !text-[var(--text)] text-14">{user.fullname}</div>
                <div className="text-12 !text-[var(--mutedText)]">{user.email}</div>
              </div>
              <div className="text-end">
                <div className="fw-bold !text-[var(--text)] text-14">{user.order_count}</div>
                <div className="text-12 !text-[var(--mutedText)]">orders</div>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default TopBusinessUsersByOrders;