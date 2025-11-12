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
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook, FaSearch } from "react-icons/fa";
import config from "../config";
import { Heart, Search } from "lucide-react";
import toast from "react-hot-toast";

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
        return <FaTwitter className="text-primary" size={14} />;
      case "youtube":
        return <FaYoutube className="text-danger" size={14} />;
      case "instagram":
        return <FaInstagram className="text-pink-500" size={14} />;
      case "facebook":
        return <FaFacebook className="text-primary" size={14} />;
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
    navigate(`/dashboard/influencers/${infId}`);
  };

  const handleRemoveFromWishlist = async (e, influencerId) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`${baseURL}/api/wishlist`, 
        { influencerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        toast.success(response.data.message);
        setWishlist(prev => prev.filter(inf => inf.id !== influencerId));
      }
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
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
    <Container fluid className="bg-[var(--bgPage2)] text-[var(--text)] min-vh-100">
      <div className="md:flex justify-between items-center">
      <div
        className="py-4 md:p-4 "
        // style={{
        //   background: "linear-gradient(to right, #605cff, #4a00e0)",
        //   color: "#fff",
        //   padding: "20px 0",
        //   marginBottom: "2rem",
        // }}
      >
        <Container>
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-0 fw-bold">My Wishlist</h4>
                <small className="text-[var(--mutedText)]">{filteredWishlist.length} of {wishlist.length} influencers</small>
            </Col>
          </Row>
        </Container>
      </div>

        <Form.Group className="mb-4 position-relative px-3 md:px-0 ">
          <Search
            size={14}
            className="position-absolute left-[10%] md:!left-[8%] !bg-[var(--card)]"
            style={{
              top: "50%",
              // left: "10%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
          <Form.Control
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded py-2 !pl-10 md:!pl-6 !w-62"
          />
        </Form.Group>
        
     </div>
      <div className="!px-1 md:!px-">

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
          <div
            className="mx-auto mb-4 !bg-[var(--card-bg)] !text-[var(--text)] h-[100%] md:mt-20 w-full d-flex justify-content-center align-items-center text-center p-4"
            style={{ maxWidth: "600px" }}
          >
            {searchTerm
              ? "No influencers match your search."
              : "Your wishlist is empty. Add some influencers to get started!"}
          </div>
        ) : (
              <Row xs={2} sm={2} md={3} lg={4} xl={4} className="g-1 md:g-4 !w-full">
            {filteredWishlist.map((inf) => (
              <Col key={inf.id}>
                <Card
                  className="border !border-[var(--border)] !bg-[var(--card)] !text-[var(--text)] shadow-sm transition-transform transform-hover !h-full"
                  style={{ borderRadius: "15px", cursor: "pointer" }}
                  onClick={() => handleProfileClick(inf.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleProfileClick(inf.id)
                  }
                >
                  <Card.Body className="d-flex flex-column items-center p-3 relative">
                    {/* Profile Section */}
                    <div className="d-flex align-items-center flex-col mb-3 gap-2">
                      <img
                        src={
                          inf.profilePic ||
                          "https://via.placeholder.com/64?text=User"
                        }
                        alt={inf.name}
                        className="rounded-circle me-3 "
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1 justify-center text-center !min-w-0">
                        <Card.Title
                          className="mb-1 fw-bold text-14"
                        >
                          {inf.name}
                        </Card.Title>
                        <Card.Text
                          className="text-[var(--mutedText)] text-12 !whitespace-normal !break-words mx-auto"
                          style={{
                            whiteSpace: "normal",       
                            wordBreak: "break-word",  
                            overflowWrap: "anywhere",   
                          }}
                          // style={{ maxWidth: "250px" }}
                        >
                          {inf.email || "No email provided"}
                        </Card.Text>
                      </div>
                    </div>

                    {/* Platforms Section */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 flex-wrap gap-3 justify-center">
                      {Object.entries(inf.data || {}).map(
                        ([platform, pdata]) => (
                          <span
                            key={platform}
                            bg="light"
                            text="dark"
                            className="flex !align-center gap-2"
                            style={{ borderRadius: "12px", fontSize: "0.9rem" }}
                          >
                            {renderPlatformIcon(platform)}
                            <span className="text-[10px]">
                              {formatFollowers(pdata?.total_followers || 0)}{" "}
                              {/* followers */}
                            </span>
                          </span>
                        )
                      )}
                    </div>
                    <span 
                      className="absolute right-[5%] top-[5%] cursor-pointer" 
                      onClick={(e) => handleRemoveFromWishlist(e, inf.id)}
                      title="Remove from wishlist"
                    > 
                      <Heart size={18}
                        className="text-red-500 fill-red-400 hover:fill-none transition-all"
                      />
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
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
