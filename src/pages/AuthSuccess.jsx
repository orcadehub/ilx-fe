import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spin, Result } from 'antd';
import { toast } from 'react-toastify';

export default function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        
        // Store token and user data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        toast.success('Successfully signed up with social account!');
        
        // Redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard');
          window.location.reload();
        }, 1000);
      } catch (error) {
        toast.error('Authentication failed');
        navigate('/signup');
      }
    } else {
      toast.error('Authentication failed');
      navigate('/signup');
    }
  }, [searchParams, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}>
      <Result
        icon={<Spin size="large" />}
        title="Completing your signup..."
        subTitle="Please wait while we set up your account."
      />
    </div>
  );
}