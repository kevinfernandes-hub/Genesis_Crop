/**
 * Notification Panel Component
 * Display alerts and notifications
 * Farmer-friendly alert messages
 * 
 * TODO:
 * - Load notifications from API
 * - Show alert priority with colors
 * - Mark as read functionality
 * - Delete notification
 */

import React, { useState, useEffect } from 'react'

function NotificationPanel() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Load notifications from API
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Loading notifications...</div>
  }

  if (notifications.length === 0) {
    return (
      <div className="empty-state">
        <p>No alerts at this time</p>
        <p className="subtitle">All your crops are looking good! 🌿</p>
      </div>
    )
  }

  return (
    <div className="notification-panel">
      <h2>Alerts</h2>
      <div className="notification-list">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification-item priority-${notif.priority}`}>
            <div className="notification-header">
              <h4>{notif.title}</h4>
              <span className="time">{notif.time}</span>
            </div>
            <p>{notif.message}</p>
            {notif.action && <button className="action-btn">{notif.action}</button>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationPanel
