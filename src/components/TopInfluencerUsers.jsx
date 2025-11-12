import React, { useState, useEffect } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dash.css";
import { User } from "lucide-react";
import { topInfluencersData } from "../data/topInflencersData";
import TopCard from "./TopCard";

const TopInfluencerUsers = () => {
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
        setUsers(data.influencerUsers); // Use influencerUsers array
      } catch (err) {
        console.error("Error fetching top influencer users:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  // Slugify name for navigation (e.g., "Jane Influencer" -> "jane-influencer")
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <Card
      className="shadow-sm pending-orders-card !border !border-[var(--border)] !bg-[var(--card)] !text-[var(--text)] !h-full"
      // style={{
      //   // backgroundColor: "#fff",
      //   // borderRadius: "1rem",
      //   // minHeight: "400px",
      // }}
    >
      <Card.Body>
        <h5 className="mb-4 flex items-center !text-[16px]">
          <User size='16' className="mr-1 text-blue" />
          Top Influencer Users
        </h5>

        {loading && users.length === 0 ? (
          <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "300px" }}
          >
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Loading influencer users...</span>
          </Container>
        ) : topInfluencersData.length > 0 ? (
            <TopCard topData={topInfluencersData} />
        ) : (
          <div className="text-muted text-center">No influencer users available</div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TopInfluencerUsers;