/Profile.jsx/;
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Image,
  Form,
} from "react-bootstrap";
import {
  Heart,
  Chat,
  Share,
  Eye,
  Instagram,
  Facebook,
  Link,
  Youtube,
  Twitter,
  PencilSquare,
  Gear,
  Envelope,
  Globe,
  GeoAlt,
  CurrencyDollar,
  EnvelopeFill,
  ShareFill,
  Collection,
  GraphUp,
} from "react-bootstrap-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Edit from "./Edit";
import "./Profile.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useLocation, useParams, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const baseURL =
    import.meta.env.MODE === "development"
      ? config.LOCAL_BASE_URL
      : config.BASE_URL;

  const normalizeUserData = (user) => ({
    ...user,
    business_name: user.business_name || "My Business",
    category: user.category || "Lifestyle",
    business_status: user.business_status || "Active",
    service_type: user.service_type || "Consulting",
    website: user.website || "example.com",
    location: user.location || "Hyderabad, India",
    price_range: user.price_range || "₹1,000 - ₹10,000",
    account_status: user.account_status || "Activate",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const localUserString = localStorage.getItem("user");

        const localUser = JSON.parse(localUserString);
        if (!localUser || !localUser.email) {
          console.warn("User or email missing in localStorage");
          return;
        }

        const res = await axios.get(
          `${baseURL}/api/user-details/${localUser.email}`
        );
        setUser(normalizeUserData(res.data));
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleMessage = () => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    navigate(`/dashboard/chats/${localUser.id}`);
  };

  const services = [
    {
      img: "https://picsum.photos/seed/car1/400/300",
      likes: 200,
      comments: 50,
      shares: 10,
      views: 500,
      icons: [Instagram, Link],
    },
    {
      img: "https://picsum.photos/seed/car2/400/300",
      likes: 350,
      comments: 70,
      shares: 30,
      views: 900,
      icons: [Instagram],
    },
    {
      img: "https://picsum.photos/seed/car3/400/300",
      likes: 180,
      comments: 40,
      shares: 15,
      views: 450,
      icons: [Instagram],
    },
    {
      img: "https://picsum.photos/seed/car4/400/300",
      likes: 220,
      comments: 55,
      shares: 20,
      views: 600,
      icons: [Facebook, Instagram],
    },
    {
      img: "https://picsum.photos/seed/book1/400/300",
      likes: 280,
      comments: 60,
      shares: 25,
      views: 700,
      icons: [Instagram],
    },
    {
      img: "https://picsum.photos/seed/camera1/400/300",
      likes: 320,
      comments: 75,
      shares: 35,
      views: 800,
      icons: [Facebook],
    },
  ];

  const bizImages = [
    "https://picsum.photos/seed/biz1/200/150",
    "https://picsum.photos/seed/biz2/200/150",
    "https://picsum.photos/seed/biz3/200/150",
    "https://picsum.photos/seed/biz4/200/150",
    "https://picsum.photos/seed/biz5/200/150",
    "https://picsum.photos/seed/biz6/200/150",
  ];

  const platformData = [
    { name: "Facebook", orders: 160, icon: <Facebook /> },
    { name: "Instagram", orders: 120, icon: <Instagram /> },
    { name: "YouTube", orders: 80, icon: <Youtube /> },
    { name: "Twitter", orders: 100, icon: <Twitter /> },
  ];

  const pieData = [
    { name: "Links Generated", value: 60 },
    { name: "Clicks Received", value: 40 },
  ];

  const COLORS = ["#FFB74D", "#4DB6AC"];

  const monthlyOrdersData = [
    { month: "Jan", orders: 30 },
    { month: "Feb", orders: 45 },
    { month: "Mar", orders: 60 },
    { month: "Apr", orders: 75 },
    { month: "May", orders: 90 },
    { month: "Jun", orders: 75 },
    { month: "Jul", orders: 60 },
    { month: "Aug", orders: 45 },
    { month: "Sep", orders: 60 },
    { month: "Oct", orders: 75 },
    { month: "Nov", orders: 90 },
    { month: "Dec", orders: 100 },
  ];

  const [showEdit, setShowEdit] = useState(false);

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "ABC company",
    category: "XYZ Products",
    businessStatus: "Not Registered",
    serviceType: "Online & Offline",
    website: "www.xyz.com",
    location: "123 Business Ave, City",
    priceRange: "₹5,000 - ₹50,000",
    accountStatus: "Activate",
  });

  const handleSave = (updatedInfo) => {
    setBusinessInfo(updatedInfo);
    setShowEdit(false);
  };

  const CustomizedAxisTick = ({ x, y, payload }) => {
    const platform = platformData.find((p) => p.name === payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-12} y={-12} width={24} height={24}>
          <div className="platform-icon">{platform?.icon}</div>
        </foreignObject>
      </g>
    );
  };

  return (
    <Container fluid className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <Container>
          <Row className="align-items-center">
            <Col xs="auto">
              <Image
                src={user?.profile_pic}
                roundedCircle
                width={80}
                height={80}
                className="profile-avatar"
                alt="User Avatar"
              />
            </Col>
            <Col>
              <h4 className="profile-username">{user?.fullname}</h4>
              <small className="profile-email">
                <Envelope className="me-1" size={12} /> {user?.email}
              </small>
            </Col>
            <Col className="text-end">
              <Button
                onClick={handleMessage}
                variant="outline-light"
                size="sm"
                className="me-2 rounded-pill px-3"
                disabled={!user} // prevent action if user is not loaded
              >
                <EnvelopeFill className="me-1" /> Message
              </Button>
              <Button
                variant="light"
                size="sm"
                className="rounded-pill px-3"
                disabled={!user}
              >
                <ShareFill className="me-1" /> Share
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container fluid className="profile-content-container">
        <Row>
          {/* Left Side - Business Info */}
          <Col lg={3} className="profile-sidebar">
            <Card className="business-info-card">
              <Card.Header className="business-info-header">
                <h5 className="business-info-title">Business Information</h5>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="rounded-pill px-3"
                  onClick={() => setShowEdit(true)}
                >
                  <PencilSquare className="me-1" /> Edit
                </Button>
              </Card.Header>

              <Card.Body>
                <div className="business-info-body">
                  {[
                    {
                      icon: <Gear />,
                      label: "Business Name",
                      value: user?.business_name || "My Business",
                    },
                    {
                      icon: <Gear />,
                      label: "Category",
                      value: user?.category || "Lifestyle",
                    },
                    {
                      icon: <Gear />,
                      label: "Business Status",
                      value: user?.business_status || "Active",
                    },
                    {
                      icon: <Gear />,
                      label: "Service Type",
                      value: user?.service_type || "Consulting",
                    },
                    {
                      icon: <Globe />,
                      label: "Website",
                      value: (
                        <a
                          href={`${user?.website || "example.com"}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {user?.website?.length > 15
                            ? `${user.website.slice(0, 15)}...`
                            : user?.website}
                        </a>
                      ),
                    },
                    {
                      icon: <GeoAlt />,
                      label: "Location",
                      value: user?.location || "Hyderabad, India",
                    },
                    {
                      icon: <span>₹</span>,
                      label: "Price Range",
                      value: user?.price_range || "₹1,000 - ₹10,000",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="info-item">
                      <div className="info-label">
                        <span className="info-icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <div className="info-value">{item.value}</div>
                    </div>
                  ))}
                </div>

                <Form.Group className="account-management">
                  <Form.Label>Account Management</Form.Label>
                  <Form.Select
                    value={user?.account_status || "Activate"}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        account_status: e.target.value,
                      }))
                    }
                  >
                    <option value="Activate">Activate</option>
                    <option value="Deactivate">Deactivate</option>
                  </Form.Select>
                </Form.Group>

                <div className="business-images-container">
                  <h6>BUSINESS IMAGES</h6>
                  <Row xs={3} className="g-3">
                    {(bizImages || []).map((src, i) => (
                      <Col key={i}>
                        <Image src={src} thumbnail className="business-image" />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Services/Data Tabs */}
          <Col lg={9} className="profile-content ">
            <Card className="main-content-card">
              <Card.Body className="p-0">
                <div className="custom-tabs-container">
                  <Tabs
                    defaultActiveKey="services"
                    className="custom-tabs mb-3 pb-2"
                    fill
                  >
                    <Tab
                      eventKey="services"
                      title={
                        <div className="d-flex align-items-center justify-content-center">
                          <Collection className="me-2" />
                          <span>Services</span>
                        </div>
                      }
                      className="tab-content-area"
                    >
                      <Row xs={1} sm={2} md={3} className="services-grid g-4">
                        {services.map((card, idx) => (
                          <Col key={idx}>
                            <Card className="service-card">
                              <div className="service-image-container">
                                <Card.Img
                                  src={card.img}
                                  className="service-image"
                                />
                                <div className="service-badges">
                                  {card.icons.map((Icon, i) => (
                                    <div key={i} className="service-badge">
                                      <Icon className="service-platform-icon" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <Card.Body className="service-stats">
                                <div className="stat-item">
                                  <Heart className="stat-icon" />
                                  <span>{card.likes}</span>
                                </div>
                                <div className="stat-item">
                                  <Chat className="stat-icon" />
                                  <span>{card.comments}</span>
                                </div>
                                <div className="stat-item">
                                  <Share className="stat-icon" />
                                  <span>{card.shares}</span>
                                </div>
                                <div className="stat-item">
                                  <Eye className="stat-icon" />
                                  <span>{card.views}</span>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Tab>

                    <Tab
                      eventKey="data"
                      title={
                        <div className="d-flex align-items-center justify-content-center">
                          <GraphUp className="me-2" />
                          <span>Data</span>
                        </div>
                      }
                      className="tab-content-area"
                    >
                      <div className="data-content">
                        <Row className="stats-grid g-4">
                          {[
                            {
                              icon: <Share className="text-primary" />,
                              title: "Total Campaigns",
                              value: "90",
                            },
                            {
                              icon: <Heart className="text-danger" />,
                              title: "Avg Likes",
                              value: "90",
                            },
                            {
                              icon: <Eye className="text-info" />,
                              title: "Engagement",
                              value: "90",
                            },
                            {
                              icon: <Chat className="text-success" />,
                              title: "Avg Comments",
                              value: "90",
                            },
                            {
                              icon: <Share className="text-warning" />,
                              title: "Avg Shares",
                              value: "90",
                            },
                            {
                              icon: <Eye className="text-purple" />,
                              title: "Impressions",
                              value: "90",
                            },
                          ].map((item, i) => (
                            <Col md={4} sm={6} key={i}>
                              <Card className="stats-card">
                                <div className="stats-icon">{item.icon}</div>
                                <h6 className="stats-title">{item.title}</h6>
                                <h4 className="stats-value">{item.value}</h4>
                              </Card>
                            </Col>
                          ))}
                        </Row>

                        <Row className="charts-row g-4">
                          <Col md={6}>
                            <Card className="chart-card">
                              <h5 className="chart-title">
                                Orders by Platform
                              </h5>
                              <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={platformData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis
                                    dataKey="name"
                                    tick={<CustomizedAxisTick />}
                                  />
                                  <YAxis />
                                  <Tooltip />
                                  <Bar dataKey="orders" fill="#8884d8" />
                                </BarChart>
                              </ResponsiveContainer>
                            </Card>
                          </Col>

                          <Col md={6}>
                            <Card className="chart-card">
                              <h5 className="chart-title">Links vs Clicks</h5>
                              <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                  <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    innerRadius={60}
                                    dataKey="value"
                                  >
                                    {pieData.map((entry, index) => (
                                      <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                  <Legend />
                                </PieChart>
                              </ResponsiveContainer>
                            </Card>
                          </Col>
                        </Row>

                        <Card className="chart-card mt-4">
                          <h5 className="chart-title">Monthly Orders</h5>
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyOrdersData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#26A69A"
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Card>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Edit Modal */}
      {showEdit && (
        <Edit
          user={user}
          onSave={(updatedUser) => setUser(updatedUser)}
          onClose={() => setShowEdit(false)}
        />
      )}
    </Container>
  );
}

export default Profile;
