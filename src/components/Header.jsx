import React, { useContext } from 'react';
import { CloudRain, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { WeatherContext } from '../context/WeatherContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { unit, toggleUnit } = useContext(WeatherContext);

  return (
    <header className="header">
      <div className="logo">
        <CloudRain size={24} className="icon-accent" />
        <h1>Lookup</h1>
      </div>
      <div className="controls">
        <button onClick={toggleUnit} className="unit-toggle">
          °{unit}
        </button>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;