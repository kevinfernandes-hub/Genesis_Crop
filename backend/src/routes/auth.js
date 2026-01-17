// Auth Routes
// Handle user registration and login

import express from 'express'
import * as authController from '../controllers/authController.js'

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)

export default router
