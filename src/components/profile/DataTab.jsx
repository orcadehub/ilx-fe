// src/components/DataTab.js
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
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
import { Share, Heart, Eye, ChatDots, Instagram, Facebook, Youtube, Twitter } from "react-bootstrap-icons";

const iconComponents = {
  Instagram: <Instagram />,
  Facebook: <Facebook />,
  Youtube: <Youtube />,
  Twitter: <Twitter />,
};

const COLORS = ["#ff9f40", "#4bc0c0"];

const CustomizedAxisTick = ({ x, y, payload }) => {
  const platform = iconComponents[payload.value];
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-12} y={8} width={24} height={24}>
        <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
          {platform}
        </div>
      </foreignObject>
    </g>
  );
};

const DataTab = ({ platformData, pieData, monthlyOrdersData }) => (
  <div className="p-3">
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
          icon: <ChatDots className="text-success" />,
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
        <Col md={4} sm={6} key={i}>
          <Card className="bg-white shadow-sm border-0 text-center">
            <Card.Body>
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
        <Card className="bg-white shadow-sm border-0">
          <Card.Body>
            <h5 className="mb-3">Orders by Platform</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#0d6efd" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card className="bg-white shadow-sm border-0">
          <Card.Body>
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    <Card className="bg-white shadow-sm border-0 mt-4">
      <Card.Body>
        <h5 className="mb-3">Monthly Orders</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyOrdersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#0d6efd" />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  </div>
);

export default DataTab;