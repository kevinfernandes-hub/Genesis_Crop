// Notification Routes
// Firebase Cloud Messaging endpoints

import express from 'express'
import * as notificationController from '../controllers/notificationController.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.post('/send', authenticateToken, notificationController.sendNotification)
router.post('/subscribe', authenticateToken, notificationController.subscribeToTopic)

export default router
