import React, { useState } from "react";
import {
  Container,
  Card,
  Button,
  Badge,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  Envelope,
  CashCoin,
  ChatDots,
  CalendarEvent,
  Bell,
  CheckCircle,
  ArrowRepeat,
  X,
} from "react-bootstrap-icons";

function Notifications() {
  const [activeTab, setActiveTab] = useState("unread");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "request",
      title: "New Request Received",
      description:
        "Alex from Fashion Brand wants to collaborate for an Instagram post",
      time: "10 minutes ago",
      read: false,
      action: "Respond",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      description: "You have received ₹8,500 for your recent campaign",
      time: "2 hours ago",
      read: false,
      action: "View",
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      description: "Sarah sent you a message regarding the upcoming campaign",
      time: "3 hours ago",
      read: true,
      action: "Reply",
    },
    {
      id: 4,
      type: "reminder",
      title: "Campaign Reminder",
      description:
        "Your scheduled campaign for Beauty Products is due tomorrow",
      time: "5 hours ago",
      read: true,
      action: "Snooze",
    },
    {
      id: 5,
      type: "system",
      title: "System Update",
      description: "We have updated our terms of service. Please review them",
      time: "1 day ago",
      read: true,
      action: "Review",
    },
  ]);

  const getIcon = (type) => {
    const iconSize = 18;
    const colors = {
      request: "#6f42c1",
      payment: "#0d9488",
      message: "#2563eb",
      reminder: "#f97316",
      system: "#6b7280",
      approval: "#16a34a",
    };
    const icons = {
      request: <Envelope size={iconSize} />,
      payment: <CashCoin size={iconSize} />,
      message: <ChatDots size={iconSize} />,
      reminder: <CalendarEvent size={iconSize} />,
      system: <Bell size={iconSize} />,
      approval: <CheckCircle size={iconSize} />,
    };
    return (
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          backgroundColor: `${colors[type] || "#9ca3af"}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors[type] || "#9ca3af",
        }}
      >
        {icons[type] || <Bell size={iconSize} />}
      </div>
    );
  };

  const handleAction = (id, action) => {
    if (action === "Dismiss") {
      setNotifications(notifications.filter((n) => n.id !== id));
    } else {
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  return (
    <Container fluid className="bg-light p-0">
      <Card className="border-0 shadow-sm rounded-0">
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(to right, #605cff, #4a00e0)",
            color: "#fff",
            padding: "20px 0",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Container>
            <Row className="align-items-center justify-content-between">
              <Col>
                <h5 className="fw-bold mb-1 d-flex align-items-center gap-2 text-light">
                  Notifications
                </h5>
                <small
                  className="mb-0 text-light opacity-75"
                  style={{ fontSize: "0.95rem" }}
                >
                  Manage alerts and notification settings.
                </small>
              </Col>
              <Col className="text-end">
                <Button
                  size="sm"
                  variant="outline-light"
                  className="rounded-pill px-3"
                  onClick={markAllAsRead}
                >
                  <ArrowRepeat size={14} className="me-1" />
                  Mark all as read
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Tabs */}
        <div className="d-flex border-bottom">
          <div
            className={`flex-fill text-center py-3 cursor-pointer ${
              activeTab === "unread"
                ? "border-bottom border-2 border-primary text-primary fw-semibold"
                : "text-muted"
            }`}
            onClick={() => setActiveTab("unread")}
          >
            Unread{" "}
            <Badge bg="primary" pill>
              {notifications.filter((n) => !n.read).length}
            </Badge>
          </div>
          <div
            className={`flex-fill text-center py-3 cursor-pointer ${
              activeTab === "all"
                ? "border-bottom border-2 border-success text-success fw-semibold"
                : "text-muted"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </div>
        </div>

        {/* Notifications List */}
        <ListGroup variant="flush" className="p-0">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <ListGroup.Item
                key={n.id}
                className={`d-flex align-items-start gap-3 px-4 py-3 border-0 ${
                  !n.read ? "bg-light" : "bg-white"
                }`}
              >
                {getIcon(n.type)}
                <div className="flex-grow-1">
                  <h6 className="mb-1 fw-semibold text-dark">{n.title}</h6>
                  <p className="mb-1 text-muted small">{n.description}</p>
                  <small className="text-secondary">{n.time}</small>
                </div>
                <div className="d-flex flex-column align-items-end gap-2">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    className="rounded-pill px-3"
                    onClick={() => handleAction(n.id, n.action)}
                  >
                    {n.action}
                  </Button>
                  {!n.read && (
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="rounded-pill px-3"
                      onClick={() => handleAction(n.id, "Dismiss")}
                    >
                      <X size={14} className="me-1" /> Dismiss
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <div className="text-center py-5 text-muted">
              <Bell size={28} className="mb-3 text-secondary" />
              <h6>No {activeTab === "unread" ? "unread" : ""} notifications</h6>
              <p className="small">
                When you get notifications, they'll show up here
              </p>
            </div>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Notifications;
