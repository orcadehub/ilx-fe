import React, { useState, useEffect } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dash.css";
import { Users } from "lucide-react";
import { businessUsers } from "../data/topInflencersData";
import TopCard from "./TopCard";

const TopBusinessUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTopUsers = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch("http://localhost:4000/api/top-users");
  //       if (!response.ok) throw new Error("Failed to fetch top users");
  //       const data = await response.json();
  //       setUsers(data.businessUsers); // Use businessUsers array
  //     } catch (err) {
  //       console.error("Error fetching top business users:", err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTopUsers();
  // }, []);

  // Slugify name for navigation (e.g., "Fashion Forward" -> "fashion-forward")
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <Card
      className=" border !border-[var(--border)] pending-orders-card  !bg-[var(--card)] !text-[var(--text)]"
      style={{
        backgroundColor: "#fff",
        borderRadius: "1rem",
        minHeight: "400px",
      }}
    >
      <Card.Body>
        <h5 className="flex items-center mb-4 !text-[16px]">
          <Users size={16} className="text-blue mr-1" />
          Top Business Users
        </h5>

        {loading && businessUsers.length === 0 ? (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Loading business users...</span>
          </Container>
        ) : businessUsers.length > 0 ? (
            <TopCard topData={businessUsers} />
        ) : (
          <div className="text-muted text-center">No business users available</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TopBusinessUsers;