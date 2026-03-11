import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPlane, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApple,
  FaAndroid,
  FaRocket,
  FaShieldAlt,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Press', path: '/press' },
      { label: 'Blog', path: '/blog' },
      { label: 'Sustainability', path: '/sustainability' }
    ],
    support: [
      { label: 'Help Center', path: '/help' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'FAQs', path: '/faqs' },
      { label: 'Travel Advisories', path: '/advisories' },
      { label: 'Accessibility', path: '/accessibility' }
    ],
    legal: [
      { label: 'Terms of Use', path: '/terms' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Security', path: '/security' },
      { label: 'Compliance', path: '/compliance' }
    ]
  };

  const socialLinks = [
    { icon: FaFacebook, url: 'https://facebook.com', color: 'hover:bg-blue-600' },
    { icon: FaTwitter, url: 'https://twitter.com', color: 'hover:bg-sky-500' },
    { icon: FaInstagram, url: 'https://instagram.com', color: 'hover:bg-pink-600' },
    { icon: FaLinkedin, url: 'https://linkedin.com', color: 'hover:bg-blue-700' },
    { icon: FaYoutube, url: 'https://youtube.com', color: 'hover:bg-red-600' }
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: 'Precinct 15,Bahria Town Karachi, Pakistan' },
    { icon: FaPhone, text: '+92 123-4567-890' },
    { icon: FaEnvelope, text: 'support@skywings.com' },
    { icon: FaClock, text: '24/7 Customer Support' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Plane Animation */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute right-0 top-20 opacity-10"
      >
        <FaPlane className="text-8xl transform rotate-45" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <FaPlane className="text-4xl text-blue-400 transform -rotate-45 
                                   group-hover:rotate-0 transition-all duration-500" />
              </motion.div>
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-400 
                               to-indigo-400 bg-clip-text text-transparent">
                  SkyWings
                </span>
                <span className="block text-xs text-gray-400">Premium Airlines</span>
              </div>
            </Link>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Experience the pinnacle of air travel with SkyWings. 
              We're committed to making your journey as comfortable 
              and memorable as your destination.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 text-gray-300 
                           hover:text-blue-400 transition group"
                >
                  <item.icon className="text-blue-400 group-hover:scale-110 
                                      transition-transform" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* App Downloads */}
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 
                         px-4 py-2 rounded-xl transition"
              >
                <FaApple className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">Download on</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 
                         px-4 py-2 rounded-xl transition"
              >
                <FaAndroid className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 capitalize relative inline-block">
                {category}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.2 }}
                />
              </h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-blue-400 transition 
                               flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-blue-400 rounded-full 
                                     opacity-0 group-hover:opacity-100 
                                     transition-opacity" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Awards & Certifications */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center 
                         justify-center text-2xl font-bold text-gray-600 
                         border border-gray-700"
              >
                <FaRocket className="text-blue-400" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Methods & Social Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex space-x-2">
                {[FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    className="w-10 h-6 bg-gray-800 rounded flex items-center 
                             justify-center text-gray-400 hover:text-blue-400 
                             transition cursor-pointer"
                  >
                    <Icon className="text-xl" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <FaShieldAlt className="text-green-500" />
              <span>SSL Secure Payment</span>
              <span className="mx-2">|</span>
              <FaHeart className="text-red-500" />
              <span>100% Safe & Secure</span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center 
                           justify-center text-gray-400 hover:text-white 
                           transition-all duration-300 ${social.color}`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm border-t 
                      border-gray-800 pt-8">
          <p>
            &copy; {currentYear} SkyWings Airlines. All rights reserved. 
            | Proudly serving passengers worldwide since 1995
          </p>
          <p className="mt-2 text-xs">
            SkyWings is a registered trademark. All trademarks are property 
            of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;