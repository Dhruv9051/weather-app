const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a given city.
 */
export const fetchWeatherData = async (city, unit = 'C') => {
  const units = unit === 'F' ? 'imperial' : 'metric';
  const weatherRes = await fetch(`${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`);
  if (!weatherRes.ok) throw new Error('City not found');
  return await weatherRes.json();
};

/**
 * Fetches 5 daily forecast for a given city.
 */
export const fetchForecastData = async (city, unit = 'C') => {
  const units = unit === 'F' ? 'imperial' : 'metric';
  const forecastRes = await fetch(`${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`);
  if (!forecastRes.ok) throw new Error('Failed to fetch forecast');
  const data = await forecastRes.json();
  // Filter for 1 daily forecast for 5 days
  return data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
};