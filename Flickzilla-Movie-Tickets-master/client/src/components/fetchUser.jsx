// UserUtils.js

import axios from 'axios';
import jwt_decode from 'jwt-decode';

export async function fetchUserInfoFromToken() {
  const token = localStorage.getItem("token");
  let userId;

  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.warn("Token not found in localStorage.");
  }

  if (userId) {
    try {
      const response = await axios.get(`http://localhost:5000/users/find/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return null;
}
