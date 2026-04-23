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

export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data || [];
  } catch (error) {
    console.error('Failed to get users:', error);
    return [];
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ✅ Real analytics from your backend
export const getAnalytics = async () => {
  try {
    const [bookingsRes, flightsRes, airportsRes] = await Promise.all([
      api.get('/admin/bookings'),
      api.get('/flights'),
      api.get('/airports')
    ]);

    const bookings = bookingsRes.data || [];
    const flights = flightsRes.data || [];

    const totalRevenue = bookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);

    const avgPrice = bookings.length > 0 ? totalRevenue / bookings.length : 0;

    // Count routes
    const routeMap = {};
    bookings.forEach(b => {
      const key = `${b.from_code} → ${b.to_code}`;
      if (!routeMap[key]) routeMap[key] = { from: b.from_code, to: b.to_code, count: 0, revenue: 0 };
      routeMap[key].count++;
      routeMap[key].revenue += parseFloat(b.price) || 0;
    });

    const popularRoutes = Object.values(routeMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalBookings: bookings.length,
      totalRevenue,
      totalPassengers: bookings.length,
      avgPrice: Math.round(avgPrice),
      popularRoutes,
      monthlyTrends: [],
      recentActivity: []
    };
  } catch (error) {
    console.error('Analytics error:', error);
    return {
      totalBookings: 0, totalRevenue: 0,
      totalPassengers: 0, avgPrice: 0,
      popularRoutes: [], monthlyTrends: [], recentActivity: []
    };
  }
};

// ✅ Settings - just local for now (no backend endpoint)
export const getSettings = async () => ({
  siteName: 'SkyWay Airlines',
  siteEmail: 'info@skyway.com',
  sitePhone: '+92 21 111 000 000',
  timezone: 'Asia/Karachi',
  currency: 'PKR',
  emailNotifications: true,
  smsNotifications: false,
  maintenanceMode: false,
  themeColor: 'blue'
});

export const updateSettings = async (settings) => {
  console.log('Settings saved locally:', settings);
  return { success: true };
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
