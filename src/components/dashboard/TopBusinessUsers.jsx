import React, { useState, useEffect } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dash.css";

const TopBusinessUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/top-users");
        if (!response.ok) throw new Error("Failed to fetch top users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching top users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  // Slugify name for navigation (e.g., "Fashion Forward" -> "fashion-forward")
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <Card
      className="shadow-sm border-0 pending-orders-card"
      style={{
        backgroundColor: "#fff",
        borderRadius: "1rem",
        minHeight: "400px",
      }}
    >
      <Card.Body>
        <h5 className="fw-bold mb-4">
          <i className="bi bi-people me-2" />
          Top Business Users
        </h5>

        {loading && users.length === 0 ? (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Loading users...</span>
          </Container>
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user.name}
              className="d-flex align-items-center justify-content-between mb-1 px-3 py-2 rounded cursor-pointer"
              onClick={() => navigate(`/business/${slugify(user.name)}`)}
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
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
                </div>
              </div>
              <div className="fw-bold">{user.orders} orders</div>
            </div>
          ))
        ) : (
          <div className="text-muted text-center">No users available</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TopBusinessUsers;