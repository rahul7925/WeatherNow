import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiFog,
  WiSunrise,
  WiSunset,
} from 'react-icons/wi'
import { FiClock } from 'react-icons/fi'
import { formatTime, getLocalTime } from '../utils/weatherUtils'

function WeatherDetails({ weather }) {
  const stats = [
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      icon: WiHumidity,
    },
    {
      label: 'Wind speed',
      value: `${weather.windSpeed} km/h`,
      icon: WiStrongWind,
    },
    {
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      icon: WiBarometer,
    },
    {
      label: 'Visibility',
      value: `${weather.visibility} km`,
      icon: WiFog,
    },
    {
      label: 'Sunrise',
      value: formatTime(weather.sunrise, weather.timezoneOffset),
      icon: WiSunrise,
    },
    {
      label: 'Sunset',
      value: formatTime(weather.sunset, weather.timezoneOffset),
      icon: WiSunset,
    },
    {
      label: 'Local time',
      value: getLocalTime(weather.timezoneOffset),
      icon: FiClock,
    },
  ]

  return (
    <div className="weather-details">
      {stats.map(({ label, value, icon: StatIcon }) => (
        <div className="stat-card" key={label}>
          <StatIcon className="stat-card__icon" aria-hidden="true" />
          <div className="stat-card__text">
            <span className="stat-card__label">{label}</span>
            <span className="stat-card__value">{value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeatherDetails
