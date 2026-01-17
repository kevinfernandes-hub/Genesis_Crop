// Prediction Routes
// ML service endpoints for predictions

import express from 'express'
import * as mlController from '../controllers/mlController.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.post('/stress', authenticateToken, mlController.getStressPrediction)
router.get('/health/:cropId', authenticateToken, mlController.getHealthScore)
router.post('/weather-impact', authenticateToken, mlController.getWeatherImpact)

export default router
