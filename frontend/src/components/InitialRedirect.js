import React from 'react';
import { Navigate } from 'react-router-dom';

const InitialRedirect = ({ authStatus }) => {
    const { isAuthenticated, user } = authStatus;
    if (isAuthenticated) {
        if (user.role === 'ADMIN') {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/tasks" />;
        }
    }

    return <Navigate to="/login" />;
};

export default InitialRedirect;
