import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Select = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select option',
  label,
  error,
  required = false,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full p-4 bg-white border-2 rounded-xl flex items-center justify-between
                  transition-all duration-300 outline-none
                  ${error ? 'border-red-500' : 'border-blue-200 hover:border-blue-500'}
                  ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
                  ${isOpen ? 'border-blue-500 ring-4 ring-blue-100' : ''}`}
        disabled={disabled}
      >
        <span className={selectedOption ? 'text-gray-800' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border-2 border-blue-100 rounded-xl shadow-xl 
                      max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ backgroundColor: '#f0f9ff' }}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`p-4 cursor-pointer flex items-center justify-between
                          ${option.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                          hover:bg-blue-50 transition-colors`}
              >
                <span>{option.label}</span>
                {option.value === value && <FaCheck className="text-blue-600" />}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;