import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useCookiesFunc } from './cookiesFunc';

interface AuthCheckProps {
    children: ReactNode;
    isAuthPage?: boolean;
}

function AuthCheck({ children, isAuthPage }: AuthCheckProps,) {
    const { cookies } = useCookiesFunc()

    if (isAuthPage) {
        if (cookies?.refreshToken) {
            return <Navigate to="/chat" replace />;
        }
    } else {
        if (!cookies?.refreshToken) {
            return <Navigate to="/" replace />;
        }
    }


    return children;
}

export default AuthCheck