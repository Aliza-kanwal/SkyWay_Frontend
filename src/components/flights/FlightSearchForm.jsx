import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaPlaneDeparture, 
  FaPlaneArrival, 
  FaCalendarAlt, 
  FaUsers,
  FaExchangeAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { searchFlights } from '../../services/api/flightAPI';
import toast from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";

const FlightSearch = () => {
  const navigate = useNavigate();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departureDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    passengers: 1,
    class: 'economy'
  });

  const [popularDestinations] = useState([
    { city: 'New York', code: 'JFK', image: '🗽' },
    { city: 'Los Angeles', code: 'LAX', image: '🎬' },
    { city: 'London', code: 'LHR', image: '🇬🇧' },
    { city: 'Tokyo', code: 'HND', image: '🗼' },
    { city: 'Paris', code: 'CDG', image: '🗼' },
    { city: 'Dubai', code: 'DXB', image: '🏜️' }
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.from || !searchParams.to) {
      toast.error('Please select departure and arrival cities');
      return;
    }

    if (searchParams.from === searchParams.to) {
      toast.error('Departure and arrival cities must be different');
      return;
    }

    setLoading(true);
    try {
      const results = await searchFlights(searchParams);
      navigate('/search-results', { 
        state: { 
          flights: results, 
          searchParams,
          isRoundTrip 
        } 
      });
    } catch (error) {
      toast.error('Failed to search flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div id="search-section" className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Where would you like to go?
          </h2>
          <p className="text-gray-600 text-lg">
            Discover amazing destinations at the best prices
          </p>
        </div>

        {/* Search Form */}
        <div className="premium-card p-8">
          {/* Trip Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-2xl inline-flex">
              {['one-way', 'round-trip'].map((type) => (
                <button
                  key={type}
                  onClick={() => setIsRoundTrip(type === 'round-trip')}
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                    (type === 'round-trip' && isRoundTrip) || (type === 'one-way' && !isRoundTrip)
                      ? 'bg-white text-blue-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPlaneDeparture className="inline mr-2 text-blue-500" />
                  From
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Departure city"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value.toUpperCase() }))}
                    className="premium-input pl-12"
                  />
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              
              {/* Swap Button */}
              <button
                type="button"
                onClick={swapLocations}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
                         bg-white rounded-full p-3 shadow-lg hover:shadow-xl 
                         transition-all duration-300 z-10 hidden md:block"
              >
                <FaExchangeAlt className="text-blue-600" />
              </button>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaPlaneArrival className="inline mr-2 text-blue-500" />
                  To
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Arrival city"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value.toUpperCase() }))}
                    className="premium-input pl-12"
                  />
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Dates and Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2 text-blue-500" />
                  Departure
                </label>
                <DatePicker
                  selected={searchParams.departureDate}
                  onChange={(date) => setSearchParams(prev => ({ ...prev, departureDate: date }))}
                  minDate={new Date()}
                  className="premium-input"
                  dateFormat="MMM dd, yyyy"
                />
              </div>
              
              <AnimatePresence>
                {isRoundTrip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2 text-blue-500" />
                      Return
                    </label>
                    <DatePicker
                      selected={searchParams.returnDate}
                      onChange={(date) => setSearchParams(prev => ({ ...prev, returnDate: date }))}
                      minDate={searchParams.departureDate}
                      className="premium-input"
                      dateFormat="MMM dd, yyyy"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUsers className="inline mr-2 text-blue-500" />
                  Passengers
                </label>
                <select
                  value={searchParams.passengers}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, passengers: parseInt(e.target.value) }))}
                  className="premium-input"
                >
                  {[1,2,3,4,5,6,7,8,9].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class
                </label>
                <select
                  value={searchParams.class}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, class: e.target.value }))}
                  className="premium-input"
                >
                  <option value="economy">Economy</option>
                  <option value="premium-economy">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full text-lg disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaSearch className="mr-2" />
                  Search Flights
                </span>
              )}
            </motion.button>
          </form>

          {/* Popular Destinations */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularDestinations.map((dest, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchParams(prev => ({ ...prev, to: dest.code }))}
                  className="p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-all duration-300"
                >
                  <span className="text-3xl mb-2 block">{dest.image}</span>
                  <span className="font-medium">{dest.city}</span>
                  <span className="text-sm text-gray-500 block">{dest.code}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlightSearch;