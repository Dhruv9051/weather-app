import { createContext, useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Create Theme Context to which components can subscribe
export const ThemeContext = createContext();

// Provider component to wrap app. Children prop is the nested components that will consume the context
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Theme state, either 'light' or 'dark'

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Effect to apply theme class to document root element
  useEffect(() => {
    // Remove both possible theme classes first
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    // Add the current theme class
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  // Context value memoization to prevent unnecessary re-renders unless dependencies change
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  // Return the provider with the context value and children components
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Prop types validation for children prop
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};