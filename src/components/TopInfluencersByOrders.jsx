import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const baseURL = import.meta.env.MODE === "development" ? config.LOCAL_BASE_URL : config.BASE_URL;

const TopInfluencersByOrders = () => {
  const [topInfluencers, setTopInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopInfluencers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${baseURL}/api/top-influencers`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setTopInfluencers(data.slice(0, 5)); // Top 5
      } catch (error) {
        console.error('Error fetching top influencers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopInfluencers();
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
        <h6 className="mb-0 fw-bold !text-[var(--text)]">Top Influencers by Orders</h6>
      </Card.Header>
      <Card.Body className="p-0">
        {topInfluencers.length === 0 ? (
          <div className="text-center py-4 !text-[var(--mutedText)]">
            No data available
          </div>
        ) : (
          topInfluencers.map((influencer, index) => (
            <div key={influencer.id} className="d-flex align-items-center p-3 border-bottom !border-[var(--border)] cursor-pointer hover:!bg-[var(--hover2)]" onClick={() => navigate(`/dashboard/influencers/${influencer.id}`)}>

              <img
                src={influencer.profile_pic || 'https://via.placeholder.com/40'}
                alt={influencer.name}
                className="rounded-circle me-3"
                width="40"
                height="40"
              />
              <div className="flex-grow-1">
                <div className="fw-medium !text-[var(--text)] text-14">{influencer.name}</div>
                <div className="text-12 !text-[var(--mutedText)]">{influencer.category}</div>
              </div>
              <div className="text-end">
                <div className="fw-bold !text-[var(--text)] text-14">{influencer.order_count}</div>
                <div className="text-12 !text-[var(--mutedText)]">orders</div>
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default TopInfluencersByOrders;