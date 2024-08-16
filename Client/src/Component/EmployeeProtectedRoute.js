import React from 'react'
import { Navigate } from 'react-router-dom';

const EmployeeProtectedRoute = ({ children, redirectPath = '/login' }) => {
    const isLoggedIn = localStorage.getItem('isEmployeeLoggedIn') === 'true';

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} />
    }
    return children
}

export default EmployeeProtectedRoute