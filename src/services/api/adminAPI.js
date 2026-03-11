import api from './axiosConfig';

export const adminLogin = async (email, password) => {
  try {
    // Mock response for testing
    if (email === 'admin@skywings.com' && password === 'admin123') {
      return {
        token: 'admin-token-' + Date.now(),
        admin: {
          id: 1,
          name: 'Admin User',
          email,
          role: 'super_admin'
        }
      };
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAdminStats = async () => {
  return {
    totalFlights: 156,
    totalAirports: 42,
    activeBookings: 2345,
    totalUsers: 8901,
    revenue: 456789,
    onTimeRate: 94
  };
};

export const getRecentBookings = async (limit = 5) => {
  return [
    { id: 1, passengerName: 'John Doe', flightNumber: 'AA123', date: '2024-03-15', price: 299, status: 'confirmed' },
    { id: 2, passengerName: 'Jane Smith', flightNumber: 'UA456', date: '2024-03-14', price: 349, status: 'confirmed' },
    { id: 3, passengerName: 'Bob Johnson', flightNumber: 'DL789', date: '2024-03-14', price: 279, status: 'pending' },
    { id: 4, passengerName: 'Alice Brown', flightNumber: 'BA001', date: '2024-03-13', price: 399, status: 'confirmed' },
    { id: 5, passengerName: 'Charlie Wilson', flightNumber: 'EK202', date: '2024-03-13', price: 449, status: 'cancelled' },
  ].slice(0, limit);
};

export const getAllBookings = async () => {
  return [
    { id: 1, bookingReference: 'SKY123', passengerName: 'John Doe', email: 'john@example.com', flightNumber: 'AA123', date: '2024-03-15', status: 'confirmed', amount: 299 },
    { id: 2, bookingReference: 'SKY456', passengerName: 'Jane Smith', email: 'jane@example.com', flightNumber: 'UA456', date: '2024-03-14', status: 'confirmed', amount: 349 },
    { id: 3, bookingReference: 'SKY789', passengerName: 'Bob Johnson', email: 'bob@example.com', flightNumber: 'DL789', date: '2024-03-14', status: 'pending', amount: 279 },
    { id: 4, bookingReference: 'SKY001', passengerName: 'Alice Brown', email: 'alice@example.com', flightNumber: 'BA001', date: '2024-03-13', status: 'confirmed', amount: 399 },
    { id: 5, bookingReference: 'SKY002', passengerName: 'Charlie Wilson', email: 'charlie@example.com', flightNumber: 'EK202', date: '2024-03-13', status: 'cancelled', amount: 449 },
  ];
};

export const getAllUsers = async () => {
  return [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinedDate: '2023-01-15', totalBookings: 5, role: 'user' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinedDate: '2023-02-20', totalBookings: 8, role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joinedDate: '2023-03-10', totalBookings: 3, role: 'agent' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', joinedDate: '2023-04-05', totalBookings: 12, role: 'admin' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', joinedDate: '2023-05-12', totalBookings: 2, role: 'user' },
  ];
};

export const updateUserRole = async (userId, role) => {
  console.log('Updating user', userId, 'to role', role);
  return { success: true };
};