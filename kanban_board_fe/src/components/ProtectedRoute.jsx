import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (role && (role !== userRole || !userRole)) {
    return <Navigate to="/not-found" replace />;  // Redirect to a "Not Found" page or an appropriate fallback route
  }
  return <Outlet />;
};

export default ProtectedRoute;
