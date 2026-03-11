import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlane, FaClock, FaCalendarAlt, FaUser, FaChair, FaWifi, FaUtensils, FaBatteryFull } from 'react-icons/fa';
import { getFlightById } from '../../services/api/flightAPI';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import toast from 'react-hot-toast';

const FlightDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlightDetails();
  }, [id]);

  const loadFlightDetails = async () => {
    try {
      const data = await getFlightById(id);
      setFlight(data);
    } catch (error) {
      toast.error('Failed to load flight details');
    } finally {
      setLoading(false);
    }
  };

  const amenities = [
    { icon: FaWifi, label: 'Free Wi-Fi' },
    { icon: FaUtensils, label: 'Complimentary Meals' },
    { icon: FaBatteryFull, label: 'USB Ports' },
    { icon: FaChair, label: 'Extra Legroom' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Flight Not Found</h2>
          <Button onClick={() => navigate('/search')}>Back to Search</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          ← Back to Results
        </button>

        {/* Flight Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-blue-100 mb-2">{flight.airline} • Flight {flight.flightNumber}</p>
              <h1 className="text-4xl font-bold mb-4">{flight.from} → {flight.to}</h1>
              <div className="flex items-center space-x-6">
                <span className="flex items-center"><FaCalendarAlt className="mr-2" /> {new Date(flight.departureTime).toLocaleDateString()}</span>
                <span className="flex items-center"><FaClock className="mr-2" /> {flight.duration}</span>
              </div>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <p className="text-3xl font-bold">${flight.price}</p>
              <p className="text-blue-100">per person</p>
              <Button 
                variant="secondary" 
                className="mt-4 bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate(`/booking/${flight.id}`)}
              >
                Book Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Flight Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Flight Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Flight Schedule</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="text-2xl font-bold">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-gray-600">{flight.from}</p>
                  </div>
                  <FaPlane className="text-blue-600 text-2xl rotate-90" />
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="text-2xl font-bold">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-gray-600">{flight.to}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{flight.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Aircraft</p>
                    <p className="font-semibold">Boeing 787-9</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenities.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-blue-50 rounded-xl">
                    <item.icon className="text-3xl text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Fare Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Fare Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-semibold">${flight.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-semibold">$45</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${flight.price + 45}</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="primary" 
                fullWidth 
                onClick={() => navigate(`/booking/${flight.id}`)}
              >
                Continue to Book
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Baggage Allowance</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cabin</span>
                  <span className="font-semibold">1 piece (7kg)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Checked</span>
                  <span className="font-semibold">2 pieces (23kg each)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage;