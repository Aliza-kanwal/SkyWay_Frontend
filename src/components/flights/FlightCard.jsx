import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlane, FaClock, FaUser, FaChair } from 'react-icons/fa';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const FlightCard = ({ flight, searchParams, onSelect }) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    if (onSelect) {
      onSelect(flight);
    } else {
      navigate(`/booking/${flight.id}`, { state: { flight, searchParams } });
    }
  };

  // Format price to PKR
  const formatPKR = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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
            <p className="text-3xl font-bold text-blue-600">{formatPKR(flight.price)}</p>
            <p className="text-sm text-gray-500 mb-2">per person</p>
            <button
              onClick={handleSelect}
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
  );
};

export default FlightCard;