import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SocialSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userDataStr = params.get('data');
    if (userDataStr) {
      const user = JSON.parse(decodeURIComponent(userDataStr));
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard'); // or any route
    }
  }, []);

  return <p>Connecting your social account...</p>;
};

export default SocialSuccess;
