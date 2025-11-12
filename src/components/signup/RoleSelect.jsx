import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { ShopOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const roles = [
  {
    type: "business",
    label: "Business User",
    desc: "Find influencers and manage campaigns",
    icon: <ShopOutlined style={{ fontSize: 24 }} />,
  },
  {
    type: "influencer",
    label: "Influencer",
    desc: "Connect with brands and get paid for promotions",
    icon: <UserOutlined style={{ fontSize: 24 }} />,
  },
];

export default function RoleSelect({ onSelect }) {

  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={2} style={{ color: "#0b1220", marginBottom: 8 }}>
        Join InfluenceConnect
      </Title>
      <Text style={{ color: "#6B7280", fontSize: "16px" }}>
        Select how you'd like to use our platform
      </Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {roles.map(({ type, label, desc: sub, icon }) => (
          <Col span={24} key={type}>
            <Card
              hoverable
              onClick={() => onSelect(type)}
              style={{
                borderRadius: 16,
                border: "1.5px solid #E6E9F4",
                boxShadow: "0 8px 24px rgba(17,24,39,.06)",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#ECEAFD",
                  color: "#6F6AE6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(138,122,255,.08)",
                }}>
                  {icon}
                </div>
                <div style={{ textAlign: "left" }}>
                  <Title level={4} style={{ margin: 0, marginBottom: 4, color: "#0b1220" }}>
                    {label}
                  </Title>
                  <Text style={{ color: "#6B7280" }}>{sub}</Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ marginTop: 24, color: "#6B7280" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#5357EB", fontWeight: 700, textDecoration: "none" }}>
          Sign in
        </a>
      </div>
    </div>
  );
}
