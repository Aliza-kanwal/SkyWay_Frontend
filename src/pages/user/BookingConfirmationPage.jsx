import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlane, FaDownload, FaPrint, FaEnvelope } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(location.state?.booking || null);

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/');
    }
  }, [bookingDetails, navigate]);

  if (!bookingDetails) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-white text-5xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your booking reference: <span className="font-mono font-bold text-blue-600">SKY{Math.floor(Math.random() * 10000)}</span></p>
        </motion.div>

        {/* Confirmation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div className="flex items-center space-x-4">
                <FaPlane className="text-4xl text-blue-600" />
                <div>
                  <h2 className="text-xl font-bold">{bookingDetails.from} → {bookingDetails.to}</h2>
                  <p className="text-gray-600">{bookingDetails.date}</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Confirmed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">Passengers</p>
                <p className="font-semibold">{bookingDetails.passengers?.length || 1} Passenger(s)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Flight Number</p>
                <p className="font-semibold">{bookingDetails.flightNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-semibold">{bookingDetails.departureTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Arrival</p>
                <p className="font-semibold">{bookingDetails.arrivalTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seats</p>
                <p className="font-semibold">{bookingDetails.seats?.join(', ') || 'Not assigned'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="font-semibold text-blue-600">${bookingDetails.totalPrice}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <p className="text-sm text-gray-600 mb-2">📧 A confirmation email has been sent to your email address</p>
              <p className="text-sm text-gray-600">📱 You'll receive SMS updates about your flight</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1" onClick={() => window.print()}>
                <FaPrint className="mr-2" /> Print
              </Button>
              <Button variant="outline" className="flex-1">
                <FaDownload className="mr-2" /> Download
              </Button>
              <Button variant="outline" className="flex-1">
                <FaEnvelope className="mr-2" /> Email
              </Button>
            </div>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button variant="primary" onClick={() => navigate('/my-bookings')}>
              View My Bookings
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;