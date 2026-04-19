import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
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
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

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
    //{ path: '/deals', label: 'Deals', icon: FaTicketAlt, premium: true },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setShowUserMenu(false);
  };

  // Determine text color based on scroll position and page
  const getTextColor = () => {
    if (isScrolled) return 'text-gray-800';
    return 'text-gray-800';
  };

  const getLogoColor = () => {
    if (isScrolled) return 'text-blue-600';
    return 'text-blue-600';
  };

   const getBackgroundColor = () => {
  if (!isScrolled) return 'bg-transparent';
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
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <FaPlane className={`text-2xl md:text-3xl ${getLogoColor()} transform -rotate-45 
                                   group-hover:rotate-0 transition-all duration-500`} />
                {isHomePage && !isScrolled && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50"
                  />
                )}
              </motion.div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg md:text-xl leading-tight ${getTextColor()}`}>
                  SkyWay
                </span>
                <span className={`text-xs ${isScrolled ? 'text-gray-500' : isHomePage ? 'text-gray-200' : 'text-gray-500'}`}>
                  Premium Airlines
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                const textColor = getTextColor();
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                      active
                        ? isScrolled || !isHomePage
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-white bg-white/20'
                        : isScrolled || !isHomePage
                        ? `${textColor} hover:text-blue-600 hover:bg-blue-50`
                        : `${textColor} hover:text-white hover:bg-white/20`
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <link.icon className="text-sm" />
                      <span>{link.label}</span>
                      {link.premium && (
                        <FaCrown className="text-yellow-400 text-xs" />
                      )}
                    </span>
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute inset-0 rounded-xl ${
                          isScrolled || !isHomePage ? 'bg-blue-50' : 'bg-white/20'
                        } -z-10`}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <button
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20'
                }`}
                title="Change language"
              >
                <FaGlobe className="text-lg" />
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 group"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 
                                    rounded-xl flex items-center justify-center text-white 
                                    font-bold text-sm md:text-lg shadow-lg group-hover:shadow-xl 
                                    transition-all duration-300">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2 h-2 md:w-2.5 md:h-2.5 bg-green-400 
                                     rounded-full border-2 border-white"></span>
                    </div>
                    <span className={`hidden md:block font-medium text-sm ${
                      isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                    }`}>
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
                        className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl 
                                 border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <p className="font-semibold text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 p-3 text-gray-700 
                                     hover:bg-blue-50 rounded-xl transition text-sm"
                          >
                            <FaUser className="text-blue-500" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/my-bookings"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center space-x-3 p-3 text-gray-700 
                                     hover:bg-blue-50 rounded-xl transition text-sm"
                          >
                            <FaTicketAlt className="text-blue-500" />
                            <span>My Bookings</span>
                          </Link>
                        </div>
                        <div className="p-2 border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 p-3 text-red-600 
                                     hover:bg-red-50 rounded-xl transition w-full text-sm"
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl font-medium transition-all duration-300
                              flex items-center space-x-1 md:space-x-2 text-sm ${
                      isScrolled || !isHomePage
                        ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <FaSignInAlt />
                    <span className="hidden md:inline">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-white rounded-xl font-medium hover:shadow-xl 
                             transform hover:scale-105 transition-all duration-300
                             flex items-center space-x-1 md:space-x-2 text-sm"
                  >
                    <FaUserPlus />
                    <span className="hidden md:inline">Sign Up</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 mt-2 shadow-xl"
            >
              <div className="container mx-auto px-4 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition text-sm
                              ${isActive(link.path) 
                                ? 'bg-blue-50 text-blue-600' 
                                : 'text-gray-700 hover:bg-gray-50'
                              }`}
                  >
                    <link.icon className="text-lg" />
                    <span>{link.label}</span>
                    {link.premium && <FaCrown className="text-yellow-400 ml-auto" />}
                  </Link>
                ))}
                
                {/* Mobile user menu items when logged in */}
                {user && (
                  <>
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 p-3 text-gray-700 
                                 hover:bg-blue-50 rounded-xl transition"
                      >
                        <FaUser className="text-blue-500" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/my-bookings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 p-3 text-gray-700 
                                 hover:bg-blue-50 rounded-xl transition"
                      >
                        <FaTicketAlt className="text-blue-500" />
                        <span>My Bookings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 p-3 text-red-600 
                                 hover:bg-red-50 rounded-xl transition"
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className={`h-16 md:h-20`} />
    </>
  );
};

export default Navbar;