import api from './axiosConfig';

export const searchFlights = async (searchParams) => {
  try {
    const response = await api.get('/flights/search', {
      params: {
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.departureDate
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to search flights:', error);
    return [];
  }
};

export const getFlightById = async (id) => {
  try {
    const response = await api.get(`/flights/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get flight by id:', error);
    return null;
  }
};

export const getFlightDetails = async (id) => {
  return getFlightById(id);
};

export const getFlights = async (params = {}) => {
  try {
    const response = await api.get('/flights', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to get flights:', error);
    return [];
  }
};

export const createFlight = async (flightData) => {
  try {
    const response = await api.post('/flights', flightData);
    return response.data;
  } catch (error) {
    console.error('Failed to create flight:', error);
    return { success: false, error: error.message };
  }
};

export const updateFlight = async (id, flightData) => {
  try {
    const response = await api.put(`/flights/${id}`, flightData);
    return response.data;
  } catch (error) {
    console.error('Failed to update flight:', error);
    return { success: false, error: error.message };
  }
};

export const deleteFlight = async (id) => {
  try {
    const response = await api.delete(`/flights/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete flight:', error);
    return { success: false, error: error.message };
  }
};