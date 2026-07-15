import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WiDaySunny } from 'react-icons/wi'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import WeatherHighlights from './components/WeatherHighlights'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import { getWeatherByCity } from './services/weatherApi'
import './App.css'

const fadeUp = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.15 } },
}

function App() {
  const [weather, setWeather]   = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError]       = useState(null)

  const handleSearch = useCallback(async (city) => {
    setLoading(true)
    setError(null)

    try {
      const data = await getWeatherByCity(city)
      setWeather(data)
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="app">
      <div className="app__inner">

        {/* ── Header ── */}
        <header className="header">
          <div className="header__brand">
            <div className="header__icon" aria-hidden="true">
              <WiDaySunny />
            </div>
            <span className="header__name">WeatherNow</span>
          </div>
          <span className="header__meta">Current conditions for any city</span>
        </header>

        {/* ── Search ── */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* ── Content ── */}
        <main className="content">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div key="loader" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <Loader />
              </motion.div>
            )}

            {!isLoading && error && (
              <motion.div key="error" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <ErrorMessage message={error} />
              </motion.div>
            )}

            {!isLoading && !error && weather && (
              <motion.div key="result" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <div className="dashboard">
                  <WeatherCard weather={weather} />
                  <WeatherHighlights weather={weather} />
                </div>
              </motion.div>
            )}

            {!isLoading && !error && !weather && (
              <motion.div key="empty" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
                <div className="empty">
                  <div className="empty__icon" aria-hidden="true">🌍</div>
                  <h2 className="empty__title">Search for a city</h2>
                  <p className="empty__sub">Get live weather conditions anywhere in the world.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

      </div>
    </div>
  )
}

export default App
