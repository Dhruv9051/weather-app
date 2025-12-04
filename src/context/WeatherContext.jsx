import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';

export const WeatherContext = createContext();

/**
 * The WeatherProvider component provides context for weather data and
 * functions to manipulate it. It also handles loading and error states.
 */

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');
  const [lastCity, setLastCity] = useState(null);
  
  // Initialize from local storage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

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

  // New: setCity only updates lastCity
  const setCity = useCallback((city) => {
    setLastCity(city);
  }, []);

  const addFavorite = useCallback((city) => {
    if (!favorites.includes(city)) setFavorites([...favorites, city]);
  }, [favorites]);

  const removeFavorite = useCallback((city) => {
    setFavorites(favorites.filter(c => c !== city));
  }, [favorites]);

  const toggleUnit = useCallback(() => {
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  }, []);
  // Refetch weather data when unit changes and lastCity is set
  useEffect(() => {
    if (lastCity) {
      getWeather(lastCity, unit);
    }
  }, [unit, lastCity, getWeather]);

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

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};