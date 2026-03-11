import React from 'react';
import { motion } from 'framer-motion';
import { FaPlane, FaGlobe, FaShieldAlt, FaClock } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.3'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Your Journey Begins
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              With Us
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Discover the world with unparalleled comfort and convenience. 
            Book your next adventure today.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: FaPlane, value: '500+', label: 'Daily Flights' },
              { icon: FaGlobe, value: '150+', label: 'Destinations' },
              { icon: FaShieldAlt, value: '99.9%', label: 'Safety Rate' },
              { icon: FaClock, value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="text-4xl mx-auto mb-3 text-yellow-400" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8"
              onClick={() => window.scrollTo({ top: document.getElementById('search-section').offsetTop, behavior: 'smooth' })}
            >
              Search Flights
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-xl backdrop-blur-sm transition-all"
            >
              Explore Deals
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1"/>
          <path d="M0 120L60 112.5C120 105 240 90 360 82.5C480 75 600 75 720 82.5C840 90 960 105 1080 112.5C1200 120 1320 120 1380 120L1440 120V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.2"/>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;