// Crop Routes
// CRUD operations for crop data

import express from 'express'
import * as cropController from '../controllers/cropController.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.get('/', authenticateToken, cropController.getAllCrops)
router.get('/:id', authenticateToken, cropController.getCropById)
router.post('/', authenticateToken, cropController.addCrop)
router.put('/:id', authenticateToken, cropController.updateCrop)
router.delete('/:id', authenticateToken, cropController.deleteCrop)
router.get('/:id/stress', authenticateToken, cropController.getCropStress)

export default router
