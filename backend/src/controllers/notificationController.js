// Notification Controller
// Handle FCM notifications

import { messaging } from '../config/firebase.js'
import { ValidationError } from '../utils/errorHandler.js'
import log from '../utils/logger.js'

export const sendNotification = async (req, res, next) => {
  try {
    const { topic, title, body, data } = req.body

    if (!topic || !title || !body) {
      throw new ValidationError('topic, title, and body are required')
    }

    const message = {
      notification: { title, body },
      data: data || {},
      topic
    }

    const response = await messaging.send(message)
    log.info('Notification sent', { topic, response })

    res.json({
      success: true,
      message: 'Notification sent successfully',
      messageId: response
    })
  } catch (err) {
    next(err)
  }
}

export const subscribeToTopic = async (req, res, next) => {
  try {
    const { tokens, topic } = req.body

    if (!tokens || !topic) {
      throw new ValidationError('tokens and topic are required')
    }

    await messaging.subscribeToTopic(tokens, topic)

    res.json({
      success: true,
      message: `Subscribed to topic: ${topic}`
    })
  } catch (err) {
    next(err)
  }
}
