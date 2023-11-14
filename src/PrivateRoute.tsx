import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from './api/authToken'; // Adjust the import path as needed

/**
 * A private route component that checks if the user is authenticated before rendering the route.
 * If the user is not authenticated, they are redirected to the login page.
 */
const PrivateRoute: React.FC = () => {
  const isAuthenticated = !!getAccessToken();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
