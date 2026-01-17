/**
 * API Service
 * Backend API calls using fetch
 * Farmer-friendly: handles offline gracefully
 * 
 * Base URL: http://localhost:5000/api (dev)
 *          https://api.example.com/api (prod)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

/**
 * Fetch with authentication token
 */
async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('authToken')
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// ============ CROP API ============

export const cropAPI = {
  // Get all crops for current user
  getCrops: () => fetchWithAuth('/crops'),

  // Get single crop by ID
  getCropById: (cropId) => fetchWithAuth(`/crops/${cropId}`),

  // Add new crop
  addCrop: (cropData) =>
    fetchWithAuth('/crops', {
      method: 'POST',
      body: JSON.stringify(cropData)
    }),

  // Update crop
  updateCrop: (cropId, cropData) =>
    fetchWithAuth(`/crops/${cropId}`, {
      method: 'PUT',
      body: JSON.stringify(cropData)
    }),

  // Delete crop
  deleteCrop: (cropId) =>
    fetchWithAuth(`/crops/${cropId}`, {
      method: 'DELETE'
    }),

  // Get stress data for crop
  getCropStress: (cropId) => fetchWithAuth(`/crops/${cropId}/stress`)
}

// ============ PREDICTION API ============

export const predictionAPI = {
  // Get stress prediction
  getStressPrediction: (cropId, sensorData) =>
    fetchWithAuth('/predictions/stress', {
      method: 'POST',
      body: JSON.stringify({ cropId, sensorData })
    }),

  // Get health score
  getHealthScore: (cropId) => fetchWithAuth(`/predictions/health/${cropId}`),

  // Get weather impact
  getWeatherImpact: (location, weatherData) =>
    fetchWithAuth('/predictions/weather-impact', {
      method: 'POST',
      body: JSON.stringify({ location, weatherData })
    })
}

// ============ NOTIFICATION API ============

export const notificationAPI = {
  // Subscribe to notifications
  subscribe: (topic) =>
    fetchWithAuth('/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify({ topic })
    }),

  // Get notification preferences
  getPreferences: () => fetchWithAuth('/notifications/preferences'),

  // Update notification preferences
  updatePreferences: (preferences) =>
    fetchWithAuth('/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences)
    })
}

export default api
