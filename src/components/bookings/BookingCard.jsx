import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEye, FaDownload, FaTimes } from 'react-icons/fa';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ booking, onCancel, onView }) => {
  const navigate = useNavigate();

  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-gray-100 text-gray-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
          {/* Flight Info */}
          <div className="flex items-start space-x-4 mb-4 lg:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 
                          rounded-xl flex items-center justify-center">
              <FaPlane className="text-white text-xl transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xl font-bold">{booking.from}</span>
                <span>→</span>
                <span className="text-xl font-bold">{booking.to}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1 text-blue-500" />
                  {booking.date}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-1 text-blue-500" />
                  {booking.time}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" />
                  {booking.flightNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[booking.status]}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onView ? onView(booking) : navigate(`/booking/${booking.id}`)}
            >
              <FaEye className="mr-1" /> View
            </Button>
            
            {booking.status === 'confirmed' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`/boarding-pass/${booking.id}`, '_blank')}
              >
                <FaDownload className="mr-1" /> Boarding Pass
              </Button>
            )}
            
            {booking.status === 'confirmed' && onCancel && (
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => onCancel(booking)}
              >
                <FaTimes className="mr-1" /> Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Passengers</p>
            <p className="font-medium">{booking.passengers?.length || 1} Passenger(s)</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Seats</p>
            <p className="font-medium">{booking.seats?.join(', ') || 'Not assigned'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Price</p>
            <p className="font-medium text-blue-600">${booking.totalPrice}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BookingCard;