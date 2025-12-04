import React, { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { WeatherContext } from '../context/WeatherContext';

const SearchSection = () => {
  const [input, setInput] = useState('');
  const { setCity, loading, error } = useContext(WeatherContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setCity(input);
      setInput('');
    }
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-bar">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search for a city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? '...' : 'Search'}
        </button>
      </form>
      
      {error && <div className="status-msg error">Error: {error}</div>}
    </div>
  );
};

export default SearchSection;