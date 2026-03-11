import api from './axiosConfig';

export const getAirports = async () => {
  try {
    // Mock data - replace with actual API call
    return [
      { id: 1, code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', terminals: 6, timezone: 'America/New_York' },
      { id: 2, code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', terminals: 9, timezone: 'America/Los_Angeles' },
      { id: 3, code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK', terminals: 4, timezone: 'Europe/London' },
      { id: 4, code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', terminals: 3, timezone: 'Asia/Dubai' },
      { id: 5, code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan', terminals: 3, timezone: 'Asia/Tokyo' },
    ];
    
    // const response = await api.get('/airports');
    // return response.data;
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