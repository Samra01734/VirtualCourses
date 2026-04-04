import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { userData } = useSelector((state) => state.user);

  if (userData) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;