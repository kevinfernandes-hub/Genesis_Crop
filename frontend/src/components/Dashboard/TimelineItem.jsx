/**
 * Timeline Item Component
 * Displays a single stress event in chronological order
 * Simple and clear for farmers
 */

import React from 'react'

function TimelineItem({ date, stressType, icon, severity }) {
  const severityColor = {
    none: '#27ae60',
    low: '#f39c12',
    moderate: '#e74c3c',
    high: '#c0392b'
  }

  return (
    <div className="timeline-item">
      <div
        className="timeline-dot"
        style={{
          backgroundColor: severityColor[severity] || '#27ae60'
        }}
      />
      <div className="timeline-content">
        <p className="timeline-date">{date}</p>
        <p className="timeline-event">
          <span className="timeline-icon">{icon}</span> {stressType}
        </p>
      </div>
    </div>
  )
}

export default TimelineItem
