import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaEye, FaDownload } from 'react-icons/fa';
import { getUserBookings } from '../../services/api/bookingAPI';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import { useNavigate } from 'react-router-dom';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') return booking.status === 'confirmed';
    if (activeTab === 'past') return booking.status === 'completed';
    return booking.status === 'cancelled';
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">Ready for your next adventure?</p>
            <Button variant="primary" onClick={() => navigate('/search')}>
              Search Flights
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FaPlane className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xl font-bold">{booking.from}</span>
                          <span>→</span>
                          <span className="text-xl font-bold">{booking.to}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center"><FaCalendarAlt className="mr-1" /> {booking.date}</span>
                          <span className="flex items-center"><FaClock className="mr-1" /> {booking.time}</span>
                          <span className="flex items-center"><FaMapMarkerAlt className="mr-1" /> {booking.flightNumber}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/booking/${booking.id}`)}
                      >
                        <FaEye className="mr-1" /> View
                      </Button>
                      <Button variant="outline" size="sm">
                        <FaDownload className="mr-1" /> Boarding Pass
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;