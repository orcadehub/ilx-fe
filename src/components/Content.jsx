import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardContent from '../pages/DashboardContent';
import Influencers from '../pages/Influencers';
import Chats from '../pages/Chats';
import Reach from '../pages/Reach';
import Services from '../pages/Services';
import Reports from '../pages/Reports';
import Orders from '../pages/Orders';

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardContent />} />
      <Route path="influencers" element={<Influencers />} />
      <Route path="chats" element={<Chats />} />
      <Route path="reach" element={<Reach />} />
      <Route path="services" element={<Services />} />
      <Route path="reports" element={<Reports />} />
      <Route path="orders" element={<Orders />} />
    </Routes>
  );
};

export default Content;
