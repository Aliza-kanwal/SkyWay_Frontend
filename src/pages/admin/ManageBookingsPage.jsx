import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { getAllBookings } from '../../services/api/adminAPI';
import { FaSearch } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { loadBookings(); }, []);

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

  const filteredBookings = bookings.filter(b =>
    b.passengerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.flightNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.bookingReference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
          <p className="text-gray-600">View all bookings from real database</p>
        </div>

        <div className="mb-6 relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Search by passenger or flight..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl 
                       focus:border-blue-500 outline-none"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No bookings found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ref</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seat</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-sm text-gray-600">{booking.bookingReference}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{booking.passengerName}</div>
                        <div className="text-xs text-gray-500">{booking.email}</div>
                      </td>
                      <td className="px-4 py-3 font-medium">{booking.from} → {booking.to}</td>
                      <td className="px-4 py-3 text-gray-600">{booking.flightNumber}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{booking.date}</td>
                      <td className="px-4 py-3 text-gray-600">{booking.seat} ({booking.class})</td>
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
                        PKR {Number(booking.amount).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookingsPage;