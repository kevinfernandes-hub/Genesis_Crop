// Notification Service
// Firebase Cloud Messaging utilities

import { messaging } from '../config/firebase.js'
import log from '../utils/logger.js'

const notificationService = {
  sendStressAlert: async (tokens, cropName, stressLevel) => {
    const message = {
      notification: {
        title: `⚠️ Stress Alert: ${cropName}`,
        body: `Your ${cropName} crop has reached ${stressLevel} stress level.`
      },
      data: {
        cropName,
        stressLevel,
        type: 'stress_alert'
      }
    }

    try {
      for (const token of tokens) {
        await messaging.send({ ...message, token })
      }
      log.info('Stress alerts sent', { count: tokens.length })
    } catch (err) {
      log.error('Failed to send alerts', err.message)
      throw err
    }
  },

  sendRecommendation: async (tokens, title, recommendation) => {
    const message = {
      notification: {
        title,
        body: recommendation.substring(0, 150)
      },
      data: {
        type: 'recommendation',
        fullText: recommendation
      }
    }

    try {
      for (const token of tokens) {
        await messaging.send({ ...message, token })
      }
    } catch (err) {
      log.error('Failed to send recommendation', err.message)
    }
  }
}

export default notificationService
