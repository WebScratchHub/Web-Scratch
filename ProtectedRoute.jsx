import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDeviceMode } from '../hooks/useDeviceMode';
import Spinner from './ui/Spinner';

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  const { deviceMode } = useDeviceMode();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-bg">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (!deviceMode) {
    return <Navigate to="/select-device" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
