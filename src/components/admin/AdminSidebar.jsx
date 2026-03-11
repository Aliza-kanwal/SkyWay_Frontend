import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTachometerAlt, 
  FaPlane, 
  Fabuilding, 
  FaTicketAlt, 
  FaUsers, 
  FaCog,
  FaSignOutAlt,
  FaChartLine
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const AdminSidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin', icon: FaTachometerAlt, label: 'Dashboard', exact: true },
    { path: '/admin/flights', icon: FaPlane, label: 'Manage Flights' },
    { path: '/admin/airports', icon: FaAirport, label: 'Manage Airports' },
    { path: '/admin/bookings', icon: FaTicketAlt, label: 'Manage Bookings' },
    { path: '/admin/users', icon: FaUsers, label: 'Manage Users' },
    { path: '/admin/analytics', icon: FaChartLine, label: 'Analytics' },
    { path: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <p className="text-xs text-gray-400 mt-1">SkyWings Airlines</p>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-xl mb-1 transition-all duration-300
               ${isActive 
                 ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                 : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`text-lg ${isActive ? 'text-white' : ''}`} />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl 
                   text-gray-400 hover:text-white hover:bg-red-600/20 
                   transition-all duration-300"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;