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
  Globe,
  Twitter,
  PencilSquare,
  Gear,
  Envelope,
  GeoAlt,
  CurrencyRupee,
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
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

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
    website: user.website || "https://example.com",
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

  const CustomizedAxisTick = ({ x, y, payload }) => {
    const platform = platformData.find((p) => p.name === payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x={-12} y={8} width={24} height={24}>
          <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
            {platform?.icon}
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <Container
      fluid
      style={{ backgroundColor: "var(--primary-color)", color: "#000000" }}
      data-aos="fade-up"
    >
      {/* Profile Header */}
      <div className="py-3 mb-4" data-aos="fade-down" style={{ backgroundColor: "#c3c4ccff", color: "#000" }}>
        <Container>
          <Row className="align-items-center">
            <Col xs="auto">
              <Image
                src={user?.profile_pic || "https://picsum.photos/seed/user/80/80"}
                roundedCircle
                width={80}
                height={80}
                alt="User Avatar"
              />
            </Col>
            <Col>
              <h4 className="mb-1">{user?.fullname || "User Name"}</h4>
              <small>
                <Envelope className="me-1" size={12} /> {user?.email || "user@example.com"}
              </small>
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                size="sm"
                className="me-2 rounded-pill px-3"
                onClick={handleMessage}
                disabled={!user}
              >
                <EnvelopeFill className="me-1" /> Message
              </Button>
              <Button
                variant="secondary"
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
      <Container fluid>
        <Row>
          {/* Left Side - Business Info */}
          <Col lg={3} md={12} className="mb-4">
            <Card className="bg-white shadow-lg border-0" data-aos="fade-right">
              <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                <h5 className="mb-0">Business Information</h5>
                <Button
                  variant="warning"
                  size="sm"
                  className="rounded-pill px-3"
                  onClick={() => setShowEdit(true)}
                >
                  <PencilSquare className="me-1" /> Edit
                </Button>
              </Card.Header>
              <Card.Body className="text-black">
                {[
                  {
                    icon: <Gear className="me-2" />,
                    label: "Business Name",
                    value: user?.business_name || "My Business",
                  },
                  {
                    icon: <Gear className="me-2" />,
                    label: "Category",
                    value: user?.category || "Lifestyle",
                  },
                  {
                    icon: <Gear className="me-2" />,
                    label: "Business Status",
                    value: user?.business_status || "Active",
                  },
                  {
                    icon: <Gear className="me-2" />,
                    label: "Service Type",
                    value: user?.service_type || "Consulting",
                  },
                  {
                    icon: <Globe className="me-2" />,
                    label: "Website",
                    value: (
                      <a
                        href={user?.website || "https://example.com"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary"
                      >
                        {user?.website?.length > 15
                          ? `${user.website.slice(0, 15)}...`
                          : user?.website}
                      </a>
                    ),
                  },
                  {
                    icon: <GeoAlt className="me-2" />,
                    label: "Location",
                    value: user?.location || "Hyderabad, India",
                  },
                  {
                    icon: <CurrencyRupee className="me-2" />,
                    label: "Price Range",
                    value: user?.price_range || "₹1,000 - ₹10,000",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div>{item.value}</div>
                  </div>
                ))}

                <Form.Group className="mb-3">
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

                <div>
                  <h6 className="mb-3">Business Images</h6>
                  <Row xs={3} className="g-2">
                    {bizImages.map((src, i) => (
                      <Col key={i}>
                        <Image src={src} thumbnail className="border-0" />
                      </Col>
                    ))}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side - Services/Data Tabs */}
          <Col lg={9} md={12}>
            <Card className="bg-white shadow-lg border-0" data-aos="fade-left">
              <Card.Body className="p-0">
                <Tabs
                  defaultActiveKey="services"
                  className="border-bottom mb-3"
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
                  >
                    <Row xs={1} sm={2} md={3} className="g-4">
                      {services.map((card, idx) => (
                        <Col key={idx} data-aos="zoom-in" data-aos-delay={idx * 100}>
                          <Card className="bg-white shadow-sm border-0 h-100">
                            <div className="position-relative">
                              <Card.Img
                                variant="top"
                                src={card.img}
                                className="rounded-top"
                              />
                              <div className="position-absolute top-0 end-0 p-2">
                                {card.icons.map((Icon, i) => (
                                  <span
                                    key={i}
                                    className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center me-1"
                                    style={{ width: "30px", height: "30px" }}
                                  >
                                    <Icon size={16} />
                                  </span>
                                ))}
                              </div>
                            </div>
                            <Card.Body className="text-black d-flex justify-content-around">
                              <div className="d-flex align-items-center">
                                <Heart className="me-1 text-danger" />
                                <span>{card.likes}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <Chat className="me-1 text-success" />
                                <span>{card.comments}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <Share className="me-1 text-warning" />
                                <span>{card.shares}</span>
                              </div>
                              <div className="d-flex align-items-center">
                                <Eye className="me-1 text-info" />
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
                  >
                    <Row className="g-4 mb-4">
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
                          icon: <Eye className="text-primary" />,
                          title: "Impressions",
                          value: "90",
                        },
                      ].map((item, i) => (
                        <Col md={4} sm={6} key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                          <Card className="bg-white shadow-sm border-0 text-center">
                            <Card.Body className="text-black">
                              <div className="mb-2" style={{ fontSize: "1.5rem" }}>
                                {item.icon}
                              </div>
                              <h6 className="mb-1">{item.title}</h6>
                              <h4 className="mb-0">{item.value}</h4>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                    <Row className="g-4">
                      <Col md={6}>
                        <Card className="bg-white shadow-sm border-0" data-aos="fade-right">
                          <Card.Body className="text-black">
                            <h5 className="mb-3">Orders by Platform</h5>
                            <ResponsiveContainer width="100%" height={250}>
                              <BarChart data={platformData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                  dataKey="name"
                                  tick={<CustomizedAxisTick />}
                                  interval={0}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="orders" fill="#0d6efd" />
                              </BarChart>
                            </ResponsiveContainer>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="bg-white shadow-sm border-0" data-aos="fade-left">
                          <Card.Body className="text-black">
                            <h5 className="mb-3">Links vs Clicks</h5>
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
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Card className="bg-white shadow-sm border-0 mt-4" data-aos="fade-up">
                      <Card.Body className="text-black">
                        <h5 className="mb-3">Monthly Orders</h5>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={monthlyOrdersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="orders"
                              stroke="#0d6efd"
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Edit Modal */}
      {showEdit && (
        <Edit
          user={user}
          onSave={(updatedUser) => {
            setUser(normalizeUserData(updatedUser));
            setShowEdit(false);
          }}
          onClose={() => setShowEdit(false)}
        />
      )}
    </Container>
  );
}

export default Profile;
