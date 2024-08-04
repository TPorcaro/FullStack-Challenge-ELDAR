import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles, authStatus }) => {
    const { isAuthenticated, user } = authStatus;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/tasks" />;
    }

    return children;
};

export default PrivateRoute;
