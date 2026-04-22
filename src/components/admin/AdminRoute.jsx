import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  // Check for adminData instead of adminToken
  const adminData = localStorage.getItem('adminData');
  
  if (!adminData) {
    return <Navigate to="/admin/login" />;
  }
  
  return children;
};

export default AdminRoute;