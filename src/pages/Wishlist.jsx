import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Spinner,
  Form,
} from "react-bootstrap";
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import config from "../config";

const baseURL =
  import.meta.env.MODE === "development"
    ? config.LOCAL_BASE_URL
    : config.BASE_URL;

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlist(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Failed to load wishlist. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchWishlist();
    } else {
      setError("Please log in to view your wishlist.");
      setLoading(false);
    }
  }, [token]);

  const renderPlatformIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return <FaTwitter className="text-primary" size={20} />;
      case "youtube":
        return <FaYoutube className="text-danger" size={20} />;
      case "instagram":
        return <FaInstagram className="text-pink-500" size={20} />;
      case "facebook":
        return <FaFacebook className="text-primary" size={20} />;
      default:
        return null;
    }
  };

  // Helper function to format followers to K, M, B
  const formatFollowers = (num) => {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };

  const handleProfileClick = (infId) => {
    navigate(`/profile/${infId}`);
  };

  // Filter and sort wishlist based on search term
  const filteredWishlist = wishlist
    .filter(
      (inf) =>
        inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inf.email && inf.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Container fluid className="bg-light min-vh-100">
      <div
        style={{
          background: "linear-gradient(to right, #605cff, #4a00e0)",
          color: "#fff",
          padding: "20px 0",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginBottom: "2rem",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-0 fw-bold">My Wishlist</h4>
              <small>Explore your favorite influencers</small>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={{ maxWidth: "800px" }}>
        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-pill shadow-sm"
          />
        </Form.Group>

        {error && (
          <Alert
            variant="danger"
            className="mx-auto mb-4"
            style={{ maxWidth: "600px" }}
          >
            {error}
          </Alert>
        )}
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : filteredWishlist.length === 0 && !error ? (
          <Alert
            variant="info"
            className="mx-auto mb-4"
            style={{ maxWidth: "600px" }}
          >
            {searchTerm
              ? "No influencers match your search."
              : "Your wishlist is empty. Add some influencers to get started!"}
          </Alert>
        ) : (
          <Row xs={1} className="g-4">
            {filteredWishlist.map((inf) => (
              <Col key={inf.id}>
                <Card
                  className="border-0 shadow-sm transition-transform transform-hover"
                  style={{ borderRadius: "15px", cursor: "pointer" }}
                  onClick={() => handleProfileClick(inf.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleProfileClick(inf.id)
                  }
                >
                  <Card.Body className="d-flex flex-column p-3">
                    {/* Profile Section */}
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={
                          inf.profilePic ||
                          "https://via.placeholder.com/64?text=User"
                        }
                        alt={inf.name}
                        className="rounded-circle me-3 border border-light"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <Card.Title
                          className="mb-1 text-dark fw-bold"
                          style={{ fontSize: "1.5rem" }}
                        >
                          {inf.name}
                        </Card.Title>
                        <Card.Text
                          className="text-muted small text-truncate"
                          style={{ maxWidth: "250px" }}
                        >
                          {inf.email || "No email provided"}
                        </Card.Text>
                      </div>
                    </div>

                    {/* Platforms Section */}
                    <div className="d-flex flex-wrap gap-3">
                      {Object.entries(inf.data || {}).map(
                        ([platform, pdata]) => (
                          <Badge
                            key={platform}
                            bg="light"
                            text="dark"
                            className="d-flex align-items-center gap-2 py-2 px-3 border"
                            style={{ borderRadius: "12px", fontSize: "0.9rem" }}
                          >
                            {renderPlatformIcon(platform)}
                            <span className="fw-medium">
                              {formatFollowers(pdata?.total_followers || 0)}{" "}
                              followers
                            </span>
                          </Badge>
                        )
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <style jsx>{`
        .transform-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
      `}</style>
    </Container>
  );
}

export default Wishlist;
