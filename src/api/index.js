const BASE_URL = 'http://127.0.0.1:8000';

export const ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/token/login`,
    LOGOUT: `${BASE_URL}/auth/token/logout`,
    SIGNUP: `${BASE_URL}/auth/users/`,
    LANDS: `${BASE_URL}/lands`,
  };