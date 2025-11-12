import React from "react";
import { Form, Input, Button, Row, Col, Typography, Divider } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, SafetyOutlined, FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function AccountForm({
  formData,
  onChange,
  onSubmit,
  loading,
  onFacebook,
  onGoogle,
}) {
  return (
    <>
      <Form layout="vertical">
        <Form.Item label="Full Name" required>
          <Input
            prefix={<UserOutlined />}
            name="username"
            value={formData.username}
            onChange={onChange}
            placeholder="Jane Doe"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item label="Email" required>
          <Input
            prefix={<MailOutlined />}
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="name@company.com"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item label="Phone" required>
          <Input
            prefix={<PhoneOutlined />}
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+1 555 123 4567"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item label="Password" required>
          <Input.Password
            prefix={<LockOutlined />}
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Create a strong password"
            size="large"
            style={{ borderRadius: 8 }}
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Use at least 8 characters, with letters and numbers.
          </Text>
        </Form.Item>

        <Form.Item label="Confirm Password" required>
          <Input.Password
            prefix={<SafetyOutlined />}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="Re-enter password"
            size="large"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Button
          type="primary"
          size="large"
          block
          onClick={onSubmit}
          loading={loading}
          style={{
            borderRadius: 8,
            backgroundColor: "#5357eb",
            borderColor: "#5357eb",
            fontWeight: 600,
            height: 48,
            marginBottom: 16
          }}
        >
          Send OTP
        </Button>
      </Form>

      <Divider>OR</Divider>

      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            size="large"
            block
            icon={<FacebookOutlined />}
            onClick={onFacebook}
            style={{
              borderRadius: 8,
              borderColor: "#1877f2",
              color: "#1877f2",
              fontWeight: 600,
              height: 40
            }}
          >
            Facebook
          </Button>
        </Col>
        <Col span={12}>
          <Button
            size="large"
            block
            icon={<GoogleOutlined />}
            onClick={onGoogle}
            style={{
              borderRadius: 8,
              borderColor: "#db4437",
              color: "#db4437",
              fontWeight: 600,
              height: 40
            }}
          >
            Google
          </Button>
        </Col>
      </Row>
    </>
  );
}