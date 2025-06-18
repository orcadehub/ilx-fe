/Notifications,jsx/
import React, { useState } from 'react';
import { 
  Container, Card, Button, Badge, ListGroup, 
  Row, Col 
} from 'react-bootstrap';
import { 
  Envelope, CashCoin, ChatDots, CalendarEvent, 
  Bell, CheckCircle, ArrowRepeat, X 
} from 'react-bootstrap-icons';
function Notifications() {
  const [activeTab, setActiveTab] = useState('unread');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'request',
      title: 'New Request Received',
      description: 'Alex from Fashion Brand wants to collaborate for an Instagram post',
      time: '10 minutes ago',
      read: false,
      action: 'respond'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      description: 'You have received ₹8,500 for your recent campaign',
      time: '2 hours ago',
      read: false,
      action: 'view'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      description: 'Sarah sent you a message regarding the upcoming campaign',
      time: '3 hours ago',
      read: true,
      action: 'reply'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Campaign Reminder',
      description: 'Your scheduled campaign for Beauty Products is due tomorrow',
      time: '5 hours ago',
      read: true,
      action: 'snooze'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      description: 'We have updated our terms of service. Please review them',
      time: '1 day ago',
      read: true,
      action: 'review'
    },
    {
      id: 6,
      type: 'approval',
      title: 'Request Approved',
      description: 'Your collaboration request with TechGadgets has been approved',
      time: '2 days ago',
      read: true,
      action: 'view'
    }
  ]);

  const getIcon = (type) => {
    const iconSize = 20;
    switch(type) {
      case 'request': return <Envelope className="text-purple" size={iconSize} />;
      case 'payment': return <CashCoin className="text-teal" size={iconSize} />;
      case 'message': return <ChatDots className="text-blue" size={iconSize} />;
      case 'reminder': return <CalendarEvent className="text-orange" size={iconSize} />;
      case 'system': return <Bell className="text-gray" size={iconSize} />;
      case 'approval': return <CheckCircle className="text-green" size={iconSize} />;
      default: return <Bell className="text-muted" size={iconSize} />;
    }
  };

  const handleAction = (id, action) => {
    console.log(`Action ${action} on notification ${id}`);
    if (action === 'dismiss') {
      setNotifications(notifications.filter(notif => notif.id !== id));
    } else {
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      ));
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = activeTab === 'unread' 
    ? notifications.filter(notif => !notif.read) 
    : notifications;
  return (
    <Container fluid className="p-0 bg-light">
      <style>
        {`
          :root {
            --purple: #8a2be2;
            --teal: #00e6b8;
            --blue: #4285f4;
            --orange: #ff6d42;
            --gray: #9e9e9e;
            --green: #00c851;
            --pink: #ff4081;
          }
          
          .text-purple { color: var(--purple); }
          .text-teal { color: var(--teal); }
          .text-blue { color: var(--blue); }
          .text-orange { color: var(--orange); }
          .text-gray { color: var(--gray); }
          .text-green { color: var(--green); }
          
          .tab-unread-active {
            background: white;
            border-bottom: 3px solid var(--purple);
            color: var(--purple);
            font-weight: 600;
          }
          .tab-all-active {
            background: white;
            border-bottom: 3px solid var(--teal);
            color: var(--teal);
            font-weight: 600;
          }
          .tab-inactive {
            background: #f8f9fa;
            color: #adb5bd;
            transition: all 0.2s ease;
          }
          .tab-inactive:hover {
            background: white;
            color: var(--pink);
            transform: translateY(-1px);
          }
          
          .notification-icon {
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(138, 43, 226, 0.08);
            transition: all 0.2s ease;
          }
          .notification-icon:hover {
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          
          .unread-notification {
            border-left: 3px solid var(--purple);
            background: rgba(248, 249, 250, 0.7);
          }
          
          .btn-purple {
            background-color: var(--purple);
            color: white;
            border: none;
            transition: all 0.2s ease;
          }
          .btn-purple:hover {
            background-color: #7b1fa2;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(138, 43, 226, 0.3);
          }
          
          .btn-teal {
            background-color: var(--teal);
            color: white;
            border: none;
            transition: all 0.2s ease;
          }
          .btn-teal:hover {
            background-color: #00bcd4;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 230, 184, 0.3);
          }
          
          .btn-dismiss {
            transition: all 0.2s ease;
          }
          .btn-dismiss:hover {
            background-color: #ffebee;
            color: #d32f2f;
            transform: translateY(-1px);
          }
          
          .list-group-item:hover {
            background-color: rgba(248, 249, 250, 0.9) !important;
          }
        `}
      </style>
      
      <Row className="g-0 h-100">
        <Col className="h-100 p-0">
          <Card className="h-100 border-0 rounded-0 shadow-sm">
            <Card.Header className="bg-white py-3 px-4 border-bottom">
              <Row className="align-items-center">
                <Col>
                  <h3 className="mb-0 text-dark">Notifications</h3>
                </Col>
                <Col xs="auto">
                  <Button 
                    variant="teal" 
                    size="sm"
                    className="rounded-pill px-3 btn-teal shadow-sm"
                    onClick={markAllAsRead}
                  >
                    <ArrowRepeat className="me-1" size={14} /> 
                    Mark all as read
                  </Button>
                </Col>
              </Row>
            </Card.Header>
            
            <Card.Body className="p-0 d-flex flex-column">
              {/* Vibrant Horizontal Tabs */}
              <div className="d-flex">
                <div 
                  className={`w-50 text-center py-3 cursor-pointer ${activeTab === 'unread' ? 'tab-unread-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('unread')}
                >
                  <span className="me-2">Unread</span>
                  <Badge pill bg="purple" className="align-middle shadow-sm text-danger">
                    {notifications.filter(n => !n.read).length}
                  </Badge>
                </div>
                <div 
                  className={`w-50 text-center py-3 cursor-pointer ${activeTab === 'all' ? 'tab-all-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Notifications
                </div>
              </div>

              <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map(notification => (
                    <ListGroup.Item 
                      key={notification.id}
                      className={`border-0 py-3 px-4 ${!notification.read ? 'unread-notification' : ''}`}
                    >
                      <div className="d-flex align-items-start">
                        <div className="me-3 notification-icon">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-grow-1 d-flex flex-column flex-md-row justify-content-between">
                          <div className="me-3 mb-2 mb-md-0">
                            <h6 className="mb-1 fw-semi-bold text-dark">{notification.title}</h6>
                            <p className="mb-0 text-muted">{notification.description}</p>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <small className="text-muted mb-2">{notification.time}</small>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="purple" 
                                size="sm"
                                className="rounded-pill px-3 btn-purple shadow-sm"
                                onClick={() => handleAction(notification.id, notification.action)}
                              >
                                {notification.action.charAt(0).toUpperCase() + notification.action.slice(1)}
                              </Button>
                              {!notification.read && (
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  className="rounded-pill px-3 btn-dismiss d-flex align-items-center shadow-sm"
                                  onClick={() => handleAction(notification.id, 'dismiss')}
                                >
                                  <X className="me-1" size={14} />
                                  Dismiss
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item className="text-center py-5">
                    <div className="py-4 text-muted">
                      <Bell size={32} className="mb-3 text-gray" />
                      <h5>No {activeTab === 'unread' ? 'unread' : ''} notifications</h5>
                      <p className="text-muted">When you get notifications, they'll appear here</p>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Notifications;