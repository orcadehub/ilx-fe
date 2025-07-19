import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FacebookCallback = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const fullname = params.get("name");
    const email = params.get("email");
    const role = params.get("role");
    const profilePic = params.get("profilePic");

    if (token && email && role) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ fullname, email, role, profilePic })
      );

      // Redirect to dashboard and reload
      navigate("/dashboard");
      window.location.reload();
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default FacebookCallback;
