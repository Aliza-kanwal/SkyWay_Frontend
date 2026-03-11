import { useState } from 'react';
import { searchFlights } from '../services/api/flightAPI';

export const useFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (params) => {
    setLoading(true);
    try {
      const data = await searchFlights(params);
      setFlights(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { flights, loading, error, search };
};