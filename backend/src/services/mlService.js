// ML Service
// API client for Python ML service

import axios from 'axios'
import config from '../config/env.js'
import log from '../utils/logger.js'

const mlClient = axios.create({
  baseURL: config.mlServiceUrl,
  headers: {
    'Authorization': `Bearer ${config.mlServiceApiKey}`,
    'Content-Type': 'application/json'
  }
})

const mlService = {
  getStressPrediction: async (cropId, sensorData) => {
    try {
      const response = await mlClient.post('/predict/stress', { cropId, sensorData })
      return response.data
    } catch (err) {
      log.error('ML service error', err.message)
      throw err
    }
  },

  getHealthScore: async (cropId) => {
    try {
      const response = await mlClient.get(`/health/${cropId}`)
      return response.data
    } catch (err) {
      log.error('ML service error', err.message)
      throw err
    }
  },

  getWeatherImpact: async (location, weatherData) => {
    try {
      const response = await mlClient.post('/predict/weather-impact', { location, weatherData })
      return response.data
    } catch (err) {
      log.error('ML service error', err.message)
      throw err
    }
  }
}

export default mlService
