import { motion } from 'framer-motion'
import { WiSunrise, WiSunset } from 'react-icons/wi'
import { FiMapPin } from 'react-icons/fi'
import { getWeatherIcon, getDayProgress, formatTime } from '../utils/weatherUtils'

function WeatherCard({ weather }) {
  const Icon        = getWeatherIcon(weather.icon)
  const dayProgress = getDayProgress(weather.sunrise, weather.sunset)
  const progress    = dayProgress !== null ? dayProgress * 100 : 0

  return (
    <div className="w-card">

      {/* Location */}
      <div className="w-card__loc">
        <FiMapPin className="w-card__loc-icon" aria-hidden="true" />
        <h1 className="w-card__city">
          {weather.city}
          <span className="w-card__country">
            {weather.state ? `, ${weather.state}` : ''}, {weather.country}
          </span>
        </h1>
      </div>

      {/* Temperature + Icon */}
      <div className="w-card__main">
        <Icon className="w-card__icon-wrap" aria-hidden="true" />
        <div className="w-card__temps">
          <span className="w-card__temp">
            {weather.temperature}
            <span className="w-card__unit">°C</span>
          </span>
          <span className="w-card__desc">{weather.description}</span>
        </div>
      </div>

      {/* Feels like */}
      <p className="w-card__feels">
        Feels like <span>{weather.feelsLike}°C</span>
      </p>

      {/* Day progress arc */}
      {dayProgress !== null && (
        <div className="w-card__arc">
          <div className="arc__row">
            <span className="arc__label">
              <WiSunrise className="arc__label-icon" aria-hidden="true" />
              <span className="arc__label-time">
                {formatTime(weather.sunrise, weather.timezoneOffset)}
              </span>
            </span>
            <span className="arc__label">
              <span className="arc__label-time">
                {formatTime(weather.sunset, weather.timezoneOffset)}
              </span>
              <WiSunset className="arc__label-icon" aria-hidden="true" />
            </span>
          </div>
          <div className="arc__track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="arc__fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ width: '100%', transformOrigin: 'left' }}
            />
            <div className="arc__dot" style={{ left: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherCard
