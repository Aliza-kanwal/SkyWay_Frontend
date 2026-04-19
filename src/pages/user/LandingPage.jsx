import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../../components/common/HeroSection';
import FlightSearchForm from '../../components/flights/FlightSearchForm';
import { searchFlights } from '../../services/api/flightAPI';
import { getAirports } from '../../services/api/airportAPI';
import toast from 'react-hot-toast';
import { FaPlane, FaGlobe, FaShieldAlt, FaClock } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [destinationsLoading, setDestinationsLoading] = useState(true);

  // Load airports on component mount
  useEffect(() => {
    loadAirports();
  }, []);

  const loadAirports = async () => {
  try {
    // ✅ Fetch actual flights from DB instead of hardcoded airports
    const response = await fetch('http://localhost:5000/api/flights');
    const flights = await response.json();

    // Get unique destination airport codes from real flights
    const uniqueDestCodes = [...new Set(flights.map(f => f.to))];

    // Fetch all airports to get their details
    const allAirports = await getAirports();

    // Only show airports that actually have flights going there
    const featured = uniqueDestCodes
      .map(code => allAirports.find(a => a.code === code))
      .filter(Boolean)
      .slice(0, 6); // max 6 destinations

    setAirports(featured);
  } catch (error) {
    console.error('Failed to load airports:', error);
  } finally {
    setDestinationsLoading(false);
  }
};

  // Helper function to get prices based on destination
  const getPriceForDestination = (code) => {
    const prices = {
      'KHI': '15,000',
      'LHE': '12,000',
      'ISB': '18,000',
      'PEW': '19,000',
      'UET': '22,000',
      'MUX': '12,000',
      'SKT': '13,000',
      'LYP': '11,000',
      'DXB': '45,000',
      'AUH': '48,000',
      'DOH': '55,000',
      'MCT': '50,000',
      'RUH': '60,000',
      'DEL': '35,000',
      'IST': '95,000',
    };
    return prices[code] || '25,000';
  };

  // ✅ Fix - receive both results and searchData
const handleSearch = async (results, searchData) => {
  console.log('Results received:', results); // Check console to see if results exist
  console.log('Search data:', searchData);
  
  // Navigate to the search page with results
  navigate('/search', { 
    state: { 
      flights: results, 
      searchParams: searchData 
    } 
  });
};
  // Popular destinations for display
  const popularDestinations = airports.map(airport => ({
    city: airport.city,
    code: airport.code,
    price: `PKR ${getPriceForDestination(airport.code)}`,
    image: getImageForDestination(airport.code)
  }));

  // Helper for destination images
  function getImageForDestination(code) {
    const images = {
      'KHI': '🏖️',
      'LHE': '🏛️',
      'ISB': '🏔️',
      'DXB': '🏜️',
      'IST': '🕌',
      'DOH': '🏙️'
    };
    return images[code] || '✈️';
  }

  const features = [
    { icon: FaPlane, title: '500+ Daily Flights', description: 'Wide selection of flights to choose from' },
    { icon: FaGlobe, title: '150+ Destinations', description: 'Fly to major cities around the world' },
    { icon: FaShieldAlt, title: 'Safe & Secure', description: 'Your safety is our top priority' },
    { icon: FaClock, title: '24/7 Support', description: 'Round-the-clock customer assistance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50">
      <HeroSection />
      
      {/* Search Form - Overlapping Hero */}
      <div className="container mx-auto px-4 -mt-16 relative z-10 mb-16">
        <FlightSearchForm onSearch={handleSearch} loading={loading} />
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4"
        >
          Why Choose Us
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Experience the best in air travel with our premium services
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                       border border-blue-100/50 text-center hover:shadow-2xl 
                       transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 
                            rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Popular Destinations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
          >
            Most booked destinations this month
          </motion.p>

          {destinationsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDestinations.map((dest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl 
                           overflow-hidden border border-blue-100/50 cursor-pointer
                           hover:shadow-2xl transition-all duration-300"
               onClick={async () => {
  try {
    // ✅ Fetch all flights and filter by destination
    const response = await fetch('http://localhost:5000/api/flights');
    const allFlights = await response.json();

    const results = allFlights.filter(f => f.to === dest.code);

    navigate('/search', {
      state: {
        flights: results,
        searchParams: {
          from: 'KHI',
          to: dest.code,
          departureDate: results[0]?.departureTime?.split('T')[0] || '',
          passengers: 1,
          class: 'economy'
        }
      }
    });
  } catch (error) {
    toast.error('Could not load flights for this destination.');
  }
}}
                >
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 
                                relative flex items-center justify-center">
                    <span className="text-6xl opacity-50">{dest.image}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{dest.city}</h3>
                      <span className="text-sm text-gray-500">{dest.code}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {dest.price}
                      <span className="text-sm font-normal text-gray-500"> starting</span>
                    </p>
                    <button className="w-full py-2 bg-gradient-to-r from-blue-600 
                                     to-indigo-600 text-white rounded-xl font-medium
                                     hover:shadow-lg transform hover:scale-105 
                                     transition-all duration-300">
                      View Flights
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Special Offers */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl 
                      p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          
          <div className="relative">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Special Offer
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
            >
              Get 20% off on your first booking. Use code: <span className="font-mono bg-white/20 px-4 py-2 rounded-lg">WELCOME20</span>
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold 
                       text-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => navigate('/search')}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 
                      border border-blue-100/50 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Get Exclusive Deals
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and receive special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl 
                       focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                       transition-all outline-none"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-white rounded-xl font-medium hover:shadow-lg 
                             transform hover:scale-105 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;