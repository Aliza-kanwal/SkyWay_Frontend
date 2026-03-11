import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaTicketAlt, 
  FaHeart, 
  FaCog, 
  FaSignOutAlt,
  FaPlane,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaDownload,
  FaPrint,
  FaEllipsisV,
  FaStar,
  FaCreditCard,
  FaBell,
  FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { getUserBookings } from '../../services/api/bookingAPI';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
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
    { id: 'bookings', label: 'My Bookings', icon: FaTicketAlt, count: bookings.length },
    { id: 'favorites', label: 'Favorites', icon: FaHeart, count: 3 },
    { id: 'payments', label: 'Payment Methods', icon: FaCreditCard },
    { id: 'notifications', label: 'Notifications', icon: FaBell, count: 5 },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  const userStats = [
    { label: 'Total Flights', value: '24', icon: FaPlane },
    { label: 'Miles Flown', value: '48,392', icon: FaMapMarkerAlt },
    { label: 'Member Since', value: '2022', icon: FaCalendarAlt },
    { label: 'Tier Status', value: 'Gold', icon: FaStar, highlight: true },
  ];

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'completed');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                   rounded-3xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center 
                        justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-2xl 
                            flex items-center justify-center border-2 border-white/50">
                <span className="text-5xl text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                <p className="text-blue-100">{user?.email}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 
                                 rounded-full text-sm font-semibold">
                    Gold Member
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm 
                                 rounded-full text-sm">
                    ✈️ 48,392 miles
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white/20 backdrop-blur-lg rounded-xl 
                       hover:bg-white/30 transition-all duration-300 
                       flex items-center space-x-2 border border-white/30"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative">
            {userStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 
                          border border-white/20 ${
                  stat.highlight ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <stat.icon className="text-2xl mb-2 text-yellow-400" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl 
                          border border-blue-100/50 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-4 
                           transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className="text-lg" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.count && (
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl 
                          border border-blue-100/50 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 
                                 rounded-xl transition flex items-center space-x-3">
                  <FaDownload className="text-blue-600" />
                  <span>Download Boarding Pass</span>
                </button>
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 
                                 rounded-xl transition flex items-center space-x-3">
                  <FaPrint className="text-blue-600" />
                  <span>Print Itinerary</span>
                </button>
                <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 
                                 rounded-xl transition flex items-center space-x-3">
                  <FaShieldAlt className="text-blue-600" />
                  <span>Add Travel Insurance</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl 
                          border border-blue-100/50 p-6">
              {activeTab === 'bookings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-blue-600 
                                    border-t-transparent rounded-full animate-spin 
                                    mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading your bookings...</p>
                    </div>
                  ) : (
                    <>
                      {/* Upcoming Bookings */}
                      {upcomingBookings.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 
                                     flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 
                                         animate-pulse"></span>
                            Upcoming Flights
                          </h3>
                          <div className="space-y-4">
                            {upcomingBookings.map((booking, index) => (
                              <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-r from-blue-50 to-indigo-50 
                                         rounded-xl p-6 border-l-4 border-blue-600
                                         hover:shadow-lg transition-all cursor-pointer"
                                onClick={() => setSelectedBooking(booking)}
                              >
                                <div className="flex flex-col md:flex-row justify-between">
                                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl 
                                                  flex items-center justify-center">
                                      <FaPlane className="text-2xl text-white 
                                                       transform -rotate-45" />
                                    </div>
                                    <div>
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-bold text-lg">
                                          {booking.from}
                                        </span>
                                        <span>→</span>
                                        <span className="font-bold text-lg">
                                          {booking.to}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-4 
                                                    text-sm text-gray-600">
                                        <span className="flex items-center">
                                          <FaCalendarAlt className="mr-1 text-blue-500" />
                                          {booking.date}
                                        </span>
                                        <span className="flex items-center">
                                          <FaClock className="mr-1 text-blue-500" />
                                          {booking.time}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <span className="px-3 py-1 bg-green-500 text-white 
                                                   rounded-full text-sm">
                                      {booking.status}
                                    </span>
                                    <button className="p-2 hover:bg-white rounded-lg 
                                                     transition">
                                      <FaEllipsisV className="text-gray-500" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Past Bookings */}
                      {pastBookings.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Past Flights
                          </h3>
                          <div className="space-y-4">
                            {pastBookings.map((booking, index) => (
                              <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-md 
                                         transition-all cursor-pointer opacity-75"
                              >
                                <div className="flex flex-col md:flex-row justify-between">
                                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                                    <div className="w-12 h-12 bg-gray-400 rounded-xl 
                                                  flex items-center justify-center">
                                      <FaPlane className="text-2xl text-white 
                                                       transform -rotate-45" />
                                    </div>
                                    <div>
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-bold text-lg">
                                          {booking.from}
                                        </span>
                                        <span>→</span>
                                        <span className="font-bold text-lg">
                                          {booking.to}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-4 
                                                    text-sm text-gray-600">
                                        <span className="flex items-center">
                                          <FaCalendarAlt className="mr-1 text-gray-500" />
                                          {booking.date}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <span className="px-3 py-1 bg-gray-500 text-white 
                                                   rounded-full text-sm">
                                      Completed
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Favorite Routes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-gradient-to-r from-yellow-50 to-orange-50 
                                            rounded-xl p-6 border border-yellow-200">
                        <div className="flex items-center justify-between mb-4">
                          <FaHeart className="text-2xl text-red-500" />
                          <span className="text-sm text-gray-500">Saved on Mar 15</span>
                        </div>
                        <div className="flex items-center space-x-2 text-lg font-bold mb-2">
                          <span>NYC</span>
                          <span>→</span>
                          <span>LAX</span>
                        </div>
                        <p className="text-gray-600 mb-4">Starting from $299</p>
                        <button className="w-full py-2 bg-gradient-to-r from-blue-600 
                                         to-indigo-600 text-white rounded-xl font-medium
                                         hover:shadow-lg transition">
                          Book Now
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-6 border-2 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <FaCreditCard className="text-3xl text-blue-600" />
                          <div>
                            <p className="font-semibold">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-500 text-white 
                                       rounded-full text-sm">Default</span>
                      </div>
                    </div>
                    <button className="w-full py-3 border-2 border-blue-600 text-blue-600 
                                     rounded-xl font-medium hover:bg-blue-600 
                                     hover:text-white transition">
                      + Add New Payment Method
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
                     flex items-center justify-center p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] 
                       overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Booking Details
              </h2>
              {/* Add booking details here */}
              <button
                onClick={() => setSelectedBooking(null)}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl 
                         font-medium hover:bg-blue-700 transition w-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;