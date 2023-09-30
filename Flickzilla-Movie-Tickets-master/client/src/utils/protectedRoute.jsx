// src/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminUser } from './authUtils';

function AdminRoute({ element }) {
  const token = localStorage.getItem('token');
  const isAdmin = isAdminUser(token);

  return isAdmin ? element : <Navigate to="/nopage" />;
}

export default AdminRoute;
