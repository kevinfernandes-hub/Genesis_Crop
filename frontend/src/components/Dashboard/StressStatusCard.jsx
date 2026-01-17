/**
 * StressStatusCard Component
 * Displays individual crop stress status
 * Professional, clean design with color-coded severity
 * 
 * Props:
 *   - stressType: "Heat Stress" | "Soil Moisture" | "Rainfall"
 *   - severity: "low" | "moderate" | "high"
 */

import React from 'react'

function StressStatusCard({ stressType, severity }) {
  // Map severity to CSS class and label
  const severityMap = {
    low: { class: 'success', label: 'Low' },
    moderate: { class: 'warning', label: 'Moderate' },
    high: { class: 'error', label: 'High' }
  }

  const { class: severityClass, label: severityLabel } = severityMap[severity] || severityMap.low

  // Get indicator symbol
  const getIndicator = () => {
    const indicators = {
      'Heat Stress': '▲',
      'Soil Moisture': '▼',
      'Rainfall': '◊',
      default: '●'
    }
    return indicators[stressType] || indicators.default
  }

  return (
    <div className={`status-card ${severityClass}`}>
      <div className={`status-indicator ${severityClass}`}>
        {getIndicator()}
      </div>
      <div className="status-content">
        <h3 className="status-type">{stressType}</h3>
        <p className={`status-label ${severityClass}`}>{severityLabel}</p>
      </div>
    </div>
  )
}

export default StressStatusCard
