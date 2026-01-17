/**
 * StressTimeline Component
 * Displays a vertical timeline of past crop stress events
 * Professional, clean design with color-coded severity
 * 
 * Props:
 *   - events: Array of timeline event objects
 *     Each event: {
 *       id: unique identifier
 *       date: string (e.g., "15 Jan 2026")
 *       type: string (e.g., "Heat Stress")
 *       severity: "low" | "moderate" | "high"
 *     }
 */

import React from 'react'

function StressTimeline({ events = [] }) {
  // Map severity to CSS class and label
  const severityMap = {
    low: 'success',
    moderate: 'warning',
    high: 'error'
  }

  const severityLabels = {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High'
  }

  // If no events, show empty state
  if (!events || events.length === 0) {
    return (
      <div className="stress-timeline">
        <div className="timeline-empty">
          No stress events recorded yet. Your crop is in good condition!
        </div>
      </div>
    )
  }

  return (
    <div className="stress-timeline">
      {/* Vertical connecting line */}
      <div className="timeline-line" />

      {/* Timeline events */}
      {events.map((event) => {
        const severityClass = severityMap[event.severity] || severityMap.low
        const severityLabel = severityLabels[event.severity] || 'Unknown'

        return (
          <div key={event.id || event.date} className="timeline-item">
            {/* Colored dot indicator */}
            <div className={`timeline-dot ${severityClass}`} />

            {/* Event content */}
            <div className="timeline-content">
              <p className="timeline-date">{event.date}</p>
              <p className="timeline-event">
                {event.type}
                <span className={`timeline-severity ${severityClass}`}>
                  {severityLabel}
                </span>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StressTimeline
