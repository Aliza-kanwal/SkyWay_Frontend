import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaBuilding, 
  FaTicketAlt, 
  FaUsers, 
  FaDollarSign,
  FaClock
} from 'react-icons/fa';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatsCard from '../../components/admin/StatsCard';
import Card from '../../components/ui/Card';
import { getAdminStats, getRecentBookings } from '../../services/api/adminAPI';
import toast from 'react-hot-toast';

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
      console.error('Failed to load dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Total Flights', value: stats?.totalFlights || '156', icon: FaPlane, color: 'blue', trend: 12 },
    { title: 'Total Airports', value: stats?.totalAirports || '42', icon: FaBuilding, color: 'green', trend: 5 },
    { title: 'Active Bookings', value: stats?.activeBookings || '2,345', icon: FaTicketAlt, color: 'purple', trend: 8 },
    { title: 'Registered Users', value: stats?.totalUsers || '8,901', icon: FaUsers, color: 'orange', trend: 15 },
    { title: 'Revenue (MTD)', value: `$${stats?.revenue?.toLocaleString() || '456,789'}`, icon: FaDollarSign, color: 'yellow', trend: 23 },
    { title: 'On-time Flights', value: `${stats?.onTimeRate || '94'}%`, icon: FaClock, color: 'red', trend: 2 }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8 ml-64">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin. Here's what's happening today.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-500' :
                      booking.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium">{booking.passengerName}</p>
                      <p className="text-sm text-gray-500">{booking.flightNumber} • {booking.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">${booking.price}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Popular Routes */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Routes</h2>
            <div className="space-y-4">
              {[
                { route: 'NYC → LAX', bookings: 234, revenue: 69800 },
                { route: 'LHR → JFK', bookings: 189, revenue: 75600 },
                { route: 'DXB → LHR', bookings: 156, revenue: 62400 },
                { route: 'SYD → HND', bookings: 123, revenue: 49200 },
              ].map((route, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium">{route.route}</p>
                    <p className="text-sm text-gray-500">{route.bookings} bookings this month</p>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    ${route.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;