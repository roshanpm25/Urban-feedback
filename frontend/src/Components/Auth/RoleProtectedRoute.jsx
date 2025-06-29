import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const role = localStorage.getItem('role');

  if (!isLoggedIn || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleProtectedRoute;
