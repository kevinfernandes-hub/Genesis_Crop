// Crop Controller
// Handle crop CRUD operations and queries

import { db } from '../config/firebase.js'
import { NotFoundError } from '../utils/errorHandler.js'
import log from '../utils/logger.js'

export const getAllCrops = async (req, res, next) => {
  try {
    const { uid } = req.user
    const snapshot = await db.collection('crops').where('userId', '==', uid).get()
    const crops = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    res.json({
      success: true,
      data: crops
    })
  } catch (err) {
    next(err)
  }
}

export const getCropById = async (req, res, next) => {
  try {
    const { id } = req.params
    const doc = await db.collection('crops').doc(id).get()

    if (!doc.exists) {
      throw new NotFoundError('Crop not found')
    }

    res.json({
      success: true,
      data: { id: doc.id, ...doc.data() }
    })
  } catch (err) {
    next(err)
  }
}

export const addCrop = async (req, res, next) => {
  try {
    const { uid } = req.user
    const cropData = { ...req.body, userId: uid, createdAt: new Date() }

    const docRef = await db.collection('crops').add(cropData)
    log.info('Crop added', { cropId: docRef.id })

    res.status(201).json({
      success: true,
      message: 'Crop added successfully',
      id: docRef.id
    })
  } catch (err) {
    next(err)
  }
}

export const updateCrop = async (req, res, next) => {
  try {
    const { id } = req.params
    await db.collection('crops').doc(id).update(req.body)

    res.json({
      success: true,
      message: 'Crop updated successfully'
    })
  } catch (err) {
    next(err)
  }
}

export const deleteCrop = async (req, res, next) => {
  try {
    const { id } = req.params
    await db.collection('crops').doc(id).delete()

    res.json({
      success: true,
      message: 'Crop deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}

export const getCropStress = async (req, res, next) => {
  try {
    const { id } = req.params
    const snapshot = await db.collection('crops').doc(id).collection('stressData').orderBy('timestamp', 'desc').limit(30).get()
    const stressData = snapshot.docs.map((doc) => doc.data())

    res.json({
      success: true,
      data: stressData
    })
  } catch (err) {
    next(err)
  }
}
