// ML service API integration
// Calls the Python ML service for predictions

import api from './api'

export const getStressPrediction = (cropId, sensorData) => {
  return api.post('/predictions/stress', {
    cropId,
    sensorData
  })
}

export const getHealthScore = (cropId) => {
  return api.get(`/predictions/health/${cropId}`)
}

export const getWeatherImpact = (location, weatherData) => {
  return api.post('/predictions/weather-impact', {
    location,
    weatherData
  })
}
