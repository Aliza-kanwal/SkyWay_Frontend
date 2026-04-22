import api from './axiosConfig';

// Get all flights - using the exact endpoint that works
export const getFlights = async () => {
  try {
    console.log('Calling API: /flights');
    const response = await api.get('/flights');
    console.log('Response status:', response.status);
    console.log('Response data count:', response.data?.length);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch flights:', error);
    return [];
  }
};

// Search flights
export const searchFlights = async (searchParams) => {
  try {
    const response = await api.get('/flights/search', { params: searchParams });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single flight
export const getFlightById = async (id) => {
  try {
    const response = await api.get(`/flights/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get flight details (alias)
export const getFlightDetails = getFlightById;

// Admin functions for managing flights
export const createFlight = async (flightData) => {
  try {
    const response = await api.post('/admin/flights', flightData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateFlight = async (id, flightData) => {
  try {
    const response = await api.put(`/admin/flights/${id}`, flightData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteFlight = async (id) => {
  try {
    const response = await api.delete(`/admin/flights/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};