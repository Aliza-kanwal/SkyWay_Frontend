import api from './axiosConfig';

// Get all seats for a specific flight
export const getSeatsByFlight = async (flightId) => {
  try {
    const response = await api.get(`/seats/flight/${flightId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch seats:', error);
    return [];
  }
};