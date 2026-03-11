import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlane, FaClock, FaCalendar, FaUser, FaChair } from 'react-icons/fa';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flights, searchParams } = location.state || { flights: [], searchParams: {} };
  const [sortBy, setSortBy] = useState('price');
  const [filteredFlights, setFilteredFlights] = useState(flights);

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sorted = [...filteredFlights].sort((a, b) => {
      if (criteria === 'price') return a.price - b.price;
      if (criteria === 'duration') return a.duration - b.duration;
      if (criteria === 'departure') return new Date(a.departureTime) - new Date(b.departureTime);
      return 0;
    });
    setFilteredFlights(sorted);
  };

  const handleSelectFlight = (flight) => {
    navigate(`/booking/${flight.id}`, { state: { flight, searchParams } });
  };

  if (!flights.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Flights Found</h2>
        <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
        <button
          onClick={() => navigate('/search')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-semibold">{searchParams.from}</p>
          </div>
          <FaPlane className="text-blue-600 mx-4" />
          <div>
            <p className="text-sm text-gray-600">To</p>
            <p className="font-semibold">{searchParams.to}</p>
          </div>
          <div className="border-l pl-4 ml-4">
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold">{format(new Date(searchParams.departureDate), 'MMM dd, yyyy')}</p>
          </div>
          <div className="border-l pl-4">
            <p className="text-sm text-gray-600">Passengers</p>
            <p className="font-semibold">{searchParams.passengers}</p>
          </div>
          <div className="border-l pl-4">
            <p className="text-sm text-gray-600">Class</p>
            <p className="font-semibold capitalize">{searchParams.class}</p>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex justify-end mb-4">
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="price">Sort by Price</option>
          <option value="departure">Sort by Departure</option>
          <option value="duration">Sort by Duration</option>
        </select>
      </div>

      {/* Flight List */}
      <div className="space-y-4">
        {filteredFlights.map((flight, index) => (
          <motion.div
            key={flight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                {/* Flight Info */}
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-gray-600">Flight {flight.flightNumber}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm text-gray-600">{flight.airline}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{format(new Date(flight.departureTime), 'HH:mm')}</p>
                      <p className="text-sm text-gray-600">{flight.from}</p>
                    </div>
                    
                    <div className="mx-4 flex-1">
                      <div className="relative">
                        <div className="border-t-2 border-gray-300 w-full"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                          <FaPlane className="text-blue-600 rotate-90" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-1">{flight.duration}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-2xl font-bold">{format(new Date(flight.arrivalTime), 'HH:mm')}</p>
                      <p className="text-sm text-gray-600">{flight.to}</p>
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="text-right ml-6">
                  <p className="text-3xl font-bold text-blue-600">${flight.price}</p>
                  <p className="text-sm text-gray-500 mb-2">per person</p>
                  <button
                    onClick={() => handleSelectFlight(flight)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
                  >
                    Select
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center text-sm text-gray-600">
                <FaClock className="mr-1" />
                <span className="mr-4">{flight.duration}</span>
                <FaUser className="mr-1" />
                <span className="mr-4">{flight.availableSeats} seats left</span>
                <FaChair className="mr-1" />
                <span>Class: {flight.class}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;