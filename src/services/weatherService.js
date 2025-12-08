const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Set API key in environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5'; // Base URL for OpenWeatherMap API

// Function to fetch current weather data
export const fetchWeatherData = async (city, unit = 'C') => {
  const units = unit === 'F' ? 'imperial' : 'metric';
  const weatherRes = await fetch(`${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`);
  if (!weatherRes.ok) throw new Error('Failed to fetch city');
  return await weatherRes.json();
};

// Function to fetch 5-day forecast data
export const fetchForecastData = async (city, unit = 'C') => {
  const units = unit === 'F' ? 'imperial' : 'metric';
  const forecastRes = await fetch(`${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`);
  if (!forecastRes.ok) throw new Error('Failed to fetch forecast');
  const data = await forecastRes.json();
  // Filter for 1 daily forecast for 5 days
  return data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
};