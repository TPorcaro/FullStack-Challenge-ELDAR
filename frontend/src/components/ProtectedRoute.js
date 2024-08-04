import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, authStatus }) => {
  const { isAuthenticated } = authStatus;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
