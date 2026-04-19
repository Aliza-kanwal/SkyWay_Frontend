import api from './axiosConfig';
import toast from 'react-hot-toast';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    toast.success('Login successful! Welcome back.');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
    toast.error(message);
    throw error;
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    toast.success('Registration successful! Please login.');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed. Please try again.';
    toast.error(message);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout');
    toast.success('Logged out successfully');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local storage even if API fails
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};