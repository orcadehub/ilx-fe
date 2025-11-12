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

const COLORS = ["#3B82F6", "#4bc0c0"];

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
        <Col xs={6} xl={4} key={i}>
          <Card className="!bg-[var(--bgPage2)] !text-[var(--text)] border !border-[var(--border)] text-center">
            <Card.Body>
              {/* <div className="mb-2" style={{ fontSize: "1.5rem" }}>
                {item.icon}
              </div> */}
              <h4 className="mb-0 !text-[30px] !font-bold">{item.value}</h4>
              <h6 className="mb-1 text-12">{item.title}</h6>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    <Row className="g-4 mb-4">
      <Col md={6}>
        <Card
          className="!text-[var(--text)] !bg-[var(--bgPage2)] border !border-[var(--border)] shadow-sm "
        >
          <Card.Body>
            <h5 className="mb-3 !text-[16px]">Orders by Platform</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  tick={({ x, y, payload }) => (
                    <text
                      x={x}
                      y={y + 15}
                      textAnchor="middle"
                      fill="#555"
                      fontSize={12}
                    >
                      {payload.value}
                    </text>
                  )}
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
        <Card className="!text-[var(--text)] !bg-[var(--bgPage2)] border !border-[var(--border)] shadow-sm ">
          <Card.Body>
            <h5 className="mb-3 !text-[16px]">Links vs Clicks</h5>
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
                  padAngle={6}
                >
                  {pieData.map((entry, index) => (
                    <Cell stroke="var(--bg)"     
                      strokeWidth={6}
                      key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                  backgroundColor: "#475569", 
                  color: "#475569",
                  borderRadius: "8px",
                  border: "1px solid #475569",
                }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Card className="!text-[var(--text)] !bg-[var(--bgPage2)] border !border-[var(--border)] shadow-sm ">
      <Card.Body>
        <h5 className="mb-3 !text-[16px]">Monthly Orders</h5>
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