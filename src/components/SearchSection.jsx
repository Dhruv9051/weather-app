import React, { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { WeatherContext } from '../context/WeatherContext';

const SearchSection = () => {
  const [input, setInput] = useState(''); // Local state for input field
  const { setCity, loading, error } = useContext(WeatherContext); // Destructure setCity function, loading and error state from WeatherContext

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (input.trim()) { // Ensure input is not empty and has no whitespace
      setCity(input); // Update city in context
      setInput(''); // Clear input field
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