// Firebase Service
// Firestore and Firebase Admin utilities

import { db, auth } from '../config/firebase.js'

const firebaseService = {
  // User operations
  getUserById: async (uid) => {
    const doc = await db.collection('users').doc(uid).get()
    return doc.exists ? { id: doc.id, ...doc.data() } : null
  },

  // Crop operations
  getUserCrops: async (userId) => {
    const snapshot = await db.collection('crops').where('userId', '==', userId).get()
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  // Notification preferences
  updateNotificationPreferences: async (userId, preferences) => {
    await db.collection('users').doc(userId).update({ notificationPreferences: preferences })
  }
}

export default firebaseService
