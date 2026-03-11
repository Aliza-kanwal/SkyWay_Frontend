import api from './axiosConfig';

export const createBooking = async (bookingData) => {
  // Mock response - replace with actual API call
  return {
    id: Date.now(),
    ...bookingData,
    status: 'confirmed'
  };
};

export const getUserBookings = async () => {
  // Mock response - replace with actual API call
  return [
    {
      id: 1,
      flightNumber: 'AA123',
      from: 'NYC',
      to: 'LAX',
      date: '2024-03-20',
      time: '08:00 AM',
      status: 'confirmed'
    },
    {
      id: 2,
      flightNumber: 'UA456',
      from: 'LAX',
      to: 'SFO',
      date: '2024-03-25',
      time: '02:30 PM',
      status: 'completed'
    }
  ];
};

export const getBookingById = async (id) => {
  // Mock response
  return {
    id,
    flightNumber: 'AA123',
    from: 'NYC',
    to: 'LAX',
    date: '2024-03-20',
    status: 'confirmed'
  };
};

export const cancelBooking = async (id) => {
  // Mock response
  return { success: true, message: 'Booking cancelled successfully' };
};