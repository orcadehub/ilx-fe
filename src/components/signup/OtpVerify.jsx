import React from "react";
import { Button, Input, Space, Typography } from "antd";
import { ClockCircleOutlined, ReloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function OtpVerify({ otp, setOtp, seconds, canResend, onResend, onVerify, loading }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Text strong style={{ display: 'block', marginBottom: 16, fontSize: 16 }}>
        Enter OTP
      </Text>
      
      <Input.OTP
        length={6}
        value={otp}
        onChange={setOtp}
        size="large"
        style={{ marginBottom: 16 }}
      />
      
      <div style={{ marginBottom: 16 }}>
        {seconds > 0 ? (
          <Text type="secondary">
            <ClockCircleOutlined /> Resend OTP in {seconds} sec
          </Text>
        ) : (
          <Button 
            type="link" 
            icon={<ReloadOutlined />}
            onClick={onResend} 
            disabled={!canResend || loading}
          >
            Resend OTP
          </Button>
        )}
      </div>
      
      <Button 
        type="primary"
        size="large"
        block
        onClick={onVerify} 
        loading={loading}
        disabled={otp.length < 6}
        style={{
          borderRadius: 8,
          backgroundColor: "#28a745",
          borderColor: "#28a745",
          fontWeight: 600,
          height: 48
        }}
      >
        Verify & Signup
      </Button>
    </div>
  );
}
