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
  const [flight, setFlight] = useState(location.state?.flight || null);
  const [passengers, setPassengers] = useState(location.state?.passengers || []);
  const [selectedSeats, setSelectedSeats] = useState(location.state?.seats || []);
  const [totalPrice, setTotalPrice] = useState(location.state?.totalPrice || 0);

  useEffect(() => {
    if (!bookingDetails && !flight) {
      navigate('/');
    }
  }, [bookingDetails, flight, navigate]);

  if (!bookingDetails && !flight) return null;

  // Generate booking reference
  const bookingRef = bookingDetails?.id 
    ? `SKY${String(bookingDetails.id).padStart(4, '0')}`
    : `SKY${Math.floor(Math.random() * 10000)}`;

  // Get seat numbers
  const seatNumbers = selectedSeats.length > 0 
    ? selectedSeats.join(', ') 
    : bookingDetails?.seat_number || bookingDetails?.seats?.join(', ') || 'Not assigned';

  // Get payment info
  const paymentMethod = bookingDetails?.paymentMethod || 'Credit Card';
  const cardLast4 = bookingDetails?.cardLast4;
  const totalAmount = totalPrice || bookingDetails?.totalPrice || bookingDetails?.total_amount || 0;

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
          <p className="text-gray-600">
            Your booking reference: <span className="font-mono font-bold text-blue-600">{bookingRef}</span>
          </p>
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
                  <h2 className="text-xl font-bold">
                    {flight?.from || bookingDetails?.from} → {flight?.to || bookingDetails?.to}
                  </h2>
                  <p className="text-gray-600">
                    {flight?.departureTime 
                      ? new Date(flight.departureTime).toLocaleDateString() 
                      : bookingDetails?.date || 'N/A'}
                  </p>
                </div>
              </div>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Confirmed
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-500">Passengers</p>
                <p className="font-semibold">{passengers.length || 1} Passenger(s)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Flight Number</p>
                <p className="font-semibold">{flight?.flightNumber || bookingDetails?.flightNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-semibold">
                  {flight?.departureTime 
                    ? new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : bookingDetails?.departureTime || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Arrival</p>
                <p className="font-semibold">
                  {flight?.arrivalTime 
                    ? new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : bookingDetails?.arrivalTime || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selected Seats</p>
                <p className="font-semibold text-lg text-blue-600">{seatNumbers}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-semibold capitalize">{paymentMethod}</p>
                {cardLast4 && (
                  <p className="text-sm text-gray-500">Card ending in {cardLast4}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Booking Reference</p>
                <p className="font-semibold font-mono text-blue-600">{bookingRef}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Paid</p>
                <p className="font-semibold text-blue-600 text-xl">${totalAmount}</p>
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