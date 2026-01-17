/**
 * StressTimelineItem Component
 * Displays a single past stress event in timeline view
 * Shows date, stress type, and severity
 * 
 * Props:
 *   - date: string (e.g., "12 Jan 2026")
 *   - stressType: string (e.g., "Heat Stress")
 *   - severity: "none" | "moderate" | "high"
 *   - icon: emoji string
 */

import React from 'react'

function StressTimelineItem({ date, stressType, severity, icon }) {
  const severityColors = {
    none: '#27ae60',
    moderate: '#f39c12',
    high: '#e74c3c'
  }

  const containerStyle = {
    display: 'flex',
    gap: '16px',
    paddingBottom: '16px',
    paddingLeft: '16px',
    borderLeft: '3px solid #ecf0f1',
    position: 'relative'
  }

  const dotStyle = {
    position: 'absolute',
    left: '-8px',
    top: '8px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: severityColors[severity] || '#27ae60',
    border: '3px solid white'
  }

  const iconStyle = {
    fontSize: '1.5rem',
    flexShrink: 0
  }

  const contentStyle = {
    flex: 1
  }

  const dateStyle = {
    margin: '0 0 4px 0',
    fontSize: '12px',
    color: '#95a5a6',
    fontWeight: '500'
  }

  const eventStyle = {
    margin: '0',
    fontSize: '15px',
    color: '#2c3e50',
    fontWeight: '500'
  }

  return (
    <div style={containerStyle}>
      <div style={dotStyle} />
      <div style={contentStyle}>
        <p style={dateStyle}>{date}</p>
        <p style={eventStyle}>
          <span style={iconStyle}>{icon}</span> {stressType}
        </p>
      </div>
    </div>
  )
}

export default StressTimelineItem
