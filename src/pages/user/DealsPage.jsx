import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPercent, FaGift, FaClock, FaTag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getDeals } from '../../services/api/dealsAPI';
import toast from 'react-hot-toast';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const data = await getDeals();
      setDeals(data);
    } catch (error) {
      console.error('Failed to load deals:', error);
      toast.error('Could not load deals');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Promo code copied!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!deals.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">No Active Deals</h1>
          <p className="text-gray-600 mb-8">Check back later for exciting offers!</p>
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Exclusive Flight Deals
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Save big on your next adventure with our limited-time offers
          </motion.p>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-4"
        >
          Current Offers
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Grab these amazing offers before they expire
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                       border border-blue-100/50 hover:shadow-2xl transition-all 
                       duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
                            from-blue-500 to-indigo-600 rounded-full -mr-16 -mt-16 
                            opacity-10 group-hover:opacity-20 transition-opacity"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm text-blue-600 font-semibold 
                                   uppercase tracking-wider">Limited Time</span>
                    <h3 className="text-xl font-bold text-gray-800 mt-1">{deal.title}</h3>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 
                                p-3 rounded-xl">
                    <FaPercent className="text-white text-xl" />
                  </div>
                </div>
                
                <p className="text-4xl font-bold text-transparent bg-clip-text 
                           bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                  {deal.discount}
                </p>
                
                <p className="text-gray-600 mb-4">{deal.description}</p>
                
                <div className="bg-blue-50 p-4 rounded-xl mb-4">
                  <p className="text-sm font-mono text-blue-800 mb-1">Promo Code:</p>
                  <p className="text-2xl font-bold text-blue-600 tracking-wider">
                    {deal.code}
                  </p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2 flex items-center">
                    <FaClock className="mr-2 text-blue-500" />
                    {deal.valid}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {deal.destinations?.map((dest, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 
                                             rounded-lg text-xs">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => copyToClipboard(deal.code)}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 
                             to-indigo-600 text-white rounded-xl font-medium 
                             hover:shadow-lg transform hover:scale-105 
                             transition-all duration-300"
                  >
                    Copy Code
                  </button>
                  <Link 
                    to="/search"
                    className="px-4 py-3 border-2 border-blue-600 
                             text-blue-600 rounded-xl hover:bg-blue-600 
                             hover:text-white transition-all duration-300"
                  >
                    <FaTag />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 
                      text-center text-white relative overflow-hidden">
          <div className="relative">
            <FaGift className="text-6xl mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">Get Exclusive Deals</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Subscribe to receive special offers and discounts directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border 
                         border-white/20 text-white placeholder-white/60 
                         focus:outline-none focus:ring-2 focus:ring-white/50 
                         backdrop-blur-sm"
              />
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl 
                               font-semibold hover:shadow-xl transition-all 
                               duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsPage;