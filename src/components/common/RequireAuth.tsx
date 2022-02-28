import React, { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user.user === '' || Object.keys(user).length === 0) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
}
