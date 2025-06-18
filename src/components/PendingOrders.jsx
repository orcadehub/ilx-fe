import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Dash.css';

const PendingOrders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      name: 'Influencer Campaign - Summer',
      influencer: 'Priya Sharma',
      platforms: [<FaInstagram className="text-danger me-1" />, <FaYoutube className="text-danger" />],
      types: ['reel', 'video'],
      status: 'pending',
      path: 'summer-campaign'
    },
    {
      name: 'Product Launch - Spring',
      influencer: 'Raj Malhotra',
      platforms: [<FaFacebook className="text-primary" />],
      types: ['post'],
      status: 'pending',
      path: 'product-launch'
    },
    {
      name: 'Brand Awareness - Winter',
      influencer: 'Aisha Khan',
      platforms: [<FaTwitter className="text-info me-1" />, <FaInstagram className="text-danger" />],
      types: ['story', 'post'],
      status: 'pending',
      path: 'brand-awareness'
    },
    {
      name: 'Engagement Boost - Autumn',
      influencer: 'Vikram Patel',
      platforms: [<FaYoutube className="text-danger" />],
      types: ['short'],
      status: 'awaiting',
      path: 'engagement-boost'
    },
    // Repeat for demonstration
    {
      name: 'Influencer Campaign - Summer',
      influencer: 'Priya Sharma',
      platforms: [<FaInstagram className="text-danger me-1" />, <FaYoutube className="text-danger" />],
      types: ['reel', 'video'],
      status: 'pending',
      path: 'summer-campaign'
    },
    {
      name: 'Product Launch - Spring',
      influencer: 'Raj Malhotra',
      platforms: [<FaFacebook className="text-primary" />],
      types: ['post'],
      status: 'pending',
      path: 'product-launch'
    },
    {
      name: 'Brand Awareness - Winter',
      influencer: 'Aisha Khan',
      platforms: [<FaTwitter className="text-info me-1" />, <FaInstagram className="text-danger" />],
      types: ['story', 'post'],
      status: 'pending',
      path: 'brand-awareness'
    },
    {
      name: 'Engagement Boost - Autumn',
      influencer: 'Vikram Patel',
      platforms: [<FaYoutube className="text-danger" />],
      types: ['short'],
      status: 'awaiting',
      path: 'engagement-boost'
    }
  ];

  const statusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'awaiting': return 'info';
      default: return 'secondary';
    }
  };

  const typeVariant = (type) => {
    switch (type) {
      case 'reel': return 'info';
      case 'video': return 'primary';
      case 'post': return 'secondary';
      case 'story': return 'warning';
      case 'short': return 'info';
      default: return 'dark';
    }
  };

  return (
    <Card className="shadow-sm border-0 scrollable-equal-height pending-orders-card">
      <Card.Body>
        <h5 className="fw-bold mb-4">🕒 Pending Orders</h5>
        <div className="scroll-content">
          <Table hover className="min-width-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Influencer</th>
                <th>Platform</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="align-middle">
                  <td>{order.name}</td>
                  <td>{order.influencer}</td>
                  <td>{order.platforms}</td>
                  <td>
                    {order.types.map((type, i) => (
                      <Badge key={i} bg={typeVariant(type)} className="me-1 text-capitalize">
                        {type}
                      </Badge>
                    ))}
                  </td>
                  <td>
                    <Badge bg={statusVariant(order.status)} className="text-capitalize">
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <FaEye className="text-dark cursor-pointer" onClick={() => navigate(`/orders/${order.path}`)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PendingOrders;
