import React from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../utils/authUtils';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('authToken');
  
  if (!token || !verifyToken(token)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;