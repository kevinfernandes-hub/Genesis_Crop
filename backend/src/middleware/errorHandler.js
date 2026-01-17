// Global error handling middleware
// Catch and format errors consistently

import log from '../utils/logger.js'
import { AppError } from '../utils/errorHandler.js'

export const errorHandler = (err, req, res, next) => {
  log.error('Request error', err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode
    })
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    statusCode: 500
  })
}

export default errorHandler
