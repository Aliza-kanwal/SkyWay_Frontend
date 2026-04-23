import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem('themeColor') || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    // Apply theme class to body
    document.body.className = `theme-${themeColor}`;
  }, [themeColor]);

  const colorStyles = {
    blue: {
      primary: 'from-blue-600 to-blue-700',
      secondary: 'from-blue-500 to-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      ring: 'ring-blue-500',
      text: 'text-blue-600',
    },
    green: {
      primary: 'from-green-600 to-green-700',
      secondary: 'from-green-500 to-green-600',
      button: 'bg-green-600 hover:bg-green-700',
      ring: 'ring-green-500',
      text: 'text-green-600',
    },
    purple: {
      primary: 'from-purple-600 to-purple-700',
      secondary: 'from-purple-500 to-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      ring: 'ring-purple-500',
      text: 'text-purple-600',
    },
    orange: {
      primary: 'from-orange-600 to-orange-700',
      secondary: 'from-orange-500 to-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700',
      ring: 'ring-orange-500',
      text: 'text-orange-600',
    },
    red: {
      primary: 'from-red-600 to-red-700',
      secondary: 'from-red-500 to-red-600',
      button: 'bg-red-600 hover:bg-red-700',
      ring: 'ring-red-500',
      text: 'text-red-600',
    },
  };

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, colorStyles: colorStyles[themeColor] }}>
      {children}
    </ThemeContext.Provider>
  );
};