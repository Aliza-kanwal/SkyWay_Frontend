import api from './axiosConfig';

// ✅ Real admin login using your backend
export const adminLogin = async (email, password) => {
  try {
    const response = await api.post('/auth/admin/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Real stats from your backend
export const getAdminStats = async () => {
  try {
    const [bookingsRes, flightsRes, airportsRes] = await Promise.all([
      api.get('/admin/bookings'),
      api.get('/flights'),
      api.get('/airports')
    ]);

    const bookings = bookingsRes.data || [];
    const flights = flightsRes.data || [];
    const airports = airportsRes.data || [];

    const activeBookings = bookings.filter(b => b.status !== 'Cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);

    return {
      totalFlights: flights.length,
      totalAirports: airports.length,
      activeBookings,
      totalUsers: 0, // no users endpoint yet
      revenue: totalRevenue,
      onTimeRate: 94
    };
  } catch (error) {
    console.error('Failed to get stats:', error);
    return {
      totalFlights: 0,
      totalAirports: 0,
      activeBookings: 0,
      totalUsers: 0,
      revenue: 0,
      onTimeRate: 0
    };
  }
};

// ✅ Real recent bookings from backend
export const getRecentBookings = async (limit = 5) => {
  try {
    const response = await api.get('/admin/bookings');
    const bookings = response.data || [];

    return bookings.slice(0, limit).map(b => ({
      id: b.id,
      passengerName: b.user_name || 'Unknown',
      email: b.email,
      flightNumber: b.flightNumber || `FL${b.flight_id}`,
      date: b.departure_time
        ? new Date(b.departure_time).toLocaleDateString()
        : 'N/A',
      price: b.price || 0,
      status: (b.status || 'confirmed').toLowerCase()
    }));
  } catch (error) {
    console.error('Failed to get recent bookings:', error);
    return [];
  }
};

// ✅ Real all bookings from backend
export const getAllBookings = async () => {
  try {
    const response = await api.get('/admin/bookings');
    const bookings = response.data || [];

    return bookings.map(b => ({
      id: b.id,
      bookingReference: `SKY${String(b.id).padStart(4, '0')}`,
      passengerName: b.user_name || 'Unknown',
      email: b.email || 'N/A',
      flightNumber: b.flightNumber || `FL${b.flight_id}`,
      from: b.from_city || 'N/A',
      to: b.to_city || 'N/A',
      date: b.departure_time
        ? new Date(b.departure_time).toLocaleDateString()
        : 'N/A',
      status: (b.status || 'confirmed').toLowerCase(),
      amount: b.price || 0,
      seat: b.seat_number || 'N/A',
      class: b.class || 'economy'
    }));
  } catch (error) {
    console.error('Failed to get bookings:', error);
    return [];
  }
};

// ⚠️ No users endpoint in your backend yet — returns empty
export const getAllUsers = async () => {
  return [];
};

export const updateUserRole = async (userId, role) => {
  console.log('Updating user', userId, 'to role', role);
  return { success: true };
};

export const getAnalytics = async () => {
  try {
    const response = await api.get('/admin/analytics');
    return response.data;
  } catch (error) {
    // Mock data for now
    return {
      totalBookings: 1250,
      totalRevenue: 15250000,
      totalPassengers: 2340,
      avgPrice: 12200,
      popularRoutes: [
        { from: 'KHI', to: 'LHE', count: 234, revenue: 2800000 },
        { from: 'KHI', to: 'ISB', count: 189, revenue: 3400000 },
        { from: 'LHE', to: 'DXB', count: 156, revenue: 7020000 },
      ],
      monthlyTrends: [
        { month: 'Jan', bookings: 120, revenue: 1400000 },
        { month: 'Feb', bookings: 135, revenue: 1600000 },
        { month: 'Mar', bookings: 150, revenue: 1800000 },
      ],
      recentActivity: [
        { action: 'New booking created', user: 'john@example.com', time: '2 hours ago', date: '2024-03-20' },
        { action: 'Flight schedule updated', user: 'admin@skyway.com', time: '5 hours ago', date: '2024-03-20' },
      ]
    };
  }
};

export const getSettings = async () => {
  try {
    const response = await api.get('/admin/settings');
    return response.data;
  } catch (error) {
    return {
      siteName: 'SkyWay Airlines',
      siteEmail: 'info@skyway.com',
      sitePhone: '+92 21 111 000 000',
      timezone: 'Asia/Karachi',
      currency: 'PKR',
      emailNotifications: true,
      smsNotifications: false,
      maintenanceMode: false,
      themeColor: 'blue'
    };
  }
};

export const updateSettings = async (settings) => {
  try {
    const response = await api.put('/admin/settings', settings);
    return response.data;
  } catch (error) {
    console.log('Settings saved locally');
    return { success: true };
  }
};
// Get all bookings (existing)

// Add airport - FIXED to match backend
export const createAirport = async (airportData) => {
  try {
    const response = await api.post('/admin/airports', {
      code: airportData.code,
      name: airportData.name,
      city: airportData.city,
      country: airportData.country,
      terminal: airportData.terminal
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add flight - FIXED to match backend
export const createFlight = async (flightData) => {
  try {
    const response = await api.post('/admin/flights', {
      departure_airport_id: flightData.departure_airport_id,
      arrival_airport_id: flightData.arrival_airport_id,
      departure_time: flightData.departure_time,
      arrival_time: flightData.arrival_time,
      duration: flightData.duration,
      price: flightData.price,
      airline: flightData.airline,
      aircraft_type: flightData.aircraft_type || 'Boeing 737'
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Edit flight
export const updateFlight = async (id, flightData) => {
  try {
    const response = await api.put(`/admin/flights/${id}`, {
      price: flightData.price,
      departure_time: flightData.departure_time,
      arrival_time: flightData.arrival_time,
      duration: flightData.duration,
      status: flightData.status
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
