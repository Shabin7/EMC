import React from 'react'
import { Navigate } from 'react-router-dom';

const HrProtectedRoute = ({ children, redirectPath = '/hrlogin' }) => {
    const isLoggedIn = localStorage.getItem('isHrLoggedIn') === 'true';

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} />
    }

    return children;
};

export default HrProtectedRoute;