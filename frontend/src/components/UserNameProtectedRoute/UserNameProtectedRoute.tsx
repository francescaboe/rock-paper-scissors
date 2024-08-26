import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface UserNameProtectedRouteProps {
  children: React.ReactNode;
}

const UserNameProtectedRoute: React.FC<UserNameProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!location.state?.userPlayerName) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default UserNameProtectedRoute;
