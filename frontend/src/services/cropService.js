// Crop data service
// Handle crop CRUD operations via backend API

import api from './api'

export const getCrops = () => {
  return api.get('/crops')
}

export const getCropById = (cropId) => {
  return api.get(`/crops/${cropId}`)
}

export const addCrop = (cropData) => {
  return api.post('/crops', cropData)
}

export const updateCrop = (cropId, cropData) => {
  return api.put(`/crops/${cropId}`, cropData)
}

export const deleteCrop = (cropId) => {
  return api.delete(`/crops/${cropId}`)
}

export const getCropStressData = (cropId) => {
  return api.get(`/crops/${cropId}/stress`)
}
