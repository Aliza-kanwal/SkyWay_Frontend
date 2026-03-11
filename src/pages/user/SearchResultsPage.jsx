import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlightSearchForm from '../../components/flights/FlightSearchForm'; // Changed from FlightSearch to FlightSearchForm
import { FaPlane, FaClock, FaMapMarkerAlt, FaPercent, FaGift, FaStar } from 'react-icons/fa';

const SearchResultsPage = () => {
  const [activeTab, setActiveTab] = useState('flights');

  const featuredDestinations = [
    { city: 'New York', code: 'JFK', price: '$299', image: '🗽', description: 'The city that never sleeps' },
    { city: 'Paris', code: 'CDG', price: '$399', image: '🗼', description: 'City of love and lights' },
    { city: 'Tokyo', code: 'HND', price: '$599', image: '🗼', description: 'Tradition meets future' },
    { city: 'Dubai', code: 'DXB', price: '$449', image: '🏜️', description: 'Luxury in the desert' },
    { city: 'London', code: 'LHR', price: '$379', image: '🇬🇧', description: 'History and culture' },
    { city: 'Sydney', code: 'SYD', price: '$699', image: '🦘', description: 'Harbor city beauty' },
  ];

  const deals = [
    { id: 1, title: 'Early Bird Special', discount: '20% OFF', code: 'EARLY20', valid: 'Valid until Mar 30' },
    { id: 2, title: 'Weekend Getaway', discount: '15% OFF', code: 'WEEKEND15', valid: 'Valid for Fri-Sun flights' },
    { id: 3, title: 'Student Discount', discount: '25% OFF', code: 'STUDENT25', valid: 'Valid with valid ID' },
    { id: 4, title: 'Family Package', discount: 'Buy 3 Get 1 Free', code: 'FAMILY4', valid: 'For groups of 4+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            Find Your Perfect Flight
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Discover amazing destinations at the best prices. Book now and save big!
          </motion.p>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1"/>
            <path d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 82.5C840 90 960 105 1080 112.5C1200 120 1320 120 1380 120L1440 120V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.2"/>
          </svg>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <FlightSearchForm /> {/* Using the renamed component */}
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg inline-flex">
            {[
              { id: 'flights', label: 'Featured Flights', icon: FaPlane },
              { id: 'deals', label: 'Special Deals', icon: FaPercent },
              { id: 'destinations', label: 'Destinations', icon: FaMapMarkerAlt }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium 
                         transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="text-lg" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'flights' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDestinations.map((dest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden 
                           border border-blue-100/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-50">{dest.image}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{dest.city}</h3>
                        <p className="text-sm text-gray-500">{dest.code}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">{dest.price}</span>
                        <p className="text-xs text-gray-500">starting from</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{dest.description}</p>
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                                     text-white rounded-xl font-medium hover:shadow-lg 
                                     transform hover:scale-105 transition-all duration-300">
                      View Flights
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'deals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 
                           border border-blue-100/50 hover:shadow-2xl transition-all duration-300
                           relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br 
                                from-yellow-400 to-orange-500 rounded-full -mr-16 -mt-16 
                                opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{deal.title}</h3>
                        <p className="text-3xl font-bold text-transparent bg-clip-text 
                                   bg-gradient-to-r from-blue-600 to-indigo-600">
                          {deal.discount}
                        </p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-xl">
                        <FaGift className="text-2xl text-yellow-600" />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl mb-4">
                      <p className="text-sm font-mono text-blue-800 mb-1">Promo Code:</p>
                      <p className="text-2xl font-bold text-blue-600 tracking-wider">{deal.code}</p>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4 flex items-center">
                      <FaClock className="mr-2 text-blue-500" />
                      {deal.valid}
                    </p>
                    
                    <button className="w-full py-3 border-2 border-blue-600 text-blue-600 
                                     rounded-xl font-medium hover:bg-blue-600 hover:text-white 
                                     transition-all duration-300">
                      Copy Code
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDestinations.map((dest, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 
                                opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center 
                                text-white p-6 text-center">
                    <span className="text-7xl mb-4 transform group-hover:scale-110 
                                   transition-transform">{dest.image}</span>
                    <h3 className="text-3xl font-bold mb-2">{dest.city}</h3>
                    <p className="text-lg mb-2">{dest.code}</p>
                    <p className="text-sm text-blue-100 mb-4">{dest.description}</p>
                    <p className="text-2xl font-bold">from {dest.price}</p>
                    <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-xl 
                                     font-medium opacity-0 group-hover:opacity-100 
                                     transform translate-y-4 group-hover:translate-y-0 
                                     transition-all duration-300">
                      Explore
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchResultsPage;