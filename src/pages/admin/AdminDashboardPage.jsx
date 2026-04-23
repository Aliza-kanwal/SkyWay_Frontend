import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaBuilding, FaTicketAlt, FaUsers, FaDollarSign, FaClock } from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { getAdminStats, getRecentBookings } from '../../services/api/adminAPI';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, bookingsData] = await Promise.all([
        getAdminStats(),
        getRecentBookings(5)
      ]);
      setStats(statsData);
      setRecentBookings(bookingsData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Flights', value: stats?.totalFlights ?? 0, icon: FaPlane, color: 'from-blue-500 to-blue-600' },
    { title: 'Total Airports', value: stats?.totalAirports ?? 0, icon: FaBuilding, color: 'from-green-500 to-green-600' },
    { title: 'Active Bookings', value: stats?.activeBookings ?? 0, icon: FaTicketAlt, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Revenue', value: `PKR ${(stats?.revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, icon: FaDollarSign, color: 'from-yellow-500 to-yellow-600' },
  ];

  if (loading) return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex items-center justify-center ml-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin!</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl 
                              flex items-center justify-center mb-4`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No bookings yet</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{booking.passengerName}</td>
                    <td className="px-4 py-3 text-gray-600">{booking.flightNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{booking.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-blue-600">
                      PKR {Number(booking.price).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;