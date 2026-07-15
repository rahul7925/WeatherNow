import { motion } from 'framer-motion'
import { WiHumidity, WiStrongWind, WiBarometer, WiFog, WiSunrise, WiSunset } from 'react-icons/wi'
import { FiThermometer, FiClock } from 'react-icons/fi'
import { formatTime, getLocalTime } from '../utils/weatherUtils'

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
}

const item = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
}

function StatCard({ name, icon: Icon, value, unit, sub, bar }) {
  return (
    <motion.div className="stat" variants={item}>
      <div className="stat__top">
        <span className="stat__name">{name}</span>
        <Icon className="stat__icon" aria-hidden="true" />
      </div>
      <div>
        <span className="stat__val">{value}</span>
        {unit && <span className="stat__unit">{unit}</span>}
      </div>
      {bar !== undefined && (
        <div className="stat__bar">
          <motion.div
            className="stat__bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, bar)}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      )}
      {sub && <span className="stat__sub">{sub}</span>}
    </motion.div>
  )
}

function WeatherHighlights({ weather }) {
  const humidity = weather.humidity

  const stats = [
    {
      name: 'Humidity',
      icon: WiHumidity,
      value: humidity,
      unit: '%',
      bar: humidity,
      sub: humidity < 40 ? 'Dry' : humidity < 70 ? 'Comfortable' : 'Humid',
    },
    {
      name: 'Wind Speed',
      icon: WiStrongWind,
      value: weather.windSpeed,
      unit: 'km/h',
      sub: weather.windSpeed < 20 ? 'Light breeze' : weather.windSpeed < 40 ? 'Moderate' : 'Strong',
    },
    {
      name: 'Pressure',
      icon: WiBarometer,
      value: weather.pressure,
      unit: 'hPa',
      sub: weather.pressure < 1000 ? 'Low' : weather.pressure > 1015 ? 'High' : 'Normal',
    },
    {
      name: 'Visibility',
      icon: WiFog,
      value: weather.visibility,
      unit: 'km',
      sub: weather.visibility >= 10 ? 'Clear' : weather.visibility >= 5 ? 'Moderate' : 'Poor',
    },
    {
      name: 'Feels Like',
      icon: FiThermometer,
      value: weather.feelsLike,
      unit: '°C',
      sub:
        weather.feelsLike > weather.temperature
          ? 'Warmer than actual'
          : weather.feelsLike < weather.temperature
          ? 'Cooler than actual'
          : 'Same as actual',
    },
    {
      name: 'Local Time',
      icon: FiClock,
      value: getLocalTime(weather.timezoneOffset),
      sub: 'Current local time',
    },
  ]

  return (
    <div className="highlights">
      <span className="highlights__label">Today's Highlights</span>

      <motion.div
        className="hi-grid"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {stats.map((s) => (
          <StatCard key={s.name} {...s} />
        ))}

        {/* Sunrise & Sunset */}
        <motion.div className="sun-card" variants={item}>
          <div className="sun-item">
            <WiSunrise
              className="sun-item__icon"
              style={{ color: '#F59E0B' }}
              aria-hidden="true"
            />
            <div className="sun-item__info">
              <span className="sun-item__label">Sunrise</span>
              <span className="sun-item__time">
                {formatTime(weather.sunrise, weather.timezoneOffset)}
              </span>
            </div>
          </div>

          <div className="sun-divider" aria-hidden="true" />

          <div className="sun-item sun-item--right">
            <div className="sun-item__info" style={{ textAlign: 'right' }}>
              <span className="sun-item__label">Sunset</span>
              <span className="sun-item__time">
                {formatTime(weather.sunset, weather.timezoneOffset)}
              </span>
            </div>
            <WiSunset
              className="sun-item__icon"
              style={{ color: '#F97316' }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WeatherHighlights
