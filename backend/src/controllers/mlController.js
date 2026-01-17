// ML Controller
// Handle ML service integration and predictions

import mlService from '../services/mlService.js'
import { ValidationError } from '../utils/errorHandler.js'
import log from '../utils/logger.js'

export const getStressPrediction = async (req, res, next) => {
  try {
    const { cropId, sensorData } = req.body

    if (!cropId || !sensorData) {
      throw new ValidationError('cropId and sensorData are required')
    }

    const prediction = await mlService.getStressPrediction(cropId, sensorData)

    res.json({
      success: true,
      data: prediction
    })
  } catch (err) {
    next(err)
  }
}

export const getHealthScore = async (req, res, next) => {
  try {
    const { cropId } = req.params
    const healthScore = await mlService.getHealthScore(cropId)

    res.json({
      success: true,
      data: healthScore
    })
  } catch (err) {
    next(err)
  }
}

export const getWeatherImpact = async (req, res, next) => {
  try {
    const { location, weatherData } = req.body
    const impact = await mlService.getWeatherImpact(location, weatherData)

    res.json({
      success: true,
      data: impact
    })
  } catch (err) {
    next(err)
  }
}
