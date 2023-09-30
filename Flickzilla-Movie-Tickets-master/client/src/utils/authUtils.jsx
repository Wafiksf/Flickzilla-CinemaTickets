// src/authUtils.js

import jwt_decode from 'jwt-decode';

export function isAdminUser(token) {
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.isAdmin;
  }
  return false;
}
