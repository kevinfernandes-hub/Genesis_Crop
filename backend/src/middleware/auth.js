// Authentication middleware
// Verify JWT tokens and protect routes

import jwt from 'jsonwebtoken'
import config from '../config/env.js'
import { AuthenticationError } from '../utils/errorHandler.js'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return next(new AuthenticationError('No token provided'))
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return next(new AuthenticationError('Invalid token'))
    }
    req.user = user
    next()
  })
}

export default authenticateToken
