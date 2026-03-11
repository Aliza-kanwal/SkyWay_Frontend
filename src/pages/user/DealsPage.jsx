import React from 'react';
import { motion } from 'framer-motion';
import { FaPercent, FaGift, FaClock, FaTag, FaPlane, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DealsPage = () => {
  const deals = [
    {
      id: 1,
      title: 'Early Bird Special',
      discount: '20% OFF',
      code: 'EARLY20',
      valid: 'Valid until Mar 30',
      description: 'Book at least 30 days in advance',
      destinations: ['New York', 'London', 'Tokyo']
    },
    {
      id: 2,
      title: 'Weekend Getaway',
      discount: '15% OFF',
      code: 'WEEKEND15',
      valid: 'Valid for Fri-Sun flights',
      description: 'Perfect for short trips',
      destinations: ['Paris', 'Rome', 'Barcelona']
    },
    {
      id: 3,
      title: 'Student Discount',
      discount: '25% OFF',
      code: 'STUDENT25',
      valid: 'Valid with valid ID',
      description: 'For students with valid ID',
      destinations: ['Boston', 'Chicago', 'San Francisco']
    },
    {
      id: 4,
      title: 'Family Package',
      discount: 'Buy 3 Get 1 Free',
      code: 'FAMILY4',
      valid: 'For groups of 4+',
      description: 'Perfect for family vacations',
      destinations: ['Orlando', 'Los Angeles', 'Miami']
    },
    {
      id: 5,
      title: 'Business Class Upgrade',
      discount: '30% OFF',
      code: 'BUSINESS30',
      valid: 'Limited time offer',
      description: 'Experience luxury at economy price',
      destinations: ['Dubai', 'Singapore', 'Hong Kong']
    },
    {
      id: 6,
      title: 'Last Minute Deals',
      discount: 'Up to 40% OFF',
      code: 'LASTMINUTE',
      valid: 'Book within 7 days',
      description: 'Great savings on departing flights',
      destinations: ['Las Vegas', 'New Orleans', 'Nashville']
    }
  ];

  const featuredDestinations = [
    { city: 'Paris', price: '$399', image: '🗼', deal: '20% OFF' },
    { city: 'Tokyo', price: '$599', image: '🗼', deal: '25% OFF' },
    { city: 'Dubai', price: '$449', image: '🏜️', deal: '15% OFF' },
    { city: 'New York', price: '$299', image: '🗽', deal: '30% OFF' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50">
      {/* Hero Section - Using blue gradient like other pages */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
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

        {/* Wave Divider - Matching other pages */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1"/>
            <path d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 82.5C840 90 960 105 1080 112.5C1200 120 1320 120 1380 120L1440 120V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.2"/>
          </svg>
        </div>
      </div>

      {/* Featured Deals */}
      <div className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Hot Deals
          </span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
        >
          Grab these amazing offers before they're gone
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
                    {deal.destinations.map((dest, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 
                                             rounded-lg text-xs">
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 
                                   to-indigo-600 text-white rounded-xl font-medium 
                                   hover:shadow-lg transform hover:scale-105 
                                   transition-all duration-300">
                    Book Now
                  </button>
                  <button className="px-4 py-3 border-2 border-blue-600 
                                   text-blue-600 rounded-xl hover:bg-blue-600 
                                   hover:text-white transition-all duration-300">
                    <FaTag />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Destination Deals */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-4"
          >
            Destination Deals
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
          >
            Popular destinations with exclusive discounts
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((dest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 
                              to-indigo-600 opacity-90 group-hover:opacity-100 
                              transition-opacity"></div>
                <div className="absolute inset-0 flex flex-col items-center 
                              justify-center text-white p-6 text-center">
                  <span className="text-7xl mb-4 transform group-hover:scale-110 
                                 transition-transform">{dest.image}</span>
                  <h3 className="text-3xl font-bold mb-2">{dest.city}</h3>
                  <p className="text-2xl font-bold mb-2">{dest.price}</p>
                  <p className="text-lg bg-white/20 px-4 py-1 rounded-full">
                    {dest.deal}
                  </p>
                  <button className="mt-4 px-6 py-2 bg-white text-blue-600 
                                   rounded-xl font-medium opacity-0 
                                   group-hover:opacity-100 transform 
                                   translate-y-4 group-hover:translate-y-0 
                                   transition-all duration-300">
                    View Deal
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section - Using blue gradient */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 
                      text-center text-white relative overflow-hidden">
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