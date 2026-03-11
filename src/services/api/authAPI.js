// Remove the import for now since we're using mock data
// import api from './api';

export const login = async (email, password) => {
  // Mock response - replace with actual API call
  return {
    token: 'mock-token-' + Date.now(),
    user: { id: 1, name: 'Test User', email }
  };
};

export const signup = async (userData) => {
  // Mock response - replace with actual API call
  return {
    token: 'mock-token-' + Date.now(),
    user: { id: 1, name: userData.name, email: userData.email }
  };
};

export const logout = async () => {
  // Mock logout
  return { success: true };
};

export const getCurrentUser = async () => {
  // Mock get user - replace with actual API call
  const token = localStorage.getItem('token');
  if (token) {
    return { 
      id: 1, 
      name: 'Test User', 
      email: 'test@example.com' 
    };
  }
  return null;
};