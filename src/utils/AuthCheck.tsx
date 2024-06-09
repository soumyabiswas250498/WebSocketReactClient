import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthCheckProps {
    children: ReactNode;
}

function AuthCheck({ children }: AuthCheckProps) {

    const isAuthenticated = sessionStorage.getItem('userNameFrom');
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default AuthCheck