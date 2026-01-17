/**
 * Status Card Component
 * Displays crop stress status with color coding
 * Farmer-friendly: large text, clear visual feedback
 */

import React from 'react'

function StatusCard({ stressType, severity, icon, color }) {
  const severityColors = {
    none: { bg: '#d5f4e6', border: '#27ae60', text: '#27ae60' },
    low: { bg: '#fff3cd', border: '#f39c12', text: '#f39c12' },
    moderate: { bg: '#ffe5e5', border: '#e74c3c', text: '#e74c3c' },
    high: { bg: '#fadbd8', border: '#c0392b', text: '#c0392b' }
  }

  const colorScheme = severityColors[severity] || severityColors.none
  const severityLabel = {
    none: 'No Stress',
    low: 'Low Stress',
    moderate: 'Moderate Stress',
    high: 'High Stress'
  }

  return (
    <div
      className="status-card"
      style={{
        backgroundColor: colorScheme.bg,
        borderLeft: `5px solid ${colorScheme.border}`
      }}
    >
      <div className="status-icon" style={{ fontSize: '2.5rem' }}>
        {icon}
      </div>
      <div className="status-content">
        <h3 className="status-type">{stressType}</h3>
        <p
          className="status-label"
          style={{ color: colorScheme.text, fontWeight: 'bold' }}
        >
          {severityLabel[severity]}
        </p>
      </div>
    </div>
  )
}

export default StatusCard
