import React from 'react';

const Button = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
    secondary: 'bg-gray-200 text-gray-800',
    outline: 'border-2 border-blue-600 text-blue-600'
  };
  
  return (
    <button className={`${variants[variant]} px-6 py-3 rounded-xl font-medium transition-all`} {...props}>
      {children}
    </button>
  );
};

export default Button;