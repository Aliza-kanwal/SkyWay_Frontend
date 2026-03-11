import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ type = 'info', message, onClose, show = true }) => {
  const types = {
    success: {
      icon: FaCheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      iconColor: 'text-green-500'
    },
    error: {
      icon: FaExclamationCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-800',
      iconColor: 'text-red-500'
    },
    warning: {
      icon: FaExclamationTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500'
    },
    info: {
      icon: FaInfoCircle,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500'
    }
  };

  const currentType = types[type];
  const Icon = currentType.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`${currentType.bgColor} border-l-4 ${currentType.borderColor} p-4 rounded-r-xl mb-4`}
        >
          <div className="flex items-start">
            <Icon className={`${currentType.iconColor} text-xl mr-3 flex-shrink-0 mt-0.5`} />
            <div className={`flex-1 ${currentType.textColor}`}>
              {message}
            </div>
            {onClose && (
              <button onClick={onClose} className={`${currentType.textColor} hover:opacity-70`}>
                <FaTimes />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;