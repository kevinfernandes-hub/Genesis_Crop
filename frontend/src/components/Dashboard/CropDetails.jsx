/**
 * Crop Details Component
 * Show detailed information for a single crop
 * 
 * TODO:
 * - Load crop data by ID
 * - Display crop metrics
 * - Show recent stress data
 * - Edit crop button
 */

import React, { useState, useEffect } from 'react'

function CropDetails({ cropId }) {
  const [crop, setCrop] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Load crop data from API
    setLoading(false)
  }, [cropId])

  if (loading) {
    return <div className="loading">Loading crop details...</div>
  }

  if (!crop) {
    return <div className="error">Crop not found</div>
  }

  return (
    <div className="crop-details-container">
      <h2>{crop.name}</h2>
      {/* TODO: Add crop details content */}
    </div>
  )
}

export default CropDetails
