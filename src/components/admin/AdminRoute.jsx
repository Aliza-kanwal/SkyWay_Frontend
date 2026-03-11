import React from 'react';
import { Navigate } from 'react-router-dom';

// Simple admin check
const isAdmin = () => {
  const adminToken = localStorage.getItem('adminToken');
  return !!adminToken; // Returns true if adminToken exists
};

const AdminRoute = ({ children }) => {
  if (!isAdmin()) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default AdminRoute;