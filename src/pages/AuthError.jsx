import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Result, Button } from 'antd';
import { toast } from 'react-toastify';

export default function AuthError() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message') || 'Authentication failed';
    toast.error(decodeURIComponent(message));
  }, [searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <Result
        status="error"
        title="Authentication Failed"
        subTitle="There was an error signing you up with your social account."
        extra={[
          <Button type="primary" key="signup" onClick={() => navigate('/signup')}>
            Try Again
          </Button>,
          <Button key="login" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        ]}
      />
    </div>
  );
}