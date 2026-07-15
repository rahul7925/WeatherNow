import {
  WiDaySunny,
  WiDayCloudy,
  WiDayCloudyHigh,
  WiCloud,
  WiDayRain,
  WiDayRainMix,
  WiDayThunderstorm,
  WiDaySnow,
  WiDayFog,
  WiNightClear,
  WiNightAltCloudy,
  WiNightAltCloudyHigh,
  WiNightRain,
  WiNightRainMix,
  WiNightAltThunderstorm,
  WiNightSnow,
  WiNightFog,
} from 'react-icons/wi'

// Maps OpenWeather icon codes (e.g. "01d", "10n") to a display icon component.
const ICON_MAP = {
  '01d': WiDaySunny,
  '01n': WiNightClear,
  '02d': WiDayCloudy,
  '02n': WiNightAltCloudy,
  '03d': WiCloud,
  '03n': WiCloud,
  '04d': WiDayCloudyHigh,
  '04n': WiNightAltCloudyHigh,
  '09d': WiDayRainMix,
  '09n': WiNightRainMix,
  '10d': WiDayRain,
  '10n': WiNightRain,
  '11d': WiDayThunderstorm,
  '11n': WiNightAltThunderstorm,
  '13d': WiDaySnow,
  '13n': WiNightSnow,
  '50d': WiDayFog,
  '50n': WiNightFog,
}

export function getWeatherIcon(iconCode) {
  return ICON_MAP[iconCode] ?? WiDaySunny
}

export function formatTime(unixSeconds, timezoneOffsetSeconds) {
  if (!unixSeconds) return '—'
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}

export function getLocalTime(timezoneOffsetSeconds) {
  const nowUtc = Date.now() + new Date().getTimezoneOffset() * 60000
  const localDate = new Date(nowUtc + timezoneOffsetSeconds * 1000)
  return localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

// Returns 0-1 progress of current time between sunrise and sunset.
// Returns null outside daylight hours (used to hide the day-progress indicator at night).
export function getDayProgress(sunrise, sunset) {
  if (!sunrise || !sunset) return null
  const now = Date.now() / 1000
  if (now < sunrise || now > sunset) return null
  return (now - sunrise) / (sunset - sunrise)
}
