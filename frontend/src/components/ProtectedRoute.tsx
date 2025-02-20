// src/components/ProtectedRoute.tsx

import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

// ProtectedRoute component to handle route protection
const ProtectedRoute: React.FC<{ role: 'user' | 'admin' }> = ({ role }) => {
  // Check if the JWT token exists in localStorage
  const token = localStorage.getItem('jwtToken');

  // Check if the role in the token matches the required role for the route
  // (Optional, if you want to handle different roles like admin or user)
  // If you have role info in the token, you can also check it here
  
  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If the token is present and everything is fine, render the children (protected route)
  return <Outlet />;
};

export default ProtectedRoute;
