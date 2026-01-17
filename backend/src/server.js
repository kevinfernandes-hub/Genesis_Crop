// Express server setup
// Main application entry point

import express from 'express'
import cors from 'cors'
import config from './config/env.js'
import errorHandler from './middleware/errorHandler.js'
import log from './utils/logger.js'

// Routes
import authRoutes from './routes/auth.js'
import cropRoutes from './routes/crops.js'
import predictionRoutes from './routes/predictions.js'
import notificationRoutes from './routes/notifications.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/crops', cropRoutes)
app.use('/api/predictions', predictionRoutes)
app.use('/api/notifications', notificationRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

// Error handler (must be last)
app.use(errorHandler)

// Start server
const PORT = config.port
app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`, { env: config.nodeEnv })
})

export default app
