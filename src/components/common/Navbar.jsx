import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlane, 
  FaUser, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaUserPlus,
  FaSearch,
  FaHome,
  FaInfoCircle,
  FaTicketAlt,
  FaBell,
  FaBars,
  FaTimes,
  FaCrown,
  FaGlobe
} from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, text: 'Flight to NYC delayed by 30min', time: '5 min ago', unread: true },
    { id: 2, text: 'Check-in now open for your flight', time: '1 hour ago', unread: true },
    { id: 3, text: 'Special offer: 20% off business class', time: '2 hours ago', unread: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/search', label: 'Flights', icon: FaSearch },
    { path: '/about', label: 'About', icon: FaInfoCircle },
    { path: '/deals', label: 'Deals', icon: FaTicketAlt, premium: true },
  ];

  const isActive = (path) => location.pathname === path;

  const getBackgroundColor = () => {
    if (isScrolled) return 'bg-white/95 backdrop-blur-lg shadow-2xl';
    return 'bg-white shadow-md';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-500 ${getBackgroundColor()}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-4 md:py-5">
            {/* Logo - Larger */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <FaPlane className="text-4xl md:text-5xl text-blue-600 transform -rotate-45 
                                   group-hover:rotate-0 transition-all duration-500" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl md:text-3xl text-gray-800 leading-tight">
                  SkyWings
                </span>
                <span className="text-sm text-gray-500 tracking-wide">
                  Premium Airlines
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Larger */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-5 py-3 rounded-xl font-medium transition-all duration-300 group ${
                      active
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className="flex items-center space-x-2 text-base">
                      <link.icon className="text-lg" />
                      <span>{link.label}</span>
                      {link.premium && (
                        <FaCrown className="text-yellow-400 text-sm" />
                      )}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-blue-50 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section - Larger */}
            <div className="flex items-center space-x-4">
              {/* Language Selector - Larger */}
              <button
                className="p-3 rounded-xl transition-all duration-300 text-gray-600 
                         hover:text-blue-600 hover:bg-blue-50"
              >
                <FaGlobe className="text-xl" />
              </button>

              {/* Notifications - Larger */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-3 rounded-xl transition-all duration-300 relative 
                           text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  <FaBell className="text-xl" />
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl 
                               border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <h3 className="font-semibold text-lg">Notifications</h3>
                        <p className="text-sm opacity-90">You have {notifications.filter(n => n.unread).length} unread</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 
                                      transition cursor-pointer ${notif.unread ? 'bg-blue-50/50' : ''}`}
                          >
                            <p className="text-base text-gray-800">{notif.text}</p>
                            <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        ))}
                      </div>
                      <button className="w-full p-4 text-center text-base text-blue-600 
                                       hover:bg-blue-50 transition font-medium">
                        View All
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 group"
                  >
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 
                                    rounded-xl flex items-center justify-center text-white 
                                    font-bold text-xl shadow-lg group-hover:shadow-xl 
                                    transition-all duration-300">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 
                                     rounded-full border-2 border-white"></span>
                    </div>
                    <span className="hidden md:block font-medium text-gray-700 text-base">
                      {user.name?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl 
                                 border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-5 border-b border-gray-100">
                          <p className="font-semibold text-gray-800 text-lg">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="p-3">
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 p-3 text-gray-700 
                                     hover:bg-blue-50 rounded-xl transition text-base"
                          >
                            <FaUser className="text-blue-500 text-lg" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/bookings"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 p-3 text-gray-700 
                                     hover:bg-blue-50 rounded-xl transition text-base"
                          >
                            <FaTicketAlt className="text-blue-500 text-lg" />
                            <span>My Bookings</span>
                          </Link>
                        </div>
                        <div className="p-3 border-t border-gray-100">
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center space-x-3 p-3 text-red-600 
                                     hover:bg-red-50 rounded-xl transition w-full text-base"
                          >
                            <FaSignOutAlt className="text-lg" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-5 py-3 rounded-xl font-medium transition-all duration-300
                              flex items-center space-x-2 text-gray-700 
                              hover:text-blue-600 hover:bg-blue-50 text-base"
                  >
                    <FaSignInAlt className="text-lg" />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-white rounded-xl font-medium hover:shadow-xl 
                             transform hover:scale-105 transition-all duration-300
                             flex items-center space-x-2 text-base"
                  >
                    <FaUserPlus className="text-lg" />
                    <span className="hidden md:inline">Sign Up</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button - Larger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl transition-all duration-300
                         text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Larger */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
            >
              <div className="container mx-auto px-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition text-lg
                              ${isActive(link.path) 
                                ? 'bg-blue-50 text-blue-600' 
                                : 'text-gray-700 hover:bg-gray-50'
                              }`}
                  >
                    <link.icon className="text-xl" />
                    <span>{link.label}</span>
                    {link.premium && <FaCrown className="text-yellow-400 ml-auto text-lg" />}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar - Larger */}
      <div className="h-24" />
    </>
  );
};

export default Navbar;