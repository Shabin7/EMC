import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, redirectPath = '/adminlogin' }) => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} />;
    }

    return children;
};

export default ProtectedRoute;
