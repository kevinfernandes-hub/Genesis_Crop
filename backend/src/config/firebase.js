// Firebase Admin SDK initialization
// Set up Firebase for server-side operations

import admin from 'firebase-admin'
import dotenv from 'dotenv'

dotenv.config()

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export const db = admin.firestore()
export const auth = admin.auth()
export const messaging = admin.messaging()

export default admin
