import api from './axiosConfig';
import toast from 'react-hot-toast';

export const getUserBookings = async () => {
  try {
    const response = await api.get('/bookings/my');
    console.log('Bookings response:', response.data);

    let bookings = [];
    if (Array.isArray(response.data)) {
      bookings = response.data;
    } else if (response.data.bookings) {
      bookings = response.data.bookings;
    } else if (response.data.data) {
      bookings = response.data.data;
    }

    return bookings.map(booking => ({
      id: booking.id,
      from: booking.from_code,
      to: booking.to_code,
      date: booking.departure_time
        ? new Date(booking.departure_time).toLocaleDateString()
        : 'N/A',
      time: booking.departure_time
        ? new Date(booking.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'N/A',
      flightNumber: booking.flightNumber || 'N/A',
      airline: booking.airline || 'N/A',
      status: (booking.status || 'confirmed').toLowerCase(),
      price: booking.price || 0,
      seat_number: booking.seat_number || 'N/A',
      class: booking.class || 'economy'
    }));
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    toast.error(error.response?.data?.message || 'Failed to load bookings');
    return [];
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    toast.success('Booking confirmed!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Booking failed');
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await api.put(`/bookings/${id}/cancel`);
    toast.success('Booking cancelled successfully');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Cancellation failed');
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};