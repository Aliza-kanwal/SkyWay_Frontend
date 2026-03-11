import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../../components/common/HeroSection';
import FlightSearchForm from '../../components/flights/FlightSearchForm';
import { searchFlights } from '../../services/api/flightAPI';
import toast from 'react-hot-toast';
import { FaPlane, FaGlobe, FaShieldAlt, FaClock } from 'react-icons/fa';

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      const results = await searchFlights(searchParams);
      navigate('/search-results', { 
        state: { 
          flights: results, 
          searchParams 
        } 
      });
    } catch (error) {
      toast.error('Failed to search flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FaPlane,
      title: '500+ Daily Flights',
      description: 'Wide selection of flights to choose from'
    },
    {
      icon: FaGlobe,
      title: '150+ Destinations',
      description: 'Fly to major cities around the world'
    },
    {
      icon: FaShieldAlt,
      title: 'Safe & Secure',
      description: 'Your safety is our top priority'
    },
    {
      icon: FaClock,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    }
  ];

  const popularDestinations = [
    { city: 'New York', code: 'JFK', price: '$299', image: '🗽' },
    { city: 'Los Angeles', code: 'LAX', price: '$349', image: '🎬' },
    { city: 'London', code: 'LHR', price: '$399', image: '🇬🇧' },
    { city: 'Tokyo', code: 'HND', price: '$599', image: '🗼' },
    { city: 'Paris', code: 'CDG', price: '$449', image: '🗼' },
    { city: 'Dubai', code: 'DXB', price: '$499', image: '🏜️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50">
      {/* Hero Section with Search */}
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
                onClick={() => handleSearch({ to: dest.code, from: 'ANY' })}
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