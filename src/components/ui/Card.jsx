import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100/50 ${className}`}>
      {children}
    </div>
  );
};

export default Card;