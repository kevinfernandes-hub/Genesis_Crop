/**
 * Crop List Component
 * Display all user crops in a mobile-friendly list
 * 
 * TODO:
 * - Show crop name, location, health status
 * - Add crop button
 * - Click to view details
 * - Delete crop option
 */

import React from 'react'

function CropList({ crops, loading }) {
  if (loading) {
    return <div className="loading">Loading crops...</div>
  }

  if (crops.length === 0) {
    return (
      <div className="empty-state">
        <p>No crops added yet</p>
        <button className="btn btn-primary">+ Add Your First Crop</button>
      </div>
    )
  }

  return (
    <div className="crop-list">
      <h2>Your Crops</h2>
      {crops.map((crop) => (
        <div key={crop.id} className="crop-card">
          <div className="crop-header">
            <h3>{crop.name}</h3>
            <span className="crop-variety">{crop.variety}</span>
          </div>
          <div className="crop-details">
            <p>Location: {crop.location}</p>
            <p>Area: {crop.area} acres</p>
            <p>Planted: {crop.plantedDate}</p>
          </div>
          <div className="crop-actions">
            <button>View Details</button>
            <button>Edit</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CropList
