// Custom Crop Data Hook
// Provides crop data fetching logic with caching

import { useEffect, useState } from 'react'
import { getCrops, getCropStressData } from '../services/cropService'

export const useCropData = () => {
  const [crops, setCrops] = useState([])
  const [stressData, setStressData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true)
        const response = await getCrops()
        setCrops(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCrops()
  }, [])

  const fetchStressData = async (cropId) => {
    try {
      const response = await getCropStressData(cropId)
      setStressData((prev) => ({
        ...prev,
        [cropId]: response.data
      }))
    } catch (err) {
      setError(err.message)
    }
  }

  return { crops, stressData, loading, error, fetchStressData }
}
