import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaPlane, FaUsers, FaTicketAlt, FaDollarSign, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { getAnalytics } from '../../services/api/adminAPI';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center ml-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
        </div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Bookings', value: analytics?.totalBookings || 0, icon: FaTicketAlt, color: 'from-purple-500 to-purple-600' },
    { title: 'Total Revenue', value: `PKR ${(analytics?.totalRevenue || 0).toLocaleString()}`, icon: FaDollarSign, color: 'from-green-500 to-green-600' },
    { title: 'Total Passengers', value: analytics?.totalPassengers || 0, icon: FaUsers, color: 'from-blue-500 to-blue-600' },
    { title: 'Avg. Flight Price', value: `PKR ${(analytics?.avgPrice || 0).toLocaleString()}`, icon: FaPlane, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">View your business insights and statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Popular Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaPlane className="text-blue-600" /> Popular Routes
            </h2>
            <div className="space-y-3">
              {analytics?.popularRoutes?.map((route, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium">{route.from} → {route.to}</p>
                    <p className="text-sm text-gray-500">{route.count} bookings</p>
                  </div>
                  <p className="font-semibold text-blue-600">PKR {route.revenue.toLocaleString()}</p>
                </div>
              ))}
              {(!analytics?.popularRoutes || analytics.popularRoutes.length === 0) && (
                <p className="text-gray-500 text-center py-4">No data available</p>
              )}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-600" /> Monthly Trends
            </h2>
            <div className="space-y-3">
              {analytics?.monthlyTrends?.map((month, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium">{month.month}</p>
                    <p className="text-sm text-gray-500">{month.bookings} bookings</p>
                  </div>
                  <p className="font-semibold text-green-600">PKR {month.revenue.toLocaleString()}</p>
                </div>
              ))}
              {(!analytics?.monthlyTrends || analytics.monthlyTrends.length === 0) && (
                <p className="text-gray-500 text-center py-4">No data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-600" /> Recent Activity
          </h2>
          <div className="space-y-3">
            {analytics?.recentActivity?.map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                </div>
                <span className="text-sm text-gray-600">{activity.date}</span>
              </div>
            ))}
            {(!analytics?.recentActivity || analytics.recentActivity.length === 0) && (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;