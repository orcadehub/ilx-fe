import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Image,
  Offcanvas,
  Modal,
} from "react-bootstrap";
import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import InfluencerProfile from "./InfluencerProfile";
const influencersData = [
  {
    id: 1,
    name: "Stephanie Nicol",
    tags: ["Fitness", "Life Style", "Gym", "Crossfit"],
    stats: {
      instagram: "450K",
      facebook: "210K",
      youtube: "350K",
      twitter: "95K",
    },
    age: 24,
    rating: 5,
    followers: {
      instagram: "95K",
      facebook: "50K",
      twitter: "30K",
      youtube: "20K",
    },
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Alex Buckmaster",
    tags: ["Fitness", "Life Style"],
    age: 45,
    rating: 3,
    platforms: ["Instagram"],
    stats: { instagram: "320K" },
    followers: { instagram: "95k" },
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "James Taylor",
    tags: ["Business", "Entrepreneur"],
    age: 78,
    rating: 2,
    followers: {
      instagram: "95K",
      facebook: "50K",
      twitter: "30K",
      youtube: "20K",
    },
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Sophia Lee",
    tags: ["Beauty & Makeup", "Fashion"],
    age: 24,
    rating: 5,
    followers: {
      instagram: "150K",
      facebook: "60K",
      twitter: "22K",
      youtube: "110K",
    },
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    name: "Daniel Chen",
    tags: ["Technology", "Gadgets", "Reviews"],
    age: 48,
    rating: 3,
    followers: {
      instagram: "30K",
      facebook: "45K",
      twitter: "70K",
      youtube: "140K",
    },
    image: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: 6,
    name: "Emily Brown",
    tags: ["Lifestyle", "Travel", "Photography"],
    age: 19,
    rating: 5,
    followers: {
      instagram: "180K",
      facebook: "90K",
      twitter: "35K",
      youtube: "55K",
    },
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    id: 7,
    name: "Michael Johnson",
    tags: ["Fitness", "Motivation"],
    followers: {
      instagram: "250K",
      facebook: "120K",
      twitter: "50K",
      youtube: "200K",
    },
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: 8,
    name: "Ava Wilson",
    tags: ["Cooking", "Home Recipes"],
    followers: {
      instagram: "60K",
      facebook: "70K",
      twitter: "15K",
      youtube: "90K",
    },
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: 9,
    name: "Liam Martinez",
    tags: ["Gaming", "Live Streams"],
    followers: {
      instagram: "40K",
      facebook: "25K",
      twitter: "85K",
      youtube: "300K",
    },
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 10,
    name: "Olivia Anderson",
    tags: ["Pets & Animals", "Vlogs"],
    followers: {
      instagram: "110K",
      facebook: "40K",
      twitter: "18K",
      youtube: "170K",
    },
    image: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    id: 11,
    name: "Noah Thompson",
    tags: ["Education", "Motivational Talks"],
    followers: {
      instagram: "70K",
      facebook: "60K",
      twitter: "55K",
      youtube: "100K",
    },
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];
const pricingData = {
  Instagram: {
    "Post Image/Video": "499₹",
    "Reels/Shorts": "499₹",
    "Story (Image/Video)": "499₹",
    "Short Video (<10m)": "499₹",
    "Video (>10m)": "499₹",
    Polls: "499₹",
    "Combo Package": "999₹",
  },
  Facebook: {
    "Post Image/Video": "399₹",
    "Video (>10m)": "499₹",
    "Combo Package": "899₹",
  },
};

const Influencers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showPrices, setShowPrices] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");

  const [tempFilters, setTempFilters] = useState({
    rating: "",
    platforms: [],
    categories: [],
    age: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    rating: "",
    platforms: [],
    categories: [],
    age: "",
  });
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleRatingChange = (e) => {
    setTempFilters({ ...tempFilters, rating: e.target.value });
  };

  const handleCheckboxChange = (e, key) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setTempFilters((prev) => {
      const updated = checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value);
      return { ...prev, [key]: updated };
    });
  };
  const handleAgeChange = (e) => {
    setTempFilters({ ...tempFilters, age: e.target.value });
  };
  const handleSubmit = () => {
    setAppliedFilters(tempFilters);
    setShowFilters(false);
  };
  const handleReset = () => {
    const reset = { rating: "", platforms: [], categories: [], age: "" };
    setTempFilters(reset);
    setAppliedFilters(reset);
  };

  const filteredInfluencers = influencersData.filter((influencer) => {
    const matchesSearch = influencer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const { platforms, categories, rating, age } = appliedFilters;
    const hasPlatforms =
      platforms.length === 0 ||
      platforms.some((p) =>
        Object.keys(influencer.followers).some(
          (f) => f.toLowerCase() === p.toLowerCase()
        )
      );
    const hasCategories =
      categories.length === 0 ||
      categories.some((c) =>
        influencer.tags.some((tag) =>
          tag.toLowerCase().includes(c.toLowerCase())
        )
      );
    const hasRating = rating === "" || influencer.rating === parseInt(rating);
    const hasAge =
      age === "" ||
      (age === "18-25" && influencer.age >= 18 && influencer.age <= 25) ||
      (age === "26-35" && influencer.age >= 26 && influencer.age <= 35) ||
      (age === "36-45" && influencer.age >= 36 && influencer.age <= 45);

    return (
      matchesSearch && hasPlatforms && hasCategories && hasRating && hasAge
    );
  });

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#f3f6f9", minHeight: "100vh" }}
    >
      {selectedInfluencer ? (
        <InfluencerProfile
          influencer={selectedInfluencer}
          onBack={() => setSelectedInfluencer(null)}
          onShowPrices={() => setShowPrices(true)}
        />
      ) : (
        <>
          <Row className="align-items-center justify-content-between mb-4">
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder="Search influencers..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={() => setShowFilters(true)}>
                {" "}
                Filters
              </Button>
            </Col>
          </Row>

          <Row>
            {filteredInfluencers.map((influencer) => (
              <Col key={influencer.id} md={4} className="mb-4">
                <Card className="shadow-sm p-3 border rounded-3">
                  <div className="d-flex align-items-center mb-2">
                    <Image
                      src={influencer.image}
                      roundedCircle
                      width={60}
                      height={60}
                      className="me-3"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{influencer.name}</h6>
                      <div className="d-flex gap-3 mt-2">
                        {Object.entries(influencer.followers).map(
                          ([platform, count]) => {
                            const iconMap = {
                              instagram: <FaInstagram color="#E1306C" />,
                              facebook: <FaFacebook color="#1877F2" />,
                              twitter: <FaTwitter color="#1DA1F2" />,
                              youtube: <FaYoutube color="#FF0000" />,
                            };
                            return (
                              <div
                                key={platform}
                                className="d-flex align-items-center gap-1"
                              >
                                {iconMap[platform.toLowerCase()]}{" "}
                                <span style={{ fontSize: "0.9rem" }}>
                                  {count}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <Card.Text>
                    <strong>Tags:</strong> {influencer.tags.join(", ")}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    style={{
                      padding: "2px 10px",
                      fontSize: "0.9rem",
                      width: "90px",
                      borderRadius: "10px",
                    }}
                    onClick={() => setSelectedInfluencer(influencer)}
                  >
                    {" "}
                    View Profile
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Filter Modal */}
      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h6>Rating</h6>
          {[1, 2, 3, 4, 5].map((star) => (
            <Form.Check
              type="radio"
              name="rating"
              label={<span style={{ color: "gold" }}>{"★".repeat(star)}</span>}
              value={star}
              key={star}
              onChange={handleRatingChange}
              checked={tempFilters.rating === `${star}`}
            />
          ))}

          <h6 className="mt-3">Platforms</h6>
          {["Facebook", "Instagram", "Pinterest", "Twitter"].map((p) => (
            <Form.Check
              type="checkbox"
              label={p}
              value={p}
              key={p}
              checked={tempFilters.platforms.includes(p)}
              onChange={(e) => handleCheckboxChange(e, "platforms")}
            />
          ))}
          <h6 className="mt-3">Categories</h6>
          {[
            "Business",
            "Lifestyle",
            "Fitness",
            "Pets & Animals",
            "Beauty & Makeup",
          ].map((c) => (
            <Form.Check
              type="checkbox"
              label={c}
              value={c}
              key={c}
              checked={tempFilters.categories.includes(c)}
              onChange={(e) => handleCheckboxChange(e, "categories")}
            />
          ))}

          <h6 className="mt-3">Age</h6>
          <Form.Select onChange={handleAgeChange} value={tempFilters.age}>
            <option value="">Select Age</option>
            <option value="18-25">18–25</option>
            <option value="26-35">26–35</option>
            <option value="36-45">36–45</option>
          </Form.Select>
          <Button variant="info" className="mt-3 w-100" onClick={handleSubmit}>
            {" "}
            Submit
          </Button>
          <Button
            variant="secondary"
            className="mt-2 w-100"
            onClick={handleReset}
          >
            {" "}
            Reset
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Pricing Modal */}
      <Modal show={showPrices} onHide={() => setShowPrices(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pricing - {selectedPlatform}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInfluencer &&
            Object.keys(selectedInfluencer.followers).map((platform) => (
              <div key={platform} className="mb-3">
                <h6 className="text-primary text-capitalize">{platform}</h6>
                {pricingData[
                  platform.charAt(0).toUpperCase() + platform.slice(1)
                ] ? (
                  <ul className="list-unstyled">
                    {Object.entries(
                      pricingData[
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      ]
                    ).map(([service, price]) => (
                      <li
                        key={service}
                        className="d-flex justify-content-between border-bottom py-1"
                      >
                        <span>{service}</span>
                        <strong>{price}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No pricing data available for {platform}</p>
                )}
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrices(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Influencers;
