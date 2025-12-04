import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Droplets, Wind, Star, Gauge } from 'lucide-react';
import { formatTemp } from './helpers';

const CurrentWeather = () => {
  const { weather, unit, addFavorite, favorites, removeFavorite } = useContext(WeatherContext);

  if (!weather) return null;

  const isFav = favorites.includes(weather.name);

  return (
    <div className="weather-card animate-fade-in">
      <div className="card-header">
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="date">{new Date().toLocaleDateString()}</p>
        </div>
        <button 
          onClick={() => isFav ? removeFavorite(weather.name) : addFavorite(weather.name)}
          className={`fav-btn ${isFav ? 'active' : ''}`}
        >
          <Star size={24} fill={isFav ? "gold" : "none"} stroke={isFav ? "gold" : "currentColor"} />
        </button>
      </div>

      <div className="weather-main">
        <div className="temp-container">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
            alt={weather.weather[0].description}
            className="weather-icon-lg"
          />
          <span className="temperature">{formatTemp(weather.main.temp, unit)}</span>
        </div>
        <div className="condition">{weather.weather[0].description}</div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Droplets size={18} />
          <span>Humidity: {weather.main.humidity}%rh</span>
        </div>
        <div className="detail-item">
          <Wind size={18} />
          <span>Wind: {weather.wind.speed} km/h</span>
        </div>
        <div className="detail-item">
          <Gauge size={18} />
          <span>Pressure: {weather.main.pressure} p</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;