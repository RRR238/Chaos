// src/routes/AppRoutes.tsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdminLogin from '../pages/AdminLogin';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Admin Routes - Protected */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
        </Route>
      </Route>

      {/* User Routes - Protected */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          {/* Additional user routes can be added here */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
