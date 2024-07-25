// PublicRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface PrivateRouteProps {
    restricted: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ restricted }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.currentUser);

    // If the route is restricted and the user is authenticated, redirect them to home
    if (restricted && isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
