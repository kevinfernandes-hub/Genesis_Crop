// Auth Controller
// Handle authentication logic

import jwt from 'jsonwebtoken'
import config from '../config/env.js'
import { auth } from '../config/firebase.js'
import { ValidationError, AuthenticationError } from '../utils/errorHandler.js'
import log from '../utils/logger.js'

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ValidationError('Email and password are required')
    }

    const userRecord = await auth.createUser({ email, password })
    log.info('User registered', { uid: userRecord.uid })

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      uid: userRecord.uid
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { idToken } = req.body

    if (!idToken) {
      throw new ValidationError('ID token is required')
    }

    const decodedToken = await auth.verifyIdToken(idToken)
    const token = jwt.sign({ uid: decodedToken.uid, email: decodedToken.email }, config.jwtSecret, {
      expiresIn: '7d'
    })

    res.json({
      success: true,
      message: 'Login successful',
      token
    })
  } catch (err) {
    next(err)
  }
}
