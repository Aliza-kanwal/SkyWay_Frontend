import { useState } from 'react';
import { getUserBookings, createBooking, cancelBooking } from '../services/api/bookingAPI';

const useBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getUserBookings();
      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  return { bookings, loading, fetchBookings, createBooking, cancelBooking };
};

export default useBooking;