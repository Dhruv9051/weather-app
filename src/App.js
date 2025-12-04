import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider } from './context/WeatherContext';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import CurrentWeather from './components/CurrentWeather';
import './styles/global.css';

// Lazy Load heavy components
const Forecast = lazy(() => import('./components/Forecast'));
const FavoritesList = lazy(() => import('./components/FavouritesList'));

const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <div className="left-panel">
              <SearchSection />
              <Suspense>
                <FavoritesList />
              </Suspense>
            </div>           
            <div className="right-panel">
              <CurrentWeather />
              <Suspense>
                <Forecast />
              </Suspense>
            </div>
          </main>
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;