# WeatherNow

A clean, professional weather application built with React and the OpenWeather API.
Search any city, town, or village worldwide and get real-time conditions instantly.

![WeatherNow](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat)

---

## Features

- **Global search** — cities, towns, and villages via geocoding
- **Live weather data** — temperature, condition, humidity, wind, pressure, visibility
- **Sunrise & sunset** with day-progress indicator
- **Smooth animations** — Framer Motion fade/slide transitions
- **Error handling** — friendly messages for invalid cities or network issues
- **Responsive** — desktop, tablet, and mobile layouts
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation

---

## Tech Stack

| Layer       | Library              |
|-------------|----------------------|
| UI          | React 19 + Vite 5    |
| Styling     | Vanilla CSS          |
| Animations  | Framer Motion        |
| HTTP client | Axios                |
| Icons       | React Icons (wi, fi) |
| API         | OpenWeatherMap (free)|

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

Create a `.env` file in the project root:

```
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

Get a free key at [openweathermap.org/api](https://openweathermap.org/api).  
> New keys take up to 2 hours to activate.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — ready to deploy to Render, Vercel, or Netlify.

---

## How the Search Works

The app uses a **two-step geocoding approach** for maximum coverage:

1. **Geocoding API** `/geo/1.0/direct` — converts city name → latitude & longitude
2. **Weather API** `/data/2.5/weather` — fetches conditions by exact coordinates

This covers small villages and towns that direct city-name search misses.

---

## Deployment on Render

1. Push your code to GitHub
2. Create a new **Static Site** on [render.com](https://render.com)
3. Set **Build Command**: `npm run build`
4. Set **Publish Directory**: `dist`
5. Add **Environment Variable**: `VITE_WEATHER_API_KEY = your_key`
6. Deploy

---

## Project Structure

```
src/
├── components/
│   ├── ErrorBoundary.jsx   # Runtime error fallback
│   ├── ErrorMessage.jsx    # API / user-facing errors
│   ├── Loader.jsx          # Loading spinner
│   ├── SearchBar.jsx       # Search input + button
│   ├── WeatherCard.jsx     # Current weather hero
│   └── WeatherHighlights.jsx # Stats grid
├── services/
│   └── weatherApi.js       # Geocoding + weather API calls
├── utils/
│   └── weatherUtils.js     # Icon map, time formatters
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Environment Variables

| Variable               | Description                        |
|------------------------|------------------------------------|
| `VITE_WEATHER_API_KEY` | OpenWeatherMap API key (required)  |

> Never commit your `.env` file. It is listed in `.gitignore`.

---

## License

MIT
