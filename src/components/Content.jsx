import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardContent from "../pages/DashboardContent";
import Influencers from "../pages/Influencers";
import Chats from "../pages/Chats";
import Reach from "../pages/Reach";
import Services from "../pages/Services";
import Reports from "../pages/Reports";
import Orders from "../pages/Orders";
import Wallet from "../pages/Wallet";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Billing from "../pages/Billing";
import OffersPage from "../pages/OffersPage";
import Support from "../pages/Support";
import FacebookCallback from "../pages/FacebookCallback";
import GoogleCallback from "../pages/GoogleCallback";
import Wishlist from "../pages/Wishlist";

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardContent />} />
      <Route path="influencers" element={<Influencers />} />
      <Route path="facebook" element={<FacebookCallback />} />
      <Route path="google" element={<GoogleCallback />} />
      <Route path="chats" element={<Chats />} />
      <Route path="chats/:id" element={<Chats />} />
      <Route path="reach" element={<Reach />} />
      <Route path="services" element={<Services />} />
      <Route path="reports" element={<Reports />} />
      <Route path="orders" element={<Orders />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="payments" element={<Wallet />} />
      <Route path="support" element={<Support />} />
      <Route path="offers" element={<OffersPage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />
      <Route path="billing" element={<Billing />} />
      <Route path="mywishlist" element={<Wishlist />} />
      <Route path="notifications" element={<Notifications />} />
    </Routes>
  );
};

export default Content;
