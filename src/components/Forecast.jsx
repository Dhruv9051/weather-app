import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { formatDate, formatTemp } from './helpers';

const Forecast = () => {
  const { forecast, unit, loading } = useContext(WeatherContext); // Destructure necessary values from WeatherContext

  if (!forecast || forecast.length === 0) return null; // Null check

  return (
    // Conditional rendering based on loading state
    loading ? (
      <div className="forecast-section animate-slide-up">
        <h3>5-Day Forecast</h3>
        <div className="forecast-grid">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="forecast-card">
              <div className="spinner" style={{ margin: '24px auto' }} />
            </div>
          ))}
        </div>
      </div>
    ) : (
    <div className="forecast-section animate-slide-up">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day) => {
          let weatherIcon = (
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                alt={day.weather[0].main} 
              />
            );

          return (
            <div key={day.dt} className="forecast-card">
              <p className="day-name">{formatDate(day.dt)}</p>
              {weatherIcon}
              <p className="forecast-temp">
                <span className="high">{formatTemp(day.main.temp_max, unit)}</span>
                <span className="low">{formatTemp(day.main.temp_min, unit)}</span>
              </p>
              <p className="desc-sm">{day.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  ));
};

export default Forecast;