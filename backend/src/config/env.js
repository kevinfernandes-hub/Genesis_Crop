// Environment configuration
// Load and validate environment variables

import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  mlServiceUrl: process.env.ML_SERVICE_URL || 'http://localhost:5001/api',
  mlServiceApiKey: process.env.ML_SERVICE_API_KEY,
  fcmServerKey: process.env.FCM_SERVER_KEY
}

// Validate required variables
const requiredVars = ['JWT_SECRET', 'FIREBASE_PROJECT_ID']
const missing = requiredVars.filter((v) => !process.env[v])

if (missing.length > 0) {
  throw new Error(`Missing required env vars: ${missing.join(', ')}`)
}

export default config
