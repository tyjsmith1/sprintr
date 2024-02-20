import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function RequireAuth({children}) {
  const { currentUser } = useAuth();
  let location = useLocation()

  if (!currentUser) {
    return <Navigate to='/' replace state={{ from: location}}/>
  }

  return children
}

export default RequireAuth;