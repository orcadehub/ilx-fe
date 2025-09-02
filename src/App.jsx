import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import Price from "./pages/Price";
import DashboardPage from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import SocialSuccess from "./pages/SocialSuccess";
import MakeOrder from "./pages/MakeOrder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";
import About from "./pages/About";

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isCheck = location.pathname.startsWith("/checkout");
  const isOrder = location.pathname.startsWith("/make-order");

  return (
    <>
      {!isCheck && !isOrder && (
        <div style={{ visibility: isDashboard ? "hidden" : "visible" }}>
          <Header />
        </div>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/make-order" element={<MakeOrder />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/pricing" element={<Price />} />
        <Route exact path="/features" element={<Features />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          exact
          path="/terms-of-service"
          element={<TermsAndConditions />}
        />
        <Route
          exact
          path="/cancellation-refund-policy"
          element={<CancellationRefundPolicy />}
        />
        <Route exact path="/social-success" element={<SocialSuccess />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
      {!isDashboard && !isCheck && !isOrder && <Footer />}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
