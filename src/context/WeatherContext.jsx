import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';
import PropTypes from 'prop-types';

// Create Weather Context to which components can subscribe
export const WeatherContext = createContext();

// Provider component to wrap app. Children prop is the nested components that will consume the context
export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null); // Stores api response for current weather
  const [forecast, setForecast] = useState([]); // Stores api response for weather forecast
  const [loading, setLoading] = useState(false); // Indicates if data is being fetched (for spinners)
  const [error, setError] = useState(null); // Stores error message if fetch fails
  const [unit, setUnit] = useState('C'); // Temperature unit, either 'C' or 'F'
  const [lastCity, setLastCity] = useState(null); // Last searched city to refetch on unit change
  
  // Local storage initialization (useState with callback to run logic on first mount)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Effect to save updated favorites list in local storage whenever favourites dependency changes (add/remove)
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Weather data fetching logic
  const getWeather = useCallback(async (city, selectedUnit = unit) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeatherData(city, selectedUnit);
      const forecastData = await fetchForecastData(city, selectedUnit);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  // Updates lastCity
  const setCity = useCallback((city) => {
    setLastCity(city);
  }, []);

  // Add favorite city to favorites list
  const addFavorite = useCallback((city) => {
    if (!favorites.includes(city)) setFavorites([...favorites, city]);
  }, [favorites]);

  // Remove favorite city from favorites list
  const removeFavorite = useCallback((city) => {
    setFavorites(favorites.filter(c => c !== city));
  }, [favorites]);

  // Toggle temperature unit between 'C' and 'F'
  const toggleUnit = useCallback(() => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  }, []);

  // Refetch weather data for unit toggles and city searches (avoid for initial render)
  useEffect(() => {
    if (lastCity) {
      getWeather(lastCity, unit);
    }
  }, [unit, lastCity, getWeather]);

  // Context value memoization to prevent unnecessary re-renders unless dependencies change
  const contextValue = useMemo(() => ({
    weather,
    forecast,
    loading,
    error,
    unit,
    favorites,
    setCity,
    addFavorite,
    removeFavorite,
    toggleUnit
  }), [weather, forecast, loading, error, unit, favorites, setCity, addFavorite, removeFavorite, toggleUnit]);

  // Return the provider with the context value and children components
  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

// Prop types validation for children prop
WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired,
};