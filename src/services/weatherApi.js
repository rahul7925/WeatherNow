import axios from 'axios'

const GEO_URL     = 'https://api.openweathermap.org/geo/1.0/direct'
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY     = import.meta.env.VITE_WEATHER_API_KEY

/**
 * Step 1 — Geocode: city name → { lat, lon, displayName }
 * Uses the Geocoding API which covers far more locations than city-name search.
 */
async function geocodeCity(query) {
  const res = await axios.get(GEO_URL, {
    params: {
      q:     query,
      limit: 1,
      appid: API_KEY,
    },
  })

  const results = res.data
  if (!results || results.length === 0) {
    throw new Error('Location not found. Try a nearby larger town or check the spelling.')
  }

  const { lat, lon, name, country, state } = results[0]
  return { lat, lon, name, country, state }
}

/**
 * Step 2 — Fetch weather by coordinates.
 * Coordinates are exact, so even tiny villages work if they are in the geo index.
 */
async function fetchWeatherByCoords(lat, lon) {
  const res = await axios.get(WEATHER_URL, {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: API_KEY,
    },
  })
  return res.data
}

/**
 * Public API — searches by name using geocoding, then pulls weather by coords.
 *
 * @param {string} city - Any city, town, village, or region name
 * @returns {Promise<object>} Normalized weather data
 */
export async function getWeatherByCity(city) {
  if (!API_KEY) {
    throw new Error('Missing API key. Add VITE_WEATHER_API_KEY to your .env file.')
  }

  try {
    const { lat, lon, name, country, state } = await geocodeCity(city)
    const data = await fetchWeatherByCoords(lat, lon)
    return normalizeWeatherResponse(data, name, country, state)
  } catch (err) {
    throw new Error(mapErrorToMessage(err))
  }
}

function normalizeWeatherResponse(data, geoName, geoCountry, geoState) {
  return {
    // Prefer the geocoded name (more accurate for small places)
    city:        geoName || data.name,
    country:     geoCountry || data.sys?.country || '',
    state:       geoState || '',
    temperature: Math.round(data.main.temp),
    feelsLike:   Math.round(data.main.feels_like),
    condition:   data.weather?.[0]?.main        ?? 'Unknown',
    description: data.weather?.[0]?.description ?? '',
    icon:        data.weather?.[0]?.icon        ?? '01d',
    humidity:    data.main.humidity,
    windSpeed:   Math.round((data.wind?.speed ?? 0) * 3.6), // m/s → km/h
    pressure:    data.main.pressure,
    visibility:  Math.round((data.visibility   ?? 0) / 1000), // m → km
    sunrise:     data.sys?.sunrise,
    sunset:      data.sys?.sunset,
    timezoneOffset: data.timezone ?? 0,
  }
}

function mapErrorToMessage(err) {
  // Propagate our own user-facing messages as-is
  if (err.message && !axios.isAxiosError(err)) {
    return err.message
  }

  if (axios.isAxiosError(err)) {
    const status = err.response?.status
    if (status === 404) return 'Location not found. Try a nearby larger town or check the spelling.'
    if (status === 401) return 'Invalid API key. Check your .env configuration.'
    if (!err.response)  return 'Network error. Check your connection and try again.'
  }

  return 'Something went wrong while fetching weather data.'
}
