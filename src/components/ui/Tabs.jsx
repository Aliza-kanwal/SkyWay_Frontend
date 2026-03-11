import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl shadow-lg inline-flex ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? 'text-white'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Tabs;