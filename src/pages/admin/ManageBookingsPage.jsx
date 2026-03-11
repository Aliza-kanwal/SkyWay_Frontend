import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { FaSearch, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { getAllBookings } from '../../services/api/adminAPI';
import toast from 'react-hot-toast';

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking =>
    booking.passengerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.flightNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.bookingReference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
          <p className="text-gray-600">View and manage all bookings</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search by passenger, flight, or booking reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={FaSearch}
            className="max-w-md"
          />
        </div>

        {/* Bookings Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking Ref</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm">{booking.bookingReference}</td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{booking.passengerName}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{booking.flightNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-blue-600">${booking.amount}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <FaEye />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <FaCheck />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <FaTimes />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManageBookingsPage;