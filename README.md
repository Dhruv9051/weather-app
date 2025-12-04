# Weather Lookup App

A modern React weather application that allows users to search for cities, view current weather, 5-day forecasts, and manage favorite locations. Built with context providers, OpenWeatherMap API, and a beautiful UI.

## Features

- **Search for any city** and view current weather details.
- **5-Day forecast** with daily summaries.
- **Toggle temperature units** (Celsius/Fahrenheit).
- **Add/remove favorite cities** for quick access.
- **Responsive design** with light/dark theme toggle.
- **Loading spinners** for smooth data transitions.
- **Error handling** for invalid cities or API issues.

## Screenshots

![App Screenshot](public/screenshot.png)

## Technologies Used

- React (functional components, hooks, context API)
- OpenWeatherMap API
- Lucide React Icons
- CSS Modules / Global CSS

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Dhruv9051/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up your API key:**
   - Create a `.env` file in the root directory.
   - Add your OpenWeatherMap API key:
     ```
     REACT_APP_WEATHER_API_KEY=your_api_key_here
     ```

### Running the App

```sh
npm start
# or
yarn start
```

The app will run locally at `http://localhost:3000`.

### Deployment

To build and deploy the app:

```sh
npm run build
# or
yarn build
```

You can deploy the contents of the `build/` folder to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Project Structure

```
src/
  components/
    CurrentWeather.jsx
    FavouritesList.jsx
    Forecast.jsx
    Header.jsx
    SearchSection.jsx
    helpers/
      index.js
  context/
    ThemeContext.jsx
    WeatherContext.jsx
  services/
    weatherService.js
  styles/
    global.css
  App.js
  index.js
public/
  index.html
  manifest.json
```

## Environment Variables

- `REACT_APP_WEATHER_API_KEY`: Your OpenWeatherMap API key.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

---

**Author:** Dhruv Suvarna  
**Repository:** [GitHub - weather-app](https://github.com/Dhruv9051/weather-app)
