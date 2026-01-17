// Data formatters
// Format data for display in UI

export const formatTemperature = (celsius) => {
  return `${celsius.toFixed(1)}°C`
}

export const formatMoisture = (percentage) => {
  return `${percentage.toFixed(1)}%`
}

export const formatStressPercentage = (value) => {
  return `${Math.round(value)}%`
}

export const formatLocation = (latitude, longitude) => {
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
}
