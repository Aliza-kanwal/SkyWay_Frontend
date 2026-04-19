import api from './axiosConfig';

export const getAirports = async () => {
  try {
    const response = await api.get('/airports');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const searchAirports = async (query) => {
  try {
    const response = await api.get('/airports/search', { params: { q: query } });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAirportById = async (id) => {
  try {
    const response = await api.get(`/airports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Admin functions
export const createAirport = async (airportData) => {
  try {
    const response = await api.post('/admin/airports', airportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateAirport = async (id, airportData) => {
  try {
    const response = await api.put(`/admin/airports/${id}`, airportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteAirport = async (id) => {
  try {
    const response = await api.delete(`/admin/airports/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};