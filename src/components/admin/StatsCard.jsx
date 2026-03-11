import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const StatsCard = ({ title, value, icon: Icon, color = 'blue', trend, trendValue }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600'
  };

  const iconColors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 relative overflow-hidden group">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colors[color]} opacity-0 
                        group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">{title}</p>
              <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconColors[color]}`}>
              <Icon className="text-2xl" />
            </div>
          </div>

          {trend && (
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}

          {/* Progress Bar (optional) */}
          {trendValue && (
            <div className="mt-4">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${trendValue}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full bg-gradient-to-r ${colors[color]}`}
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;