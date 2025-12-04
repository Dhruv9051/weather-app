import { useContext } from 'react';
import { MapPin, X } from 'lucide-react';
import { WeatherContext } from '../context/WeatherContext';

const FavoritesList = () => {
  const { favorites, removeFavorite, setCity } = useContext(WeatherContext);

  if (favorites.length === 0) return null;

  return (
    <div className="favorites-section">
      <h3>Favorites</h3>
      <div className="tags-container">
        {favorites.map(city => (
          <button key={city} className="fav-tag" onClick={() => setCity(city)}>
            <MapPin size={14} />
            <span>{city}</span>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                removeFavorite(city); 
              }}
              className="remove-btn"
            >
              <X size={14} />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;