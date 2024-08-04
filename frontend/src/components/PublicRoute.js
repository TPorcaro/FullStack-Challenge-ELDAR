import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, authStatus }) => {
  const { isAuthenticated } = authStatus;

  if (isAuthenticated) {
    return <Navigate to="/tasks" />;
  }

  return children;
};

export default PublicRoute;
