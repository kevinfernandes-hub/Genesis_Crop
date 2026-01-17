/**
 * Stress Overview Component
 * Show overall crop stress status
 * Visual representation with colors for stress levels
 * 
 * TODO:
 * - Display stress gauge or cards
 * - Show number of crops in each stress level
 * - Quick actions based on stress
 */

import React from 'react'
import { STRESS_LEVELS, STRESS_COLORS, STRESS_LABELS } from '../../utils/constants'

function StressOverview({ crops, loading }) {
  if (loading) {
    return <div className="loading">Loading stress data...</div>
  }

  if (crops.length === 0) {
    return (
      <div className="empty-state">
        <p>Add crops to see stress analysis</p>
      </div>
    )
  }

  return (
    <div className="stress-overview">
      <h2>Crop Stress Overview</h2>

      {/* TODO: Add visualization components */}
      <div className="stress-cards">
        {Object.entries(STRESS_LEVELS).map(([key, level]) => (
          <div
            key={level}
            className="stress-card"
            style={{ borderLeftColor: STRESS_COLORS[level] }}
          >
            <h3>{level.toUpperCase()}</h3>
            <p className="stress-label">{STRESS_LABELS[level]}</p>
            <p className="stress-count">0 crops</p>
          </div>
        ))}
      </div>

      {/* TODO: Add stress chart/graph */}
    </div>
  )
}

export default StressOverview
